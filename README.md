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

## Testing the APIs

### 1. Start the Server

In terminal:

```bash
npm start
```

You should see:

```
Database connected successfully
Server running on port 3000
```

### 2. Choose a Testing Tool

Use any one:

- Postman (recommended)
- Thunder Client (VS Code extension)
- Insomnia
- cURL (terminal)

### 3. Test User APIs

#### Create User

```bash
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "Sufiyan",
  "email": "sufiyan@gmail.com"
}
```

Expected Response (201):

```json
{
  "id": 1,
  "name": "Sufiyan",
  "email": "sufiyan@gmail.com",
  "createdAt": "...",
  "updatedAt": "..."
}
```

#### Get User

```bash
GET http://localhost:3000/users/1
```

### 4. Test Meeting APIs

#### Create First Meeting (Valid)

```bash
POST http://localhost:3000/meetings
Content-Type: application/json

{
  "userId": 1,
  "title": "Interview",
  "startTime": "2026-02-10T10:00:00.000Z",
  "endTime": "2026-02-10T10:30:00.000Z"
}
```

Expected: 201 Created ✅

#### Create Overlapping Meeting (Should Fail)

```bash
POST http://localhost:3000/meetings
Content-Type: application/json

{
  "userId": 1,
  "title": "Another Meeting",
  "startTime": "2026-02-10T10:15:00.000Z",
  "endTime": "2026-02-10T10:45:00.000Z"
}
```

Expected Response (400):

```json
{
  "message": "Time slot already booked"
}
```

#### Create Non-Overlapping Meeting

```bash
POST http://localhost:3000/meetings
Content-Type: application/json

{
  "userId": 1,
  "title": "Team Sync",
  "startTime": "2026-02-10T10:30:00.000Z",
  "endTime": "2026-02-10T11:00:00.000Z"
}
```

Should succeed.

### 5. List Meetings

#### Get All Meetings

```bash
GET http://localhost:3000/meetings
```

#### Filter by User

```bash
GET http://localhost:3000/meetings?userId=1
```

#### Filter by Date Range

```bash
GET http://localhost:3000/meetings?startTime=2026-02-10T00:00:00.000Z&endTime=2026-02-11T00:00:00.000Z
```

### 6. Get Meeting by ID

```bash
GET http://localhost:3000/meetings/1
```

### 7. Update Meeting

Try to update into conflict:

```bash
PUT http://localhost:3000/meetings/2
Content-Type: application/json

{
  "startTime": "2026-02-10T10:10:00.000Z",
  "endTime": "2026-02-10T10:40:00.000Z"
}
```

Expected: 400 conflict ❌

### 8. Delete Meeting

```bash
DELETE http://localhost:3000/meetings/1
```

Expected: 204 No Content

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
