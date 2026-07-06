import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
dotenv.config();
const dbPath = process.env.DB_PATH;
if (!dbPath) {
    throw new Error('DB_PATH environment variable is required');
}
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Database Connected");
    }
});
export default db;