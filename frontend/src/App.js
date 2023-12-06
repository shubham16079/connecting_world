
import './App.css';
import RegistrationForm from './components/Register';
import GetUsers from './components/GetUsers';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Link,Routes} from 'react-router-dom';
import Chat from './components/Chat';
import TextLinkExample from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <div className="App">
        <TextLinkExample />
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
