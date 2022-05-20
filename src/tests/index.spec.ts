import supertest from 'supertest';
import app from '../index';


const request = supertest(app);

describe('Test endpoint responses', () => {
  
  it('expects valid query strings', async () => {
    const response: any = await request.get(`/api/images?fileName=aaa&width=123&height=456`)
    expect(response.status).toBe(200)
  });
  
  it('expects query without height', async () => {
    const response: any = await request.get(`/api/images?fileName=aaa&width=123`)
    expect(response.status).toBe(400)
  });

  it('expects query without width', async () => {
    const response: any = await request.get(`/api/images?fileName=aaa&height=321`)
    expect(response.status).toBe(400)
  });

  it('expects query without fileName', async () => {
    const response: any = await request.get(`/api/images?&width=123&height=321`)
    expect(response.status).toBe(400)
  });

});