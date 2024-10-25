import {formatDate} from './dateHelpers';

describe('formatDate', () => {
  const validDate = new Date(2024, 9, 25);

  test('formats date in English locale', () => {
    expect(formatDate(validDate, 'en-US')).toBe('October 25, 2024');
  });

  test('formats date in Czech locale', () => {
    expect(formatDate(validDate, 'cs-CZ')).toBe('25. října 2024');
  });

  test('formats date in Slovak locale', () => {
    expect(formatDate(validDate, 'sk-SK')).toBe('25. októbra 2024');
  });

  test('formats date with non-standard locale (fallback behavior)', () => {
    expect(formatDate(validDate, 'xyz-XYZ')).toBe('October 25, 2024');
  });

  test('handles leap day on a leap year', () => {
    const leapDate = new Date(2024, 1, 29);
    expect(formatDate(leapDate, 'en-US')).toBe('February 29, 2024');
  });

  test('handles end of the year', () => {
    const endOfYearDate = new Date(2023, 11, 31);
    expect(formatDate(endOfYearDate, 'en-US')).toBe('December 31, 2023');
  });

  test('handles beginning of the year', () => {
    const beginningOfYearDate = new Date(2024, 0, 1);
    expect(formatDate(beginningOfYearDate, 'en-US')).toBe('January 1, 2024');
  });

  test('handles invalid date', () => {
    const invalidDate = new Date('Invalid Date');
    expect(() => formatDate(invalidDate, 'en-US')).toThrow();
  });

  test('formats with missing day (only year and month)', () => {
    const partialDate = new Date(2024, 9);
    expect(formatDate(partialDate, 'en-US')).toBe('October 1, 2024');
  });

  test('handles dates far in the past', () => {
    const pastDate = new Date(0);
    expect(formatDate(pastDate, 'en-US')).toBe('January 1, 1970');
  });

  test('handles dates far in the future', () => {
    const futureDate = new Date(3000, 0, 1);
    expect(formatDate(futureDate, 'en-US')).toBe('January 1, 3000');
  });
});
