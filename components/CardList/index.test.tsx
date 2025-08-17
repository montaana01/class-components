// import '@testing-library/jest-dom';
// import { describe, it, expect } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import CardList from './index.tsx';
// import { mockData } from '../../test-utils/mock-constants.ts';
// import { MemoryRouter } from 'react-router';
//
// describe('CardList', () => {
//   it('should render list of Cards, count should = mockData.results.length', () => {
//     render(
//       <MemoryRouter initialEntries={['/search?page=1']}>
//         <CardList items={mockData.results} />
//       </MemoryRouter>
//     );
//     const linkElements = screen.getAllByRole('heading');
//     expect(linkElements).toHaveLength(mockData.results.length);
//   });
//   it('should render right items from response in 5 cases', () => {
//     render(
//       <MemoryRouter initialEntries={['/search?page=1']}>
//         <CardList items={mockData.results} />
//       </MemoryRouter>
//     );
//     const linkElements = screen.getAllByRole('heading');
//     expect(linkElements[10]).toHaveTextContent(mockData.results[10].name);
//     expect(linkElements[15]).toHaveTextContent(mockData.results[15].name);
//     expect(linkElements[5]).toHaveTextContent(mockData.results[5].name);
//   });
// });
