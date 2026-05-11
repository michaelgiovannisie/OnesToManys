CREATE TABLE IF NOT EXISTS travel_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    budget double,
    status TEXT,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS destinations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    travel_plan_id INTEGER NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    arrival_date DATE,
    departure_date DATE,
    budget double,
    status TEXT,
    notes TEXT,
    FOREIGN KEY (travel_plan_id) REFERENCES travel_plans(id)
);

CREATE TABLE IF NOT EXISTS places (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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