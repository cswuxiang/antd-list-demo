import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import GPTList from './gptList.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GPTList />
  </StrictMode>,
);