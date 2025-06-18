import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { UserProvider } from './contexts/UserContext';
import { BookingProvider } from './contexts/BookingContext';
import { ListingProvider } from './contexts/ListingContext'; // ✅ Import ListingContext

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ListingProvider> {/* ✅ Wrap inside ListingProvider */}
          <BookingProvider> {/* ✅ Wrap inside BookingProvider */}
            <App />
          </BookingProvider>
        </ListingProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
