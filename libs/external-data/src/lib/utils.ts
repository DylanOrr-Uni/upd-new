// Utilities for timeouts, retries, and request throttling, etc.

import { DateRange } from './types';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const withTimeout = <T>(
  fn: () => Promise<T>,
  timeout
): (() => Promise<T>) => {
  return () =>
    new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`Function ${fn.name} timed out`));
      }, timeout);

      fn().then(
        (result) => {
          clearTimeout(timer);
          resolve(result);
        },
        (err) => {
          clearTimeout(timer);
          reject(err);
        }
      );
    });
};

export const withRetry = (fn, retries, delay) => {
  return () =>
    new Promise((resolve, reject) => {
      const attempt = (retries, delay) => {
        fn().then(
          (result) => {
            resolve(result);
          },
          (err) => {
            if (retries > 0) {
              setTimeout(() => {
                attempt(retries - 1, delay);
              }, delay);
            } else {
              reject(err);
            }
          }
        );
      };

      attempt(retries, delay);
    });
};

// For GSC or AA page queries, because they're only done on individual dates
/**
 *
 * @param dateRange DateRange object specifying the start and end dates
 * @param format The format of the date string, or false to return as Date objects
 * @param inclusive Whether or not to include the end date in the range (AA is exclusive)
 */
export function singleDatesFromDateRange(
  dateRange: DateRange,
  format: string | false = 'YYYY-MM-DD',
  inclusive = false
): Date[] | string[] {
  const dates: Dayjs[] = [];

  let currentDate = dayjs.utc(dateRange.start);

  const endDate = inclusive
    ? dayjs.utc(dateRange.end).add(1, 'day')
    : dayjs.utc(dateRange.end);

  while (!currentDate.isSame(endDate, 'day')) {
    dates.push(currentDate);
    currentDate = currentDate.add(1, 'day');
  }

  return format
    ? dates.map((date) => date.format(format))
    : dates.map((date) => date.toDate());
}
