import Login from "./components/Auth/Login";
import RegisterPage from "./components/Auth/RegisterPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import { AuthProvider } from "./global/AuthContext";
import './components/style/fonts.css'
import TodoApp from "./Apps/Todo/TodoApp";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter basename="/myapp">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/todo" element={<TodoApp />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
