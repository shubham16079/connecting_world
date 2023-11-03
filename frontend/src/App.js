import logo from './logo.svg';
import './App.css';
import RegistrationForm from './components/Register';
import GetUsers from './components/GetUsers';
import { BrowserRouter as Router, Route, Link,Routes} from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="App">

          <Routes>
          <Route path="/" exact element={<RegistrationForm />} />
           <Route path="/users" element={<GetUsers />} />
          </Routes>
            
      
      </div>
    </Router>
  );
}

export default App;
