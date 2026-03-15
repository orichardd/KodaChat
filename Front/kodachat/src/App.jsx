import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import { LoginPage } from './Pages/LoginPage.jsx';
import { HomePage } from './Pages/HomePage.jsx';
import { AboutPage } from './Pages/AboutPage.jsx';
import { ProfilePage } from './Pages/ProfilePage.jsx';
import { SignUpPage } from './Pages/SignUpPage.jsx';
import { CommentsPage } from './Pages/CommentsPage.jsx';
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<SignUpPage />} />
        <Route path="/" element={
          <ProtectedRoute><HomePage /></ProtectedRoute>
        } />
        <Route path="/home" element={
          <ProtectedRoute><HomePage /></ProtectedRoute>
        } />
        <Route path="/sobre" element={
          <ProtectedRoute><AboutPage /></ProtectedRoute>
        } />
        <Route path="/perfil/:username" element={
          <ProtectedRoute><ProfilePage /></ProtectedRoute>
        } />
        <Route path="/comentarios/:postId" element={
          <ProtectedRoute><CommentsPage /></ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
