// /App.js

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PhotoGrid from './components/PhotoGrid';
import PhotoDetail from './components/PhotoDetail';
import "./styles/global.css";
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Header Component */}
        <Header/>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Navigate to="/photos" />} />
          <Route path="/photos" element={<PhotoGrid />} />
          <Route path="/photos/:id" element={<PhotoDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
