import { requireUser } from './requireUser';

describe('requireUser', () => {
  const originalBypass = process.env.AUTH_BYPASS;

  afterEach(() => {
    process.env.AUTH_BYPASS = originalBypass;
  });

  it('returns mock user when AUTH_BYPASS=true', async () => {
    process.env.AUTH_BYPASS = 'true';

    await expect(requireUser()).resolves.toEqual({
      id: 'dev-user-id',
      email: 'dev@example.com'
    });
  });

  it('throws when AUTH_BYPASS is not true', async () => {
    process.env.AUTH_BYPASS = 'false';

    await expect(requireUser()).rejects.toThrow('Unauthenticated');
  });

  it('accepts AUTH_BYPASS=1 as enabled', async () => {
    process.env.AUTH_BYPASS = '1';

    await expect(requireUser()).resolves.toMatchObject({ id: 'dev-user-id' });
  });
});
