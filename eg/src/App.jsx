import './bootstrap.css';
import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Back from './Components/Back/Back';
import Front from './Components/Front/Front';
import { useEffect, useState } from 'react';
import { login, logout, authConfig } from './Components/Functions/auth';
import axios from 'axios';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* <Route path="/" element={<Front />} />
        <Route path="/admin" element={<Back show="admin" />} />
        <Route path="/admin/service" element={<Back show="service" />} />
        <Route path="/admin/master" element={<Back show="master" />} /> */}

        <Route path="/" element={<RequireAuth role="user"><Front /></RequireAuth>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/admin" element={<RequireAuth role="admin"><Back show="admin" /></RequireAuth>} />
        <Route path="/admin/service" element={<RequireAuth role="admin"><Back show="service" /></RequireAuth>} />
        <Route path="/admin/master" element={<RequireAuth role="admin"><Back show="master" /></RequireAuth>} />
      </Routes >

    </BrowserRouter >
  )
}

// RequireAuth: kiekviena karta, kai kreipsimes i admin, mums rodys: Please wait ir sius i zemiau esanti children ar i login
function RequireAuth({ children, role }) {
  const [view, setView] = useState(<h2>Please wait...</h2>);

  useEffect(() => {
    axios.get('http://localhost:3003/login-check?role=' + role, authConfig())
      .then(res => {
        if ('ok' === res.data.msg) {
          setView(children);
        } else {
          setView(<Navigate to="/login" replace />);
        }
      })

  }, [children, role]);

  return view;
}

function LoginPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const doLogin = () => {
    axios.post('http://localhost:3003/login', { user, pass })
      .then(res => {
        console.log(res.data);
        if ('ok' === res.data.msg) {
          login(res.data.key);
          navigate('/', { replace: true }); //naviguoja i admina
        }
      })
  }
  return (

    <form>
      <div className="container ">
        <div className="row">
          <div className="form-group col-4 mt-4">
            <div className="form-outline mb-4">
              <input type="text" className="form-control" value={user} onChange={e => setUser(e.target.value)} />
              <label className="form-label" for="form2Example1">User name</label>
            </div>
            <div className="form-outline mb-4">
              <input type="password" className="form-control" value={pass} onChange={e => setPass(e.target.value)} />
              <label className="form-label" for="form2Example2">Password</label>
            </div>
            <button type="button" className="btn btn-primary btn-block mb-4" onClick={doLogin}>Sign in</button>
          </div>
        </div >
      </div >
    </form >
  );
}

function LogoutPage() {
  useEffect(() => logout(), []);
  return (
    <Navigate to="/login" replace /> //naviguoja I "/login"
  )
}


export default App;