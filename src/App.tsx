import './App.css'
import HomePage from './pages/HomePage'
import SendEmailPage from './pages/SendEmailPage';
import PhonePage from './pages/PhonePage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StockPage from './pages/StockPage';
import Navbar from './components/NavBar';


function App() {

  return (
    <>
      <Router>
        <Routes>
        <Route
          path="/*"
          element={
            <Navbar>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="sendemail" element={<SendEmailPage />} />
                <Route path="sendPhone" element={<PhonePage />} />
                <Route path="stock" element={<StockPage />} />
              </Routes>
            </Navbar>
          }
        />
        </Routes>
      </Router>
    </>
  )
}

export default App
