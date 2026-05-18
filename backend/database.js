const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function setupDb() {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            role TEXT CHECK(role IN ('Employee', 'Manager', 'Admin')) NOT NULL,
            manager_id INTEGER,
            FOREIGN KEY (manager_id) REFERENCES users(id)
        );

        CREATE TABLE IF NOT EXISTS goals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            thrust_area TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            uom TEXT CHECK(uom IN ('Numeric', '%', 'Timeline', 'Zero')) NOT NULL,
            target REAL NOT NULL,
            weightage INTEGER NOT NULL,
            status TEXT DEFAULT 'Not Started',
            year INTEGER NOT NULL,
            approved INTEGER DEFAULT 0, -- 0: Draft, 1: Pending, 2: Approved, 3: Rework
            is_shared INTEGER DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );

        CREATE TABLE IF NOT EXISTS achievements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            goal_id INTEGER NOT NULL,
            quarter INTEGER NOT NULL, -- 1, 2, 3, 4
            actual REAL,
            status TEXT,
            manager_comment TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (goal_id) REFERENCES goals(id)
        );

        CREATE TABLE IF NOT EXISTS audit_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            goal_id INTEGER,
            user_id INTEGER NOT NULL,
            action TEXT NOT NULL,
            old_value TEXT,
            new_value TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `);

    // Seed some data if empty
    const userCount = await db.get('SELECT COUNT(*) as count FROM users');
    if (userCount.count === 0) {
        await db.run('INSERT INTO users (name, email, role) VALUES (?, ?, ?)', ['Admin User', 'admin@apexokr.com', 'Admin']);
        const manager = await db.run('INSERT INTO users (name, email, role) VALUES (?, ?, ?)', ['Manager User', 'manager@apexokr.com', 'Manager']);
        await db.run('INSERT INTO users (name, email, role, manager_id) VALUES (?, ?, ?, ?)', ['Employee User', 'employee@apexokr.com', 'Employee', manager.lastID]);
    }

    return db;
}

module.exports = { setupDb };
