// tests/hello-soap.spec.ts
import { test, expect } from '@playwright/test';
import { sayHelloSoap } from '../payload/soapClient';

test('SOAP hello service returns greeting', async ({ request }) => {
  const responseXml = await sayHelloSoap(request, 'Vamshi');
  expect(responseXml).toContain('HelloResponse');
  expect(responseXml).toContain('Message');
  expect(responseXml).toMatch('Hello Vamshi!');
});
