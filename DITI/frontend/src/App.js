import logo from './logo.svg';
import './App.css';
import { Landing } from "./pages/Landing"
import { IssueCert } from "./pages/IssueCert"
import { CheckCert } from './pages/CheckCert';
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/issue" element={<IssueCert />} />
        <Route path="/check" element={<CheckCert />} />
      </Routes>
    </div>
  );
}

export default App;
