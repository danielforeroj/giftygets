import { describe, expect, it, vi } from 'vitest';

const createMock = vi.fn(async ({ data }: any) => ({ id: 'trk_1', ...data, rules: [] }));

vi.mock('@/server/db/prisma', () => ({
  prisma: {
    tracker: { create: createMock, findMany: vi.fn(), findFirst: vi.fn(), update: vi.fn(), deleteMany: vi.fn() },
    trackerRule: { upsert: vi.fn(), findMany: vi.fn() }
  }
}));

describe('createTracker', () => {
  it('sets nextRunAt when creating tracker', async () => {
    const { createTracker } = await import('@/server/trackers/trackerService');
    await createTracker('user_1', { name: 'My tracker', url: 'https://example.myshopify.com/p/1', frequencyTier: 'hourly' });

    expect(createMock).toHaveBeenCalled();
    const args = createMock.mock.calls[0][0];
    expect(args.data.nextRunAt).toBeInstanceOf(Date);
    expect(args.data.lastRunAt).toBeNull();
  });
});
