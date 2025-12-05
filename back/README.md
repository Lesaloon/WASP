# WASP Backend - .NET 8 Web API

Weapons and Accessories Support Platform - Backend Service

## Technology Stack

- **Language / Runtime:** C# / .NET 8
- **Framework:** ASP.NET Core Web API (.NET 8)
- **ORM:** Entity Framework Core 8
- **Database:** PostgreSQL with UUID primary keys
- **Auth:** JWT-based authentication with role-based authorization

## Features

### Domain Model (TPH - Table Per Hierarchy)

- **Items** (abstract base): Weapons, Parts, Accessories
- **Weapons**: Airsoft, Real Steel, Training Replicas
- **Parts**: Components that can be linked to weapons
- **Accessories**: Attachments that can be mounted on weapons
- **Maintenance**: Track issues, repairs, and maintenance history
- **Activity Logs**: Audit trail for all item changes
- **Tags**: Flexible categorization system

### API Endpoints

#### Items Management
- `GET /api/items` - List items with filtering and pagination
- `GET /api/items/{id}` - Get specific item details
- `POST /api/items` - Create new item
- `PUT /api/items/{id}` - Update item
- `DELETE /api/items/{id}` - Delete item

#### Weapons
- `GET /api/weapons` - List weapons
- `POST /api/weapons` - Create weapon
- `PUT /api/weapons/{id}` - Update weapon
- `DELETE /api/weapons/{id}` - Delete weapon

#### Parts
- `GET /api/parts` - List parts
- `POST /api/parts` - Create part
- `PUT /api/parts/{id}` - Update part
- `DELETE /api/parts/{id}` - Delete part

#### Accessories
- `GET /api/accessories` - List accessories
- `POST /api/accessories` - Create accessory
- `PUT /api/accessories/{id}` - Update accessory
- `DELETE /api/accessories/{id}` - Delete accessory

#### Weapon Relationships
- `POST /api/weapons/{weaponId}/parts/{partId}` - Link part to weapon
- `DELETE /api/weapons/{weaponId}/parts/{partId}` - Unlink part from weapon
- `POST /api/weapons/{weaponId}/accessories/{accessoryId}` - Mount accessory
- `DELETE /api/weapons/{weaponId}/accessories/{accessoryId}` - Unmount accessory

#### Maintenance
- `GET /api/maintenance` - List maintenance logs
- `POST /api/maintenance` - Create maintenance log
- `PUT /api/maintenance/{id}` - Update maintenance status
- `DELETE /api/maintenance/{id}` - Delete maintenance log

#### Tags
- `GET /api/tags` - List all tags
- `POST /api/tags` - Create new tag
- `POST /api/items/{itemId}/tags` - Add tag to item
- `DELETE /api/items/{itemId}/tags/{tagId}` - Remove tag from item

#### Activity Logs
- `GET /api/items/{itemId}/activity` - Get item activity history

## Authentication & Authorization

### Roles
- **Admin**: Full CRUD access, manage users and tags
- **Technician**: Read items, manage maintenance, update statuses
- **Viewer**: Read-only access

### JWT Configuration
Configure in `appsettings.json`:
```json
{
  "Jwt": {
    "Key": "your-256-bit-secret-key-for-jwt-tokens-in-production",
    "Issuer": "WaspBackend",
    "Audience": "WaspFrontend",
    "ExpiresInMinutes": 60
  }
}
```

## Database Schema

The application uses PostgreSQL with UUID primary keys and implements TPH (Table Per Hierarchy) for the Item entity.

### Key Tables
- `Items` - Base table for all items with discriminator column
- `Tags` - Flexible tagging system
- `ItemTags` - Many-to-many relationship between items and tags
- `WeaponParts` - Links weapons to their parts
- `WeaponAccessories` - Links weapons to their accessories
- `MaintenanceLogs` - Maintenance history
- `ActivityLogs` - Audit trail

## Development

### Prerequisites
- .NET 8 SDK
- PostgreSQL database

### Setup
1. Clone the repository
2. Configure database connection in `appsettings.json`
3. Run database migrations:
   ```bash
   cd back
   dotnet ef database update
   ```
4. Start the application:
   ```bash
   dotnet run
   ```

### API Documentation
Swagger UI is available at `/swagger` when running in development mode.

## Docker

The application is configured to run in Docker. See the root `docker-compose.yml` for deployment configuration.

## License

MIT
