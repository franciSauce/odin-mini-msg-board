# Odin Mini Message Board

A small Express.js message board that lets users sign in, create an account, post messages, and view messages from other users. The application uses server-rendered EJS views and in-memory JavaScript data, so it is suitable for learning and local development rather than production persistence.

## Features

- Create a user with a name and password.
- Sign in and out using an in-memory current-user session.
- Post messages to the shared message board.
- View user avatars and message timestamps.
- Display a responsive, styled login modal.
- Use a dark grey visual theme with readable text and accent colors.

## Technology stack

- **Node.js** for the runtime
- **Express.js** for HTTP routing and static assets
- **EJS** for server-rendered HTML
- **JavaScript** for application logic
- **CSS** for interface styling
- **Node's built-in crypto module** for UUID generation

## Project structure

```text
.
├── app.js                         # Express application entry point
├── db.js                          # Sample users and messages
├── controllers/
│   └── indexController.js          # Request handlers for pages and actions
├── models/
│   ├── Message.js                 # Message data model
│   └── User.js                    # User data model
├── routes/
│   └── indexRouter.js             # HTTP routes
├── views/
│   └── index.ejs                  # Main page and login modal
├── public/
│   ├── styles.css                 # Application styles
│   ├── guest.svg                  # Default guest avatar
│   ├── female.svg                 # Sample female avatar
│   └── male.svg                   # Sample male avatar
├── test/
│   └── controller.test.js         # Controller regression tests
├── package.json                   # Dependencies and scripts
└── package-lock.json               # Dependency lock file
```

## Getting started

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The application will be available at:

```text
http://localhost:8001
```

The server uses port `8001` and runs with Node's watch mode.

## Request flow

1. `GET /` renders the main page through the EJS view.
2. `POST /newUser` creates or authenticates a user.
3. `POST /newMsg` adds a message to the shared in-memory collection.
4. `POST /logout` clears the current user session.

The route definitions are in [routes/indexRouter.js](routes/indexRouter.js), while the handlers are implemented in [controllers/indexController.js](controllers/indexController.js).

## Data model

The application stores users and messages in memory through the arrays exported by [db.js](db.js). The data is not persisted to a database and is reset when the server restarts.

- `User` stores an ID, name, password, and profile image path.
- `Message` stores an ID, text, creation date, and user ID.

The model definitions are in [models/User.js](models/User.js) and [models/Message.js](models/Message.js).

## Testing

Run the controller tests directly with:

```bash
node --test test/controller.test.js
```

The package test script currently remains a placeholder, so the direct Node test command is recommended for now.

## Notes

- Passwords are stored as plain strings for this learning project; they should not be used for production authentication.
- The application uses a single in-memory session variable, so this design is best suited to a small local app rather than multiple simultaneous users in production.
- Static files are served from the `public` directory.
