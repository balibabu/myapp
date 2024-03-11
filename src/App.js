import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import RegisterPage from './components/Auth/RegisterPage';
import TodoApp from './components/Apps/Todo/TodoApp';
import NotepadApp from './components/Apps/Notepad/NotepadApp';
import NoteEditor from './components/Apps/Notepad/NoteEditor';
import ExpenseApp from './components/Apps/Expense/ExpenseApp';
import ChatApp from './components/Apps/Chat/ChatApp';
import LinkShortApp from './components/Apps/Public/LinkShortner/LinkShortApp';
import RedirectPage from './components/Apps/Public/LinkShortner/RedirectPage';
import StorageApp from './components/Apps/Storage/StorageApp';
import SimonApp from './components/Apps/Public/Games/Simon/SimonApp';
import LunarCalendarApp from './components/Apps/Public/Lunar/LunarCalendarApp';
import { AuthProvider } from './components/Contexts/AuthContext';
import { CombinedContextProvider } from './components/Contexts/CombinedContext';
import Fileshare from './components/Apps/Public/Fileshare/Fileshare';
import Photo from './components/Apps/Photo/Photo';
import Toast from './components/Shared/Toast';
import ResearchAndDevelopment from './R&D/ResearchAndDevelopment';
import OpenFile from './components/Apps/Storage/OpenFile/OpenFile';

function App() {
    return (
        <AuthProvider>
            <CombinedContextProvider>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/todo" element={<TodoApp />} />
                        <Route path='/notepad' element={<NotepadApp />} />
                        <Route path="/notepad/edit/:noteId" element={<NoteEditor />} />
                        <Route path='/expense' element={<ExpenseApp />} />
                        <Route path='/chat/*' element={<ChatApp />} />
                        <Route path='/simon-game' element={<SimonApp />} />
                        <Route path='/link-short' element={<LinkShortApp />} />
                        <Route path="/a/:linkId" element={<RedirectPage />} />
                        <Route path='/lunar' element={<LunarCalendarApp />} />
                        <Route path='/storage/:selected' element={<StorageApp />} />
                        <Route path='/storage/open/:id' element={<OpenFile />} />
                        <Route path='/photo/*' element={<Photo />} />
                        <Route path='/share' element={<Fileshare />} />
                        <Route path='/testing' element={<ResearchAndDevelopment />} />
                    </Routes>
                </HashRouter>
                <Toast />
            </CombinedContextProvider>
        </AuthProvider>
    );
}

export default App;
