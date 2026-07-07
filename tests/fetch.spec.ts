
import {test,expect} from "@playwright/test";
import db from '../database/db';
import customers from '../testData/customers.json';
import { queries } from '../queries/custQueries';

// Fetch all records
test("Fetch all records in customers", async () => {
    const rows: any = await new Promise((resolve, reject) => {
        db.all(queries.getAll, (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        });
    });
    console.table(rows);
    // Verify number of records
    expect(rows).toHaveLength(customers.length);
    // Verify each record
    rows.forEach((row: any, index: number) => {
        expect(row.id).toBe(customers[index].id);
        expect(row.name).toBe(customers[index].name);
        expect(String(row.mobile)).toBe(String(customers[index].mobile));
        expect(row.email).toBe(customers[index].email);
    });

});

// Fetch Single Record
test("Fetch Single Record", async () => {
    const row: any = await new Promise((resolve, reject) => {
        db.get(
            queries.getById,
            [customers[1].id],
            (err, row) => {
                if (err)
                    reject(err);
                else
                    resolve(row);
                    console.table(row);
            }
        );
    });
    console.log("Record fetched successfully.");
    expect(row.name).toBe(customers[1].name);
    expect(row.mobile).toBe(customers[1].mobile);
});