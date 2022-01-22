import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Account from './components/Account';
import ExperiencesList from './components/ExperiencesList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/createAccount" element={<Account />} />
          <Route path="/experiencesList" element={<ExperiencesList />} />
          <Route path="/myAccount" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
