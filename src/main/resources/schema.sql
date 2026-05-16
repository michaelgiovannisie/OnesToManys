CREATE TABLE IF NOT EXISTS trips (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    budget DOUBLE PRECISION,
    status TEXT,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS destinations (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    arrival_date DATE,
    departure_date DATE,
    budget DOUBLE PRECISION,
    status TEXT,
    notes TEXT,
    FOREIGN KEY (trip_id) REFERENCES trips(id)
);

CREATE TABLE IF NOT EXISTS places (
    id SERIAL PRIMARY KEY,
    destination_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    category TEXT,
    arrival_time TIMESTAMP,
    departure_time TIMESTAMP,
    budget DOUBLE PRECISION,
    status TEXT,
    notes TEXT,
    FOREIGN KEY (destination_id) REFERENCES destinations(id)
);