import logo from './logo.svg';
import './App.css';
import LoginPage from './Pages/loginPage';
import LandingPage from './Pages/LandingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RestaurantDetails from './Pages/VIewDetails';
import AddRestaurantForm from './Pages/AddRestaurantForm';
import Homepage from './Pages/Homepage';
import AddLeadForm from './Components/AddLeadsForm';
import AddInteractionForm from './Components/AddInteractionForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/landingPage" element={<Homepage />} />
          <Route path="/restaurants" element={<LandingPage/>} />
          <Route path="/addLeads" element={<AddLeadForm/>} />
          <Route path="/addInteraction" element={<AddInteractionForm/>} />
          <Route path="/restaurant/:id" element={<RestaurantDetails/>} />
          <Route path="/restaurant/new" element={<AddRestaurantForm/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;