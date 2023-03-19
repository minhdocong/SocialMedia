// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import Demo from './App';

// test('renders learn react link', () => {
//   render(<Demo />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import React from 'react';
import { createRoot } from 'react-dom/client';
import Demo from './App';

createRoot(document.getElementById('root')as HTMLElement).render(<Demo />);