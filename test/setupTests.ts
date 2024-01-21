import 'jest';
import { jest } from '@jest/globals';

jest.mock('axios', () => ({
  ...(jest.requireActual('axios') as object),
}));
