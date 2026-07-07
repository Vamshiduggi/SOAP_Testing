export const queries = {
    insert: `
        INSERT INTO Customer(id, name, mobile, email)
        VALUES (?, ?, ?, ?)
    `,
    getAll: `
        SELECT * FROM Customer
    `,
    getById: `
        SELECT * FROM Customer
        WHERE id = ?
    `,
    update: `
        UPDATE Customer
        SET email = ?
        WHERE id = ?
    `,
    delete: `
        DELETE FROM Customer
        WHERE id = ?
    `,
    deleteAll:`DELETE FROM Customer`,

    createTable: `CREATE TABLE IF NOT EXISTS Customer(
                    id INTEGER PRIMARY KEY,
                    name TEXT,
                    mobile NUMBER,
                    email TEXT
                )
    `,
    getTable: `SELECT name FROM sqlite_master
             WHERE type='table' AND name='Customer'`
};