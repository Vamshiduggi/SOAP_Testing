import { test, expect } from '@playwright/test';
import db from '../database/db';
import customers from '../testData/customers.json';
import { queries } from '../queries/custQueries';

// Delete All Records
test("Delete all records", async () => {
    // Delete all records
    await new Promise<void>((resolve, reject) => {
        db.run(queries.deleteAll, (err) => {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
    console.log("All records deleted successfully.");
    // Fetch all records
    const rows: any = await new Promise((resolve, reject) => {
        db.all(queries.getAll, (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
    console.table(rows);
    // Assert table is empty
    expect(rows).toHaveLength(0);
});

// Delete Single Record
test("Delete Single records", async () => {
    await new Promise<void>((resolve, reject) => {
        db.run(queries.delete,
            [customers[20].id],
            (err) => {
                if (err)
                    reject();
                else
                    resolve();
            }
        )
    })
    const row = await new Promise((resolve, reject) => {
        db.get(
            queries.getById,
            [customers[20].id],
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