import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import Wallet from './Wallet';
import Trade from './Trade';
import Invite from './Invite';
import Earn from './Earn';

function App() {
  return (
    <Router basename="/Fish-Token-Frontend">
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/invite" element={<Invite />} />
      </Routes>
    </Router>
  );
}

export default App;
