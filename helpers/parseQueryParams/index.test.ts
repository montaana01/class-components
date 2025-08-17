// import { describe, it, expect } from 'vitest';
// import { parseQueryParams } from './index';
//
// describe('parseQueryParams', () => {
//   it('parses all parameters correctly', () => {
//     const result = parseQueryParams('?page=3&query=search&active=1');
//     expect(result).toEqual({ page: 3, query: 'search', active: 1 });
//   });
//
//   it('defaults to page=1 if page is missing', () => {
//     const result = parseQueryParams('?query=test&active=2');
//     expect(result.page).toBe(1);
//   });
//
//   it('defaults to query="" if query is missing', () => {
//     const result = parseQueryParams('?page=2&active=0');
//     expect(result.query).toBe('');
//   });
//
//   it('handles invalid number values gracefully', () => {
//     const result = parseQueryParams('?page=abc&active=xyz');
//     expect(result.page).toBeNaN();
//     expect(result.active).toBeNaN();
//   });
//
//   it('ignores extra parameters not defined in QueryParams', () => {
//     const result = parseQueryParams('?page=5&query=test&active=1&extra=value');
//     expect(result).toEqual({ page: 5, query: 'test', active: 1 });
//   });
// });
