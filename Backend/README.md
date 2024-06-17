# Regnes

This is a Backend GraphQL API for Regnes built with NestJS.  
Users can register, log in, and view their personal and global sign-in counts in real-time.

## Table of Contents

- [Regnes](#regnes)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
  - [Folder Structure](#folder-structure)
  - [Acknowledgements](#acknowledgements)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (>=14.x)
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/RomaLetodiani/Regnes.git
   ```

2. Navigate to the project directory:

   ```sh
   cd Backend
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

   or if you are using yarn:

   ```sh
   yarn install
   ```

### Running the Application

1. Start the development server:

   ```sh
   npm start
   ```

   or if you are using yarn:

   ```sh
   yarn start
   ```

2. Open your browser and navigate to `http://localhost:4000/graphql` to see the GraphQL Playground

## Folder Structure

```sh
your-repo-name/
├── src/
│   ├── Auth/
│   ├── Gateway/
│   │   ├── websocket.module.ts
│   │   ├── Websockets.gateway.ts
│   ├── Shared/
│   │   ├── Decorators
│   │   ├── EmojiLogger.ts
│   ├── User/
│   ├── App.module.ts
│   ├── main.ts
│   └── schema.gql
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc
├── nest-cli.json
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tsconfig.node.json
└── tsconfig.json
```

## Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [Socket.io](https://socket.io/)

Feel free to reach out if you have any questions or need further assistance!
