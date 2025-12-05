# WASP - Weapons and Accessories Support Platform

A comprehensive inventory management system for weapons, parts, and accessories with maintenance tracking and audit capabilities.

## 🏗️ Architecture Overview

### Backend - .NET 8 Web API
- **Technology**: C# / .NET 8 / ASP.NET Core
- **Database**: PostgreSQL with UUID primary keys
- **ORM**: Entity Framework Core 8 with TPH (Table Per Hierarchy)
- **Authentication**: JWT with role-based authorization
- **API**: RESTful endpoints with OpenAPI/Swagger documentation

### Frontend - Angular (Separate Project)
- **Technology**: Angular (in `/front` directory)
- **Framework**: Angular CLI with TypeScript
- **Styling**: CSS with responsive design
- **State Management**: Services and RxJS

## 🎯 Features

### Core Inventory Management
- **Weapons**: Airsoft, Real Steel, Training Replicas
- **Parts**: Components with compatibility tracking
- **Accessories**: Mountable attachments
- **Flexible Tagging**: Custom categorization system
- **Unique Tracking**: Auto-generated tracking codes

### Advanced Relationships
- **Weapon-Part Links**: Track installed and spare parts
- **Weapon-Accessory Links**: Manage mounted accessories
- **Compatibility**: Part and accessory compatibility with weapon models
- **Platform Support**: Multi-platform support (Airsoft, Real Steel, Training)

### Maintenance & Audit
- **Maintenance Logs**: Issue tracking and resolution history
- **Priority System**: Low, Medium, High, Critical priorities
- **Status Tracking**: Pending, In Progress, Resolved
- **Activity Logs**: Complete audit trail of all changes
- **Assignment**: Assign maintenance to specific technicians

### Security & Access Control
- **Role-Based Access**: Admin, Technician, Viewer roles
- **JWT Authentication**: Secure token-based authentication
- **Authorization**: Fine-grained permission control

## 📁 Project Structure

```
wasp/
├── back/                          # .NET 8 Backend
│   ├── Controllers/              # API Controllers
│   ├── Services/                 # Business Logic
│   ├── Models/                   # Entity Models
│   ├── DTOs/                     # Data Transfer Objects
│   ├── Enums/                    # Domain Enums
│   ├── Data/                     # Database Context
│   └── appsettings.json          # Configuration
├── front/                        # Angular Frontend
│   ├── src/app/                  # Angular Application
│   ├── angular.json              # Angular Configuration
│   └── package.json              # Dependencies
├── docker-compose.yml            # Docker Configuration
└── README.md                     # This file
```

## 🚀 Quick Start

### Prerequisites
- .NET 8 SDK
- Node.js 18+ (for frontend)
- PostgreSQL database
- Docker (optional, for containerized deployment)

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd back
   ```

2. Configure database connection in `appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Host=localhost;Database=wasp;Username=postgres;Password=yourpassword"
     }
   }
   ```

3. Run database migrations:
   ```bash
   dotnet ef database update
   ```

4. Start the backend:
   ```bash
   dotnet run
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm start
   ```

### Docker Deployment
```bash
docker-compose up -d
```

## 🔧 API Endpoints

### Items Management
- `GET /api/items` - List items with filtering
- `POST /api/items` - Create new item
- `PUT /api/items/{id}` - Update item
- `DELETE /api/items/{id}` - Delete item

### Weapons
- `GET /api/weapons` - List weapons
- `POST /api/weapons` - Create weapon
- `PUT /api/weapons/{id}` - Update weapon

### Parts & Accessories
- `GET /api/parts` - List parts
- `GET /api/accessories` - List accessories
- `POST /api/weapons/{id}/parts/{partId}` - Link part to weapon
- `POST /api/weapons/{id}/accessories/{accessoryId}` - Mount accessory

### Maintenance
- `GET /api/maintenance` - List maintenance logs
- `POST /api/maintenance` - Create maintenance log
- `PUT /api/maintenance/{id}` - Update maintenance status

### Tags & Activity
- `GET /api/tags` - List all tags
- `GET /api/items/{id}/activity` - Get item activity history

## 📊 Database Schema

The system uses a sophisticated TPH (Table Per Hierarchy) approach:

- **Items Table**: Single table with discriminator for Weapon/Part/Accessory
- **UUID Primary Keys**: Globally unique identifiers
- **Relationship Tables**: Many-to-many for weapon-part and weapon-accessory links
- **Audit Trail**: Complete activity logging
- **Flexible Tagging**: Many-to-many tag system

## 🛡️ Security

- **JWT Authentication**: Secure token-based auth
- **Role-Based Authorization**: Admin, Technician, Viewer roles
- **Input Validation**: Comprehensive validation and sanitization
- **HTTPS**: Production-ready security configuration

## 🐳 Docker Support

The project includes Docker configuration for easy deployment:

```yaml
# docker-compose.yml
services:
  backend:
    build: ./back
    ports:
      - "5000:80"
    environment:
      - ConnectionStrings__DefaultConnection=Host=db;Database=wasp;Username=postgres;Password=password
  
  frontend:
    build: ./front
    ports:
      - "3000:80"
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=wasp
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
```

## 📈 Monitoring & Logging

- **Structured Logging**: Comprehensive logging throughout the application
- **Health Checks**: Built-in health check endpoints
- **Performance Monitoring**: Optimized for high-performance scenarios
- **Error Handling**: Graceful error handling and reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for your changes
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **API Documentation**: Available at `/swagger` when running in development
- **Issue Tracking**: GitHub Issues
- **Documentation**: Project Wiki

---

**WASP** - Weapons and Accessories Support Platform
Built with ❤️ using .NET 8 and Angular
