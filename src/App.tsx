import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './ProtectedRoute';
import CharacterList from './components/ListCharacteres';
import CharacterDetail from './components/DetailCharacter';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/characters" element={<ProtectedRoute element={<CharacterList />} />} />
        <Route path="/character/:id" element={<ProtectedRoute element={<CharacterDetail />} />} />
      </Routes>
    </Router>
  );
};

export default App;
