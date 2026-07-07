import { test, expect } from "@playwright/test";
import db from '../database/db';
import customers from '../testData/customers.json';
import { queries } from '../queries/custQueries';
// Insert Single Record
test("Insert Single Record", async () => {
    await new Promise<void>((resolve, reject) => {
        db.run(
            queries.insert,
            [
                customers[20].id,
                customers[20].name,
                customers[20].mobile,
                customers[20].email
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
    // Assertion
    const row: any = await new Promise((resolve, reject) => {
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
        // Assertions
        expect(row).toBeTruthy();
        expect(row.id).toBe(customers[20].id);
        expect(row.name).toBe(customers[20].name);
        expect(row.mobile).toBe(customers[20].mobile);
        expect(row.email).toBe(customers[20].email);
    });

// Inserting and verifying all records
customers.forEach((customer) => {
    test(`Insert Customers - ${customer.name}`, async () => {
        // Insert the customer
        await new Promise<void>((resolve, reject) => {
            db.run(
                queries.insert,
                [
                    customer.id,
                    customer.name,
                    customer.mobile,
                    customer.email
                ],
                (err) => {
                    if (err)
                        reject(err);
                    else
                        resolve();
                }
            );
        });
        // Fetch the inserted customer
        const row: any = await new Promise((resolve, reject) => {
            db.get(
                queries.getById,
                [customer.id],
                (err, row) => {
                    if (err)
                        reject(err);
                    else
                        resolve(row);
                }
            );
        });
        // Assertions
        expect(row).toBeTruthy();
        expect(row.id).toBe(customer.id);
        expect(row.name).toBe(customer.name);
        expect(row.mobile).toBe(customer.mobile);
        expect(row.email).toBe(customer.email);
    });
});
