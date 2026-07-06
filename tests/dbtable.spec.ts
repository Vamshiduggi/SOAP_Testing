import { test } from '@playwright/test';
import db from '../database/db';

test("Print all tables in database", async () => {
    await new Promise<void>((resolve, reject) => {
        db.all(
            `SELECT name FROM sqlite_master WHERE type='table'`,
            (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log("Tables in Database:");
                console.table(rows);
                resolve();
            }
        );

    });

});