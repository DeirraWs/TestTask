import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryList from './Components/CountryList/CountryList';
import CountryInfo from './Components/CountryInfo/CountryInfo';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/country" element={<CountryInfo />} />
      </Routes>
    </Router>
  );
};

export default App;
