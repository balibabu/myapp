import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './style/fonts.css'
import { AuthProvider } from './global/AuthContext';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import RegisterPage from './components/Auth/RegisterPage';
import TodoApp from './components/Apps/Todo/TodoApp';
import NotepadApp from './components/Apps/Notepad/NotepadApp';
import { VariableProvider } from './global/VariableContext';

function App() {
    return (
        <AuthProvider>
            <VariableProvider>
                <BrowserRouter basename="/myapp">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/todo" element={<TodoApp />} />
                        <Route path='/notepad' element={<NotepadApp />} />
                    </Routes>
                </BrowserRouter>
            </VariableProvider>
        </AuthProvider>
    );
}

export default App;
