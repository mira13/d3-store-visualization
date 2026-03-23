
import React from 'react';
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { setupWorker } from 'msw/browser'
import { http, HttpResponse } from 'msw'
/**
* @vitest-environment jsdom
*/

let mockData = 
  '[{"Row ID":1,"Order ID":"CA-2013-152156","Ship Mode":"Second Class","Customer ID":"CG-12520","Customer Name":"Claire Gute","Segment":"Consumer","Country":"United States","City":"Henderson","State":"Kentucky","Postal Code":"42420","Region":"West","Product ID":"FUR-BO-10001798","Category":"Furniture","Sub-Category":"Bookcases","Product Name":"Bush Somerset Collection Bookcase","Sales":261.96,"Quantity":2,"Discount":0.0,"Profit":41.9136,"Order Date":1383955200000,"Ship Date":1384214400000}, {"Row ID":1,"Order ID":"CA-2013-152156","Ship Mode":"Second Class","Customer ID":"CG-12520","Customer Name":"Claire Gute","Segment":"Consumer","Country":"United States","City":"Henderson","State":"Kentucky","Postal Code":"42420","Region":"South","Product ID":"FUR-BO-10001798","Category":"Furniture","Sub-Category":"Bookcases","Product Name":"Bush Somerset Collection Bookcase","Sales":261.96,"Quantity":2,"Discount":0.0,"Profit":41.9136,"Order Date":1383955200000,"Ship Date":1384214400000}]';

test('Welcome message displayed correctly', () => {
  render(<App />);
  expect(screen.getByText('Profit chart')).toBeInTheDocument();
});


const worker = setupWorker(
  http.get('http://localhost:8000/', () => {
    return HttpResponse.text(mockData)
  })
)
beforeAll(() => worker.start())
afterEach(() => worker.resetHandlers())
afterAll(() => worker.stop())

test('App handles loading and success ', async () => {
  // Test success state
  worker.use(
    http.get('http://localhost:8000/', () => {
      return HttpResponse.text(mockData)
    })
  )
  render(<App />);

  expect(screen.getByText("Loading data...")).toBeInTheDocument();

  const data = await screen.findByText('0');
  expect(data).toBeInTheDocument();

})

test('App renders data correctly', async () => {
  // Test amount of bars rendered is expected
  worker.use(
    http.get('http://localhost:8000/', () => {
      return HttpResponse.text(mockData)
    })
  )
  const { container } = render(<App />)

  const data = await screen.findByText('0');
  const rect = container.querySelectorAll('rect')
  expect(rect.length).to.equal(2);

})




