import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Flowcharts from './pages/Flowcharts'
import Header from './components/Header'
import axios from 'axios'


// This refreshes the server to avoid it shutting down.
const url1 = `https://bookquest-h8cl.onrender.com/`
const url2 = `https://environmental-anomalies.onrender.com/`
const url3 = `https://chartease-o7o7.onrender.com/`
const interval = 300000; // Interval in milliseconds (300 seconds)

function reloadWebsite() {
  axios.get(url1)
    .then(response => {
      console.log(`Reloaded at ${url1} on ${new Date().toISOString()}: Status Code ${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    })
  axios.get(url2)
    .then(response => {
      console.log(`Reloaded at ${url2} on ${new Date().toISOString()}: Status Code ${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    })
  axios.get(url3)
    .then(response => {
      console.log(`Reloaded at ${url3} on ${new Date().toISOString()}: Status Code ${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    })
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