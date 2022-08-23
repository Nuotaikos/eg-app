import './bootstrap.css';
import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Back from './Components/Back/Back';
import Front from './Components/Front/Front';


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/admin" element={<Back show="admin" />} />
        <Route path="/admin/service" element={<Back show="service" />} />
        <Route path="/admin/master" element={<Back show="master" />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App;
