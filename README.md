# Task Manager

A simple Task Manager application built with **Astro**, **Svelte**, and **Prisma**. This app allows users to create, view, update, delete tasks, and filter them based on their completion status.

## Features

- Create new tasks with a title, description, priority (low, medium, high), and due date.
- View all tasks or filter them by active or completed status.
- Update task status to mark them as completed or active.
- Delete tasks from the list.

## Technologies Used

- **Astro**: A modern static site generator that allows you to build fast websites.
- **Svelte**: A UI framework for building interactive web applications.
- **Prisma**: An ORM for Node.js and TypeScript that simplifies database access.
- **SQLite**: A lightweight database used for storing task data.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (version 20 or later)
- npm (Node package manager)

### Installation

Clone the repository:

  ```bash
  git clone https://github.com/caffellatte/astro-todo.git
  cd astro-todo
  ```

Install the dependencies:

  ```bash
  npm install
  ```

Initialize Prisma:

  ```bash
  npx prisma migrate dev --name init
  ```

Run migrations to set up the database:

  ```bash
  npx prisma generate
  ```

## Development Mode

To start the development server, run:

  ```bash
  npm run dev
  ```

Navigate to `http://localhost:4321` in your browser to view the application.

## Build

Create a production build:

  ```bash
  npm run build
  ```

## Preview

Preview the built site locally:

  ```bash
  npm run preview
  ```

## Usage

- Use the form at the top of the page to add new tasks.
- Select filters to view all tasks, only active tasks, or only completed tasks.
- Click on "Mark Complete" or "Mark Incomplete" to toggle task completion status.
- Use the "Delete" button to remove a task from the list.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
