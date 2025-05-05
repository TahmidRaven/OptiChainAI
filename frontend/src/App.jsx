import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home.jsx'
import Contact from './Components/Contact/Contact.jsx'
import Login from './Components/Login/Login.jsx'
import Profile from './Components/Profile/Profile.jsx'
import Registration from './Components/Registration/Registration.jsx'
import ForecastChart from './Components/Forecasting/ForecastChart.jsx'
import Layout from './Components/Layout/Layout.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="registration" element={<Registration />} />
        <Route path="forecast" element={<ForecastChart />} />
        
        {/* Uncomment when components are ready */}
        {/* <Route path="inventory" element={<InventoryOptimize />} /> */}
        {/* <Route path="supplier" element={<SupplierAnalytics />} /> */}
      </Route>
    </Routes>
  )
}

export default App