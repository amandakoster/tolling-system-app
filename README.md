# Tolling System App

## Overview

The Tolling System App is designed to manage toll transactions efficiently. This app allows you to add, update, and query toll transactions in a SQLite database. The backend logic is tested using Cypress, ensuring robust and reliable database operations.

## Features

- **Add Toll Transactions**: Add new toll transactions with vehicle ID, toll booth ID, and amount paid.
- **Update Toll Transactions**: Modify existing toll transactions.
- **Query Toll Transactions**: Retrieve specific or all toll transactions.
- **Get Next ID**: Fetch the next available ID for toll transactions.
- **Database Initialization**: Ensure that the toll transactions table is created in the database if it doesn't already exist.

## Technologies Used

- **Node.js**: Runtime environment for running JavaScript code on the server.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript, ensuring type safety and better code quality.
- **Cypress**: Testing framework used for end-to-end testing of the app's backend logic.
- **SQLite3**: Lightweight, disk-based database that doesn’t require a separate server process, used for storing toll transactions.
- **Zsh**: Shell used for managing the development environment.
- **NVM (Node Version Manager)**: Manages multiple Node.js versions.
- **Oh My Zsh**: Framework for managing your Zsh configuration.

## Prerequisites

- **Node.js (v18.x.x)**: Ensure Node.js is installed. You can manage versions using NVM.
- **npm**: Comes with Node.js for managing packages.
- **SQLite3**: Ensure you have SQLite3 installed.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/tolling-system-app.git
   cd tolling-system-app

Usage
-----

### Running the App

Since the app is designed primarily for backend operations and testing, it doesn't have a traditional "run" command. Instead, you'll interact with the database through Cypress tasks and tests.

### Testing the App

1.  **Open Cypress:**

    bash
    `npx cypress open`

2.  **Run Tests:**

    -   From the Cypress UI, select the desired test file (e.g., `add-toll-transaction.cy.ts`) and click to run it.
    -   The tests will perform various operations like adding, updating, querying, and retrieving the next ID from the database.

**Project Structure:**
-----------------


`tolling-system-app/
│
├── cypress/
│   ├── e2e/                   # End-to-end test files
│   │   ├── add-toll-transaction.cy.ts
│   │   ├── get-next-id.cy.ts
│   │   └── ...
│   ├── support/
│   │   └── e2e.ts             # Custom commands and overrides for Cypress
│   └── cypress.config.ts      # Cypress configuration and tasks
│
├── src/                       # Source code (if applicable)
│   ├── ...
│
├── .zshrc                     # Zsh configuration file with custom theme and Git branch parsing
├── package.json               # Project dependencies and scripts
└── README.md                  # Project documentation`
