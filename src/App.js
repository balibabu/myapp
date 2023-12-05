import Login from "./components/Auth/Login";
import RegisterPage from "./components/Auth/RegisterPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import { AuthProvider } from "./global/AuthContext";
import './components/style/fonts.css'

function App() {
    return (
        <AuthProvider>
            <BrowserRouter basename="/myapp">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
