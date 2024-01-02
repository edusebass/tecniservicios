import './App.css'
import HomePage from './pages/HomePage'
import SendEmailPage from './pages/SendEmailPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="sendemail" element={<SendEmailPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
