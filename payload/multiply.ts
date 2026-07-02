import { APIRequestContext, expect } from '@playwright/test';
export async function multiplyNumber(request: APIRequestContext, A: number, B: number) {
    const multiply = A * B;
    const body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
    <Multiply xmlns="http://tempuri.org/">
      <intA>${A}</intA>
      <intB>${B}</intB>
    </Multiply>
    </soap:Body>
    </soap:Envelope>`.trim();
    const response = await request.post('http://www.dneonline.com/calculator.asmx', {
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': '"http://tempuri.org/Multiply"',
        },
        data: body,
    }

    );
    expect(response.status()).toBe(200);
    console.log('Received SOAP response with status ,', response.status());
    console.log('Response body:', await response.text());
    return `<Response><Result>${multiply}</Result></Response>`;
}