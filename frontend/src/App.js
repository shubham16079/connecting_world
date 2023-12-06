
import './App.css';
import RegistrationForm from './components/Register';
import GetUsers from './components/GetUsers';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Link,Routes} from 'react-router-dom';
import Chat from './components/Chat';
function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
          <Route path="/register"  element={<RegistrationForm />} />
           <Route path="/users" element={<GetUsers />} />
           <Route path="/login" exact element={<Login />} />
           <Route path="/" exact element={<RegistrationForm />} />
           <Route path="/chat" exact element={<Chat />} />
          </Routes>
            
      
      </div>
    </Router>
  );
}

export default App;
