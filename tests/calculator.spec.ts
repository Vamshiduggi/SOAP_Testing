import { test, expect } from '@playwright/test';
import { addNumber } from '../payload/addPage';
import { subNumber } from '../payload/subPage';
import { multiplyNumber } from '../payload/multiply';
import { divideNumber } from '../payload/dividePage';
// Test for adding two numbers via SOAP
test('Add two numbers via SOAP', async ({ request }) => {
    const result = await addNumber(request, 5, 3);
    expect(result).toMatch('8');
});
// Test for subtracting two numbers via SOAP
test('Subtract two numbers via SOAP', async ({ request }) => {
    const result = await subNumber(request, 5, 3);
    expect(result).toMatch('2');
});

// Test for multiplying two numbers via SOAP
test(`Multiply two numbers via SOAP`, async ({ request }) => {
    const result = await multiplyNumber(request, 5, 3);
    expect(result).toMatch('15');
});
// Test for division of two numbers via SOAP
test(`Test for division of two numbers via SOAP`, async ({ request }) => {
    const result = await divideNumber(request, 10, 2);
    expect(result).toMatch('5');
});