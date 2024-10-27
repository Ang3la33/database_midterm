const { Pool } = require('pg');

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres', //This _should_ be your username, as it's the default one Postgres uses
  host: 'localhost',
  database: 'movie_rental_system', //This should be changed to reflect your actual database
  password: 'password', //This should be changed to reflect the password you used when setting up Postgres
  port: 5432,
});

/**
 * Creates the database tables, if they do not already exist.
 */
async function createTable() {
  // TODO: Add code to create Movies, Customers, and Rentals tables
  try {

    // Movies table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS movies (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        year INTEGER,
        genre TEXT,
        director TEXT
      );
    `);

    // Customers table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS customers (
        customerId SERIAL PRIMARY KEY,
        firstName TEXT,
        lastName TEXT,
        email TEXT,
        phoneNum TEXT
      );
    `);

    // Rentals table with foreign key references to Movies and Customers
    await pool.query(`
      CREATE TABLE IF NOT EXISTS rentals (
        id SERIAL PRIMARY KEY,
        movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
        customer_id INTEGER REFERENCES customers(customerId) ON DELETE CASCADE,
        rental_date DATE NOT NULL DEFAULT CURRENT_DATE,
        return_date DATE
      );
    `);

    console.log("Table(s) created successfully.");
  } catch (error) {
    console.error("Error creating tables: ", error);
  }
};

/**
 * Inserts a new movie into the Movies table.
 * 
 * @param {string} title Title of the movie
 * @param {number} year Year the movie was released
 * @param {string} genre Genre of the movie
 * @param {string} director Director of the movie
 */
async function insertMovie(title, year, genre, director) {
  // TODO: Add code to insert a new movie into the Movies table
  const query = {
    text: `INSERT INTO movies (title, year, genre, director) VALUES ($1, $2, $3, $4)`,
    values: [title, year, genre, director],
  };

  try {
    await pool.query(query);
    console.log(`Movie "${title}" inserted successfully.`);
  } catch (error) {
    console.error("Error inserting movie: ", error);
  }
};

/**
 * Prints all movies in the database to the console
 */
async function displayMovies() {
  // TODO: Add code to retrieve and print all movies from the Movies table
  try {
    const result = await pool.query("SELECT * FROM movies");
    result.rows.forEach((row) => console.log(row));
  } catch (error) {
    console.error("Error displaying movies: ", error);
  }
};

/**
 * Updates a customer's email address.
 * 
 * @param {number} customerId ID of the customer
 * @param {string} newEmail New email address of the customer
 */
async function updateCustomerEmail(customerId, newEmail) {
  // TODO: Add code to update a customer's email address
  try {
    const result = await pool.query(
      `UPDATE customers SET email = $1 WHERE customerId = $2`,
      [newEmail, customerId]
    );

    if (result.rowCount === 0) {
      console.log(`Customer with ID "${customerId}" not found.`);
    } else {
      console.log(`Customer email updated successfully to "${newEmail}".`);
    }
  } catch (error) {
    console.error("Error updating customer's email: ", error);
  }
};

/**
 * Removes a customer from the database along with their rental history.
 * 
 * @param {number} customerId ID of the customer to remove
 */
async function removeCustomer(customerId) {
  // TODO: Add code to remove a customer and their rental history
  try {
    const result = await pool.query(
      `DELETE FROM customers WHERE customerId = $1`,
      [customerId]
    );
    
    if (result.rowCount === 0) {
      console.log(`Customer with ID "${customerId}" not found.`);
    } else {
      console.log(`Customer with ID "${customerId}" and their rental history have been removed.`);
    }
  } catch (error) {
    console.error("Error removing customer and their rental history: ", error);
  }
};

/**
 * Prints a help message to the console
 */
function printHelp() {
  console.log('Usage:');
  console.log('  insert <title> <year> <genre> <director> - Insert a movie');
  console.log('  show - Show all movies');
  console.log('  update <customer_id> <new_email> - Update a customer\'s email');
  console.log('  remove <customer_id> - Remove a customer from the database');
}

/**
 * Runs our CLI app to manage the movie rentals database
 */
async function runCLI() {
  await createTable();

  const args = process.argv.slice(2);
  switch (args[0]) {
    case 'insert':
      if (args.length !== 5) {
        printHelp();
        return;
      }
      await insertMovie(args[1], parseInt(args[2]), args[3], args[4]);
      break;
    case 'show':
      await displayMovies();
      break;
    case 'update':
      if (args.length !== 3) {
        printHelp();
        return;
      }
      await updateCustomerEmail(parseInt(args[1]), args[2]);
      break;
    case 'remove':
      if (args.length !== 2) {
        printHelp();
        return;
      }
      await removeCustomer(parseInt(args[1]));
      break;
    default:
      printHelp();
      break;
  }
  await pool.end();
};

runCLI();
