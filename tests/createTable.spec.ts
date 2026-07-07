import { test, expect } from "@playwright/test";
import db from '../database/db';
import { queries } from '../queries/custQueries';
// Creating table
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
    expect(table.name).toBe("Customer");
});
