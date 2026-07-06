export const queries = {
    insert: `
        INSERT INTO Student(id, name, mobile, email)
        VALUES (?, ?, ?, ?)
    `,

    getAll: `
        SELECT * FROM Student
    `,

    getById: `
        SELECT * FROM Student
        WHERE id = ?
    `,

    update: `
        UPDATE Student
        SET salary = ?
        WHERE id = ?
    `,

    delete: `
        DELETE FROM Student
        WHERE id = ?
    `,
    createTable: `CREATE TABLE IF NOT EXISTS Student(
                    id INTEGER PRIMARY KEY,
                    name TEXT,
                    mobile NUMBER,
                    email TEXT
                )
    `,
    getTable: `SELECT name FROM sqlite_master
             WHERE type='table' AND name='Student'`
};