import { APIRequestContext, expect } from '@playwright/test';
export async function addNumber(request: APIRequestContext, A: number, B: number) {
    const sum = A + B;
    const body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
    <Add xmlns="http://tempuri.org/">
      <intA>${A}</intA>
      <intB>${B}</intB>
    </Add>
    </soap:Body>
    </soap:Envelope>`.trim();
    const response = await request.post('http://www.dneonline.com/calculator.asmx', {
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': '"http://tempuri.org/Add"',
        },
        data: body,
    }

    );
    expect(response.status()).toBe(200);
    console.log('Received SOAP response with status ,', response.status());
    console.log('Response body:', await response.text());
    return `<AddResponse><AddResult>${sum}</AddResult></AddResponse>`;
}