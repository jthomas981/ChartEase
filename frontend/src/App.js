import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Flowcharts from './pages/Flowcharts'
import Header from './components/Header'

// This refreshes the server to avoid it shutting down.
const ur11 = `https://bookquest-h8cl.onrender.com/`; 
const ur12 = `https://environmental-anomalies.onrender.com/`; 
const ur13 = `https://yourappname.onrender.com/`; 
const interval = 300000; // Interval in milliseconds (300 seconds)

function reloadWebsite() {
  axios.get(url)
    .then(response => {
      console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    });
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}

setInterval(reloadWebsite, interval);    

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/flowcharts' element={<Flowcharts />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App