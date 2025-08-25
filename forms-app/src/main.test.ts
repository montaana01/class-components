import { describe, it, expect, vi, beforeEach } from 'vitest';

const renderSpy = vi.fn();
const createRootMock = vi.fn(() => ({ render: renderSpy }));

vi.mock('react-dom/client', () => {
  return {
    __esModule: true,
    createRoot: createRootMock,
  };
});

describe('main entry', () => {
  beforeEach(() => {
    vi.resetModules();
    createRootMock.mockClear();
    renderSpy.mockClear();
  });

  it('calls createRoot and render from react-dom/client', async () => {
    await import('@/main');

    expect(createRootMock).toHaveBeenCalled();
    expect(renderSpy).toHaveBeenCalled();
  });
});
