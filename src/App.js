import { HashRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './global/AuthContext';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import RegisterPage from './components/Auth/RegisterPage';
import TodoApp from './components/Apps/Todo/TodoApp';
import NotepadApp from './components/Apps/Notepad/NotepadApp';
import { VariableProvider } from './global/VariableContext';
import NoteEditor from './components/Apps/Notepad/NoteEditor';
import SimonApp from './components/Apps/Games/Simon/SimonApp';
import ExpenseApp from './components/Apps/Expense/ExpenseApp';
import ChatApp from './components/Apps/Chat/ChatApp';
import LinkShortApp from './components/Apps/LinkShortner/LinkShortApp';
import RedirectPage from './components/Apps/LinkShortner/RedirectPage';
import LunarCalendarApp from './components/Apps/Lunar/LunarCalendarApp';
import StorageApp from './components/Apps/Storage/StorageApp';

function App() {
    return (
        <AuthProvider>
            <VariableProvider>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/todo" element={<TodoApp />} />
                        <Route path='/notepad' element={<NotepadApp />} />
                        <Route path="/notepad/edit/:noteId" element={<NoteEditor />} />
                        <Route path='/expense' element={<ExpenseApp />} />
                        <Route path='/chat' element={<ChatApp />} />
                        <Route path='/simon-game' element={<SimonApp />} />
                        <Route path='/link-short' element={<LinkShortApp />} />
                        <Route path="/a/:linkId" element={<RedirectPage />} />
                        <Route path='/lunar' element={<LunarCalendarApp />} />
                        <Route path='/storage' element={<StorageApp />} />
                    </Routes>
                </HashRouter>
            </VariableProvider>
        </AuthProvider>
    );
}

export default App;
