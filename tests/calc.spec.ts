import { test, expect } from '@playwright/test';
// Addition of two numbers using SOAP request
test('SOAP Add request', async ({ request }) => {
    const soapBody = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema"
               xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <Add xmlns="http://tempuri.org/">
      <intA>5</intA>
      <intB>7</intB>
    </Add>
  </soap:Body>
</soap:Envelope>`;

    const response = await request.post('http://www.dneonline.com/calculator.asmx', {
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': '"http://tempuri.org/Add"',
        },
        data: soapBody,
    });

    expect(response.ok()).toBeTruthy();
    console.log(`The response status is: ${response.status()}`);
    const text = await response.text();
    console.log(text);
});

// Subtraction of two numbers using SOAP request
test('SOAP Subtract request', async ({ request }) => {
    const soapBody = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema"
               xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <Subtract xmlns="http://tempuri.org/">
      <intA>10</intA>
      <intB>5</intB>
    </Subtract>
  </soap:Body>
</soap:Envelope>`;
    const response = await request.post('http://www.dneonline.com/calculator.asmx', {
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': '"http://tempuri.org/Subtract"',
        },
        data: soapBody,
    });
    expect(response.ok()).toBeTruthy();
    console.log(`The response status is: ${response.status()}`);
    const text = await response.text();
    console.log(text);
});
// Multiplication of two numbers using SOAP request
test('SOAP Multiply request', async ({ request }) => {
    const soapBody = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema"
               xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <Multiply xmlns="http://tempuri.org/">
            <intA>6</intA>
            <intB>4</intB>
        </Multiply>
    </soap:Body>
</soap:Envelope>`;
    const response = await request.post('http://www.dneonline.com/calculator.asmx', {
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': '"http://tempuri.org/Multiply"',
        },
        data: soapBody,
    });
    expect(response.ok()).toBeTruthy();
    console.log(`The response status is: ${response.status()}`);
    const text = await response.text();
    console.log(text);
});
// Division of two numbers using SOAP request
test('SOAP Divide request', async ({ request }) => {
    const soapBody = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema"
               xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <Divide xmlns="http://tempuri.org/">
            <intA>20</intA>
            <intB>4</intB>
        </Divide>
    </soap:Body>
</soap:Envelope>`;


    const response = await request.post('http://www.dneonline.com/calculator.asmx', {
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'SOAPAction': '"http://tempuri.org/Divide"',
        },
        data: soapBody,
    });
    expect(response.ok()).toBeTruthy();
    console.log(`The response status is: ${response.status()}`);
    const text = await response.text();
    console.log(text);
});

