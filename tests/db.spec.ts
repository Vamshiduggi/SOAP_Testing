import { test, expect } from '@playwright/test';
import db from '../database/db';
import students from '../testData/students.json';
import { queries } from '../queries/queries';

test.describe("SQLite Database Testing", () => {
    test("Create Table", async () => {
        // Create Table
        await new Promise<void>((resolve, reject) => {
            db.run(queries.createTable, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
        // Verify Table Exists
        const table: any = await new Promise((resolve, reject) => {
            db.get(
                queries.getTable,
                (err, row) => {
                    if (err)
                        reject(err);
                    else
                        resolve(row);
                }
            );
        });
        console.log("Table Created Successfully.");
        expect(table).toBeTruthy();
        expect(table.name).toBe("Student");
    });
});
// Insert Record
test("Insert Record", async () => {
    await new Promise<void>((resolve, reject) => {
        db.run(
            queries.insert,
            [
                students[1].id,
                students[1].name,
                students[1].mobile,
                students[1].email
            ],
            (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            }
        );
        console.log("Record Inserted Successfully.")
    });
});

// Insert Multiple Records
test("Insert Multiple Records", async () => {
    await new Promise<void>((resolve, reject) => {
        db.serialize(() => {
            const stmt = db.prepare(queries.insert);
            students.forEach((stu) => {
                stmt.run(
                    stu.id,
                    stu.name,
                    stu.mobile,
                    stu.email
                );
            });
            stmt.finalize((err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
        console.log("Multiple records inserted successfully.")
    });
});

// Fetch Record
test("Fetch Record", async () => {
    const row: any = await new Promise((resolve, reject) => {
        db.get(
            queries.getById,
            [students[1].id],
            (err, row) => {
                if (err)
                    reject(err);
                else
                    resolve(row);
            }
        );
    });
    console.log("Record fetched successfully.");
    expect(row.name).toBe(students[1].name);
});

// Fetch all records
test('Fetch all records', async () => {
    db.all(queries.getAll, (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            console.table(rows);
        }
    });
    console.log("All records fetched successfully.");
});

// Update Record
test("Update and verify Record", async () => {
    await new Promise<void>((resolve, reject) => {
        db.run(
            queries.update,
            ['rakesh123@gmail.com',students[17].id],
            (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            }
        );
        console.log("Record updated successfully.");
    });
    const row: any = await new Promise((resolve, reject) => {
        db.get(
            queries.getById,
            [students[17].id],
            (err, row) => {
                if (err)
                    reject(err);
                else
                    resolve(row);
            }
        );
    });
    expect(row.email).toBe("rakesh123@gmail.com");
});

// Delete Record
test("Delete and verify Record", async () => {
    await new Promise<void>((resolve, reject) => {
        db.run(
            queries.delete,
            [students[19].id],
            (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            }
        );
        console.log("Record deleted successfully.");
    });
    const row = await new Promise((resolve, reject) => {
        db.get(
            queries.getById,
            [students[19].id],
            (err, row) => {
                if (err)
                    reject(err);
                else
                    resolve(row);
            }
        );
    });
    expect(row).toBeUndefined();
});




