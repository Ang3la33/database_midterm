-- Create tables

-- Movies table
CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    year INTEGER,
    genre TEXT,
    director TEXT
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    customerId SERIAL PRIMARY KEY,
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    phoneNum TEXT
);

-- Rentals table
CREATE TABLE IF NOT EXISTS rentals (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
    customer_id INTEGER REFERENCES customers(customerId) ON DELETE CASCADE,
    rental_date DATE NOT NULL DEFAULT CURRENT_DATE,
    return_date DATE
);


-- Insert sample data into tables

-- Insert movies
INSERT INTO movies (title, year, genre, director)
VALUES
    ('The Godfather', 1972, 'Crime', 'Francis Ford Coppola'),
    ('Pulp Fiction', 1994, 'Crime', 'Quintin Tarentino'),
    ('Forrest Gump', 1994, 'Drama', 'Robert Zemeckis'),
    ('Jurassic Park', 1993, 'Adventure', 'Steven Spielberg'),
    ('Braveheart', 1995, 'History', 'Mel Gibson');

-- Insert customers
INSERT INTO customers (firstName, lastName, email, phoneNum)
VALUES
    ('Jenny','Craig','jenny@example.com','888-867-5309'),
    ('Bob','Dylan','bobbyd@example.com','888-999-1234'),
    ('Jane','Austin','jane@example.com','888-321-7654'),
    ('John','Doe','johnny@example.com','888-876-9012'),
    ('Alice','Davies','adavies@example.com','888-777-0987');

-- Insert rentals
INSERT INTO rentals (movie_id, customer_id, rental_date, return_date)
VALUES
    (3, 1, '2024-10-01', '2024-10-04'), -- Jenny rented Forrest Gump
    (1, 2, '2024-10-03', '2024-10-04'), -- Bob rented The Godfather
    (4, 5, '2024-10-03', NULL), --Alice rented Jurassic Park, has not returned
    (5, 4, '2024-10-07', '2024-10-09'), --John rented Braveheart
    (2, 3, '2024-10-07', '2024-10-10'), -- Jane rented Pulp Fiction
    (3, 4, '2024-10-10', NULL), -- John rented Forrest Gump, has not returned
    (1, 1, '2024-10-10', '2024-10-12'), -- Jenny rented The Godfather
    (5, 3, '2024-10-11', '2024-10-14'), -- Jane rented Braveheart
    (2, 2, '2024-10-16', NULL), -- Bob rented Pulp Fiction, has not returned
    (5, 1, '2024-10-16', NULL); -- Jenny rented Braveheart, has not returned


