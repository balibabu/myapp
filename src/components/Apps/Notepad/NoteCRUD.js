import { AddNote, DeleteNote, UpdateNote } from "../../../http/Note";

export const onCreate = async (newNote,token,setNotes) => {
    const note = await AddNote(token, newNote);
    if (note) {
        setNotes((oldNotes) => [note, ...oldNotes]);
    } else {
        alert('something went wrong');
    }
}

export const onDelete = async (id,token,setNotes) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) { return false; }

    const isSuccess = await DeleteNote(token, id);
    if (isSuccess) {
        setNotes((oldList) => oldList.filter((note) => note.id !== id));
    } else {
        alert('Something went wrong while deleting');
    }
};

export const onUpdate = async (newNote,token,setNotes) => {
    const updatedItem = await UpdateNote(token, newNote);
    if (updatedItem) {
        setNotes((oldList) =>
            oldList.map((note) => (note.id === newNote.id ? updatedItem : note))
        );
    } else {
        alert('Something went wrong while updating');
    }
};