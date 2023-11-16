# Node-Express Movie Backend API with Authentication

A Node.js backend project designed for managing a collection of movies with robust database integration, now enhanced with authentication using Passport.

## Overview

This project offers a secure backend API with added authentication features to facilitate CRUD operations on a collection of movies. Each movie in the collection is characterized by properties such as `id`, `title`, and `year`.

## Prerequisites

Before getting started, make sure you have the following prerequisites in place:

- Node.js installed
- npm (Node Package Manager) installed

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:Rasheek16/Node-Express.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Node-express
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up Authentication:

   - Passport.js is used for authentication. Ensure you configure your authentication strategy in the [auth.js](auth.js) file.

## Database Integration

This project seamlessly integrates with SQLite for efficient data storage. Configure SQLite settings in the [sqlite-config.js](sqlite-config.js) file.

## API Endpoints

1. **Save Movie:** POST /save
   Save a new movie to the collection.
   Request body:

   ```json
   {
     "title": "Movie Title",
     "year": 2022
   }
   ```

2. **Form Action:** GET /movie/form/:id
   Fetch details for a specific movie ID to be used in a form.
   Example request:

   ```bash
   GET /movie/form/1
   ```

3. **Remove Action:** DELETE /movie/remove/:id
   Remove a movie from the collection by its ID.
   Example request:

   ```bash
   DELETE /movie/remove/2
   ```

4. **List Action:** GET /movie/list
   Fetch the list of all movies.
   Example request:
   ```bash
   GET /
   ```

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or improvements, please [open an issue](https://github.com/Rasheek16/Node-Express/issues) or create a [pull request](https://github.com/Rasheek16/Node-Express/pulls).
