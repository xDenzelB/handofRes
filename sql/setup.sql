-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS cars;

CREATE TABLE cars (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    model TEXT NOT NULL,
    make TEXT NOT NULL,
    year INT NOT NULL 
);

INSERT INTO 
cars (model, make, year)
VALUES
    ('4runner', 'toyota,', 2010),
    ('gtr', 'nissan,', 2009),
    ('m3', 'BMW,', 2011);

DROP TABLE IF EXISTS pizza;

CREATE TABLE pizza (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    crust TEXT NOT NULL,
    cheese TEXT NOT NULL,
    topping TEXT NOT NULL 
);

INSERT INTO 
pizza (crust, cheese, topping)
VALUES
    ('hand tossed', 'pepper jack', 'ham'),
    ('pan pizza', 'mozzarella,', 'sausage'),
    ('pan pizza', 'mozzarella,', 'salami');

DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    director TEXT NOT NULL,
    year INT NOT NULL 
);

INSERT INTO 
movies (title, director, year)
VALUES
    ('Avengers', 'Kevin Fiege', 2018),
    ('Spiderman', 'Sam Raimi', 2002),
    ('Spiderman 2', 'Sam Raimi', 2004);
DROP TABLE IF EXISTS beer;

CREATE TABLE beer (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type TEXT NOT NULL,
    hop INT NOT NULL,
    flavor TEXT NOT NULL 
);

INSERT INTO 
beer (type, hop, flavor)
VALUES
    ('Ale', 5, 'light'),
    ('Stout', 4, 'bitter'),
    ('lager', 2, 'light');
DROP TABLE IF EXISTS music;

CREATE TABLE music (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    song TEXT NOT NULL,
    artist TEXT NOT NULL,
    genre TEXT NOT NULL,
    year INT NOT NULL 
);

INSERT INTO 
music (song, artist, genre, year)
VALUES
    ('Pakala Waters', 'Kolohe Kai', 'Island', 2009),
    ('Karate', 'Kenny', 'pop', 2009),
    ('Time Will only Tell', 'Blxst', 'Hip/hop', 2020);
