# Stage 1: Build the Angular application
FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install


COPY . .
RUN npm run build --production

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

COPY --from=build /app/dist/front/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# to create the image run the following command
# docker build -t your-angular-app .