import 'dotenv/config';
declare const process: { env: { [key: string]: string | undefined } };
// tests/soapClient.ts
import { APIRequestContext, expect } from '@playwright/test';

export async function sayHelloSoap(request: APIRequestContext, name: string) {
    const xmlBody = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
     <soapenv:Header/>
     <soapenv:Body>
         <HelloRequest xmlns="http://learnwebservices.com/services/hello">
            <Name>${name}</Name>
         </HelloRequest>
     </soapenv:Body>
  </soapenv:Envelope>`.trim();

    const url = process.env.HELLO_SOAP_URL || 'https://apps.learnwebservices.com/services/hello';
    
    const response = await request.post(
        url,
        {
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
            },
            data: xmlBody,
        },
    );

    expect(response.status()).toBe(200);
    console.log('Received SOAP response with status ,', response.status());
    console.log('Response body:', await response.text());

    const respText = await response.text();
    return respText;
}