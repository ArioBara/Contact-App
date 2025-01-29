import './styles/styles.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RegisterForm from './pages/RegisterForm';
import LoginForm from './pages/LoginForm';
import Landing from './pages/LandingPage';
import Contact from './pages/Contact';
import ContactForm from './component/ContactForm';
import ContactUpdate from './component/ContactUpdate';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/contacts' element={<Contact />} />
          <Route path='/contacts/add' element={<ContactForm />} />
          <Route path='/contacts/edit/:id' element={<ContactUpdate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;