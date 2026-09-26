import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./telas/Home";
import Login from "./telas/Login";
import Cadastro from "./telas/Cadastro";
import Principal from "./telas/Principal";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Cadastro />} />
                <Route path="/principal" element={<Principal />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;