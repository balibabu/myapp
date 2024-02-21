import { createContext, useContext, useState } from "react";
import { GetNoteList } from "../../http/Note";
import AuthContext from "./AuthContext";

const NoteContext = createContext();
export default NoteContext;

export function NoteContextProvider({ children }) {
    const [notes, setNotes] = useState();
	const { token } = useContext(AuthContext);
    const [loadingNoteItem, SetloadingNoteItem] = useState(null);

    const fetchNotes = async () => {
        const list = await GetNoteList(token);
        setNotes(list);
        return list;
    }
    const contextData = {
        notes,
        setNotes,
        fetchNotes,
        loadingNoteItem, SetloadingNoteItem
    }
    return (
        <NoteContext.Provider value={contextData}>
            {children}
        </NoteContext.Provider>
    );
}