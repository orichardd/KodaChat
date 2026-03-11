import { Routes, Route, Link } from 'react-router-dom';
import { LoginPage } from './Pages/LoginPage.jsx';
import { HomePage } from './Pages/HomePage.jsx';
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
