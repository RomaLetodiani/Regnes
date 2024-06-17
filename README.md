# Regnes

Regnes is a full-stack application comprising a frontend built with React and a backend GraphQL API built with NestJS. The application allows users to register, log in, and view their personal and global sign-in counts in real-time.

## Features

- **User Authentication**: Users can register and log in.
- **Real-Time Updates**: View personal and global sign-in counts in real-time.
- **Private and Public Routes**: Secure and manage routes for authenticated and unauthenticated users.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces
- **Vite**: A fast build tool and development server
- **Tailwind CSS**: A utility-first CSS framework
- **Zustand**: A state management library
- **Apollo GraphQL**: Manages both local and remote data with GraphQL
- **Socket.io**: Enables real-time, bidirectional, and event-based communication

### Backend

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications
- **GraphQL**: A data query language for your API

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (>=14.x)
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/RomaLetodiani/Regnes.git
   ```

2. Navigate to the project directory for frontend and backend installations.

### Frontend Installation

1. Navigate to the Frontend directory:

   ```sh
   cd Frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

   or with yarn:

   ```sh
   yarn install
   ```

3. Start the development server:

   ```sh
   npm start
   ```

   or with yarn:

   ```sh
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Backend Installation

1. Navigate to the Backend directory:

   ```sh
   cd Backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

   or with yarn:

   ```sh
   yarn install
   ```

3. Start the development server:

   ```sh
   npm start
   ```

   or with yarn:

   ```sh
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:4000/graphql` to access the GraphQL Playground

## Usage

- **Register and Login**: Use the frontend application to register a new account or log in with existing credentials.
- **Profile**: After logging in, users can view their profile with personal and global sign-in counts updated in real-time.

## Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [Socket.io](https://socket.io/)
- [NestJS](https://nestjs.com/)
- [GraphQL](https://graphql.org/)

Feel free to reach out if you have any questions or need further assistance!
