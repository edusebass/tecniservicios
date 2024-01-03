import './App.css'
import HomePage from './pages/HomePage'
import SendEmailPage from './pages/SendEmailPage';
import PhonePage from './pages/PhonePage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="sendemail" element={<SendEmailPage />} />
          <Route path="sendPhone" element={<PhonePage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
