import {test,expect} from "@playwright/test";
import db from '../database/db';
import customers from '../testData/customers.json';
import { queries } from '../queries/custQueries';

// Update Record
test("Update and verify Record", async () => {
    await new Promise<void>((resolve, reject) => {
        db.run(
            queries.update,
            ['rakesh123@gmail.com',customers[17].id],
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
            [customers[17].id],
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