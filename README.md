# Kraftshala Meeting Booking

A Node.js backend service for calendar booking that allows users to schedule meetings while preventing overlapping time slots.

## Features

- User management (CRUD operations)
- Meeting scheduling with conflict prevention
- RESTful API endpoints
- SQL database integration with Sequelize
- Input validation and error handling
- Conflict checking for overlapping meetings

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM for SQL databases
- **PostgreSQL/MySQL** - Database
- **dotenv** - Environment variable management

## Project Structure

```
src/
├── app.js                 # Express app setup
├── server.js              # Server startup
├── config/
│   └── database.js        # Database configuration
├── middlewares/
│   └── errorHandler.js    # Error handling middleware
├── modules/
│   ├── user/
│   │   ├── dto/
│   │   ├── index/
│   │   ├── interface/     # Controllers
│   │   ├── model/         # Sequelize models
│   │   ├── routes/        # Route definitions
│   │   └── service/       # Business logic
│   └── meeting/
│       ├── dto/
│       ├── index/
│       ├── interface/     # Controllers
│       ├── model/         # Sequelize models
│       ├── routes/        # Route definitions
│       └── service/       # Business logic
└── utils/
    └── conflictChecker.js # Conflict detection utility
```

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd kraftshala-meeting-booking
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=meeting_booking
DB_USER=your_username
DB_PASSWORD=your_password
DB_DIALECT=postgres  # or mysql
PORT=3000
```

4. Set up the database:

- Create a database with the name specified in `DB_NAME`
- The application will automatically create tables on startup

## Running the Application

Start the server:

```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Users

- `POST /users` - Create a new user
- `GET /users/:id` - Get user by ID

### Meetings

- `POST /meetings` - Create a new meeting
- `GET /meetings` - Get all meetings
- `GET /meetings/:id` - Get meeting by ID
- `PUT /meetings/:id` - Update a meeting
- `DELETE /meetings/:id` - Delete a meeting

### Request/Response Examples

#### Create User

```bash
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### Create Meeting

```bash
POST /meetings
Content-Type: application/json

{
  "userId": 1,
  "title": "Team Meeting",
  "startTime": "2023-10-01T10:00:00Z",
  "endTime": "2023-10-01T11:00:00Z"
}
```

## Business Rules

- Meetings cannot overlap for the same user
- Start time must be before end time
- All required fields must be provided
- Proper HTTP status codes are returned for different scenarios

## Conflict Detection

The system prevents overlapping meetings using the following logic:

```
existing.start < new.end AND existing.end > new.start
```

## Error Handling

The application includes comprehensive error handling with appropriate HTTP status codes:

- 400 Bad Request - Invalid input
- 404 Not Found - Resource not found
- 500 Internal Server Error - Server errors

## Development

The project follows a modular architecture with separation of concerns:

- **Models**: Database schemas
- **Services**: Business logic and data operations
- **Controllers**: Request handling and response formatting
- **Routes**: API endpoint definitions
- **DTOs**: Data transfer objects (placeholders for future use)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC
