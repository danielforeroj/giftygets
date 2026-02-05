import { GET } from './route';

describe('health route', () => {
  it('returns ok status payload', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ status: 'ok' });
  });
});
