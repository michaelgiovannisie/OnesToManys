CREATE TABLE IF NOT EXISTS trips (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    budget double,
    status TEXT,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS destinations (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    trip_id INTEGER NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    arrival_date DATE,
    departure_date DATE,
    budget double,
    status TEXT,
    notes TEXT,
    FOREIGN KEY (trip_id) REFERENCES trips(id)
);

CREATE TABLE IF NOT EXISTS places (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    destination_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    category TEXT,
    arrival_time DATETIME,
    departure_time DATETIME,
    budget double,
    status TEXT,
    notes TEXT,
    FOREIGN KEY (destination_id) REFERENCES destinations(id)
);