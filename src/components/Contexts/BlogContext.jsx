import { createContext, useState } from "react";

const BlogContext = createContext();
export default BlogContext;

export function BlogContextProvider({ children }) {
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);

    function saveFileHandler(filename) {
        setFiles((prev) => [...prev, { filename, content }]);
        setContent('');
    }

    const contextData = {
        content, setContent,
        files, setFiles,
        saveFileHandler
    }
    return (
        <BlogContext.Provider value={contextData}>
            {children}
        </BlogContext.Provider>
    );
}