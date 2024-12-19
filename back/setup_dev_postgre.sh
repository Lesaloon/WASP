#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Configuration
POSTGRES_IMAGE="postgres:latest"
CONTAINER_NAME="WASP_DB_CONTAINER"
POSTGRES_USER="useraccount"
POSTGRES_PASSWORD="password"
POSTGRES_DB="WASP-DATABASE"
POSTGRES_PORT=5432
ENV_FILE=".env.local"

# Function to check if Docker is installed
function check_docker() {
    if ! command -v docker &> /dev/null
    then
        echo "Docker is not installed. Please install Docker and try again."
        exit 1
    fi
}

# Function to pull PostgreSQL Docker image
function pull_postgres_image() {
    echo "Pulling PostgreSQL image..."
    docker pull $POSTGRES_IMAGE
}

# Function to run PostgreSQL container
function run_postgres_container() {
    # Check if container already exists
    if [ "$(docker ps -a | grep $CONTAINER_NAME)" ]; then
        echo "Container '$CONTAINER_NAME' already exists. Starting the container..."
        docker start $CONTAINER_NAME
    else
        echo "Running PostgreSQL container..."
        docker run -d \
            --name $CONTAINER_NAME \
            -e POSTGRES_USER=$POSTGRES_USER \
            -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
            -e POSTGRES_DB=$POSTGRES_DB \
            -p $POSTGRES_PORT:5432 \
            $POSTGRES_IMAGE
    fi
}

# Function to generate .env file
function generate_env_file() {
    # Check if .env file already exists and is not empty
    if [ -f "$ENV_FILE" ] && [ -s "$ENV_FILE" ]; then
        echo "$ENV_FILE file already exists. Skipping..."
        echo "Please make sure to update the file with the correct values."
        echo "Corect values are:"
        echo "DB_USERNAME=$POSTGRES_USER"
        echo "DB_PASSWORD=$POSTGRES_PASSWORD"
        echo "DB_HOST=localhost"
        echo "DB_PORT=$POSTGRES_PORT"
        echo "DB_NAME=$POSTGRES_DB"
        return
    fi
    echo "Generating $ENV_FILE file..."
    cat > $ENV_FILE <<EOL
DB_USERNAME=$POSTGRES_USER
DB_PASSWORD=$POSTGRES_PASSWORD
DB_HOST=localhost
DB_PORT=$POSTGRES_PORT
DB_NAME=$POSTGRES_DB
EOL
}

# Function to wait for PostgreSQL to be ready
function wait_for_postgres() {
    echo "Waiting for PostgreSQL to be ready..."
    while ! docker exec $CONTAINER_NAME pg_isready -U $POSTGRES_USER > /dev/null 2>&1; do
        echo "PostgreSQL is not ready yet. Waiting..."
        sleep 2
    done
    echo "PostgreSQL is ready!"
}

# Function to run Sequelize migrations and seeders
function run_sequelize() {
    echo "Running Sequelize migrations..."
    npx sequelize db:migrate

    echo "Running Sequelize seeders..."
    npx sequelize db:seed:all
}

# Main Execution Flow
check_docker
pull_postgres_image
run_postgres_container
generate_env_file
wait_for_postgres
run_sequelize

echo "PostgreSQL setup and Sequelize migrations/seeders completed successfully."
