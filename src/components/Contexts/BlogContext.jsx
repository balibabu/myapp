import { createContext, useContext, useEffect, useState } from "react";
import { createBlog, deleteBlog, getBlogs, readBlog, updateBlog } from "../../http/Blog";
import AuthContext from "./AuthContext";
import VariableContext from "./VariableContext";
import { Confirm } from "../../utility/utilities";

const BlogContext = createContext();
export default BlogContext;

export function BlogContextProvider({ children }) {
    const [reponame, setReponame] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const { token, username } = useContext(AuthContext);
    const { notify } = useContext(VariableContext);
    const [, setInitialFetch] = useState(false);

    useEffect(() => {
        setInitialFetch((prev) => {
            if (!prev) {
                fetchBlogs();
            }
            return true;
        })
    }, []);

    function resetValues() {
        setReponame('');
        setDescription('');
        setContent('');
    }

    async function fetchBlogs() {
        const blogs = await getBlogs();
        setBlogs(blogs);
    }

    async function deployBlog() {
        notify('Deploying Your Blog', 'Please wait while your blog is being deployed', 'success');
        const blog = await createBlog(token, { reponame, description, index: content });
        notify('Your website has been Deployed', 'Your website might not work instantly, please wait for 5 minutes.', 'info')
        // setBlogs((prev) => [...prev, blog]);
        resetValues();
        fetchBlogs();
    }



    async function deleteHandler(id) {
        if (Confirm('are you sure?')) {
            notify('Deleting your blog', 'please wait', 'success');
            await deleteBlog(token, id);
            fetchBlogs();
        }
    }

    async function fetchOldValues(id) {
        const blog = blogs.find((blog) => blog.id === Number(id));
        setReponame(blog.repo)
        setDescription(blog.description)
        const blogContent = await readBlog(token, id);
        console.log(blogContent);
        setContent(blogContent);
    }

    async function updateContent(id) {
        notify('Updating Your Blog', 'Please wait while your blog is being updated', 'success');
        await updateBlog(token, id, { index: content, description });
        notify('Your website has been Updated', 'reflection might take time, so please wait for 5 minutes.', 'info')
        resetValues();
        fetchBlogs();
    }

    function saveFileHandler(filename) {
        setFiles((prev) => [...prev, { filename, content }]);
        setContent('');
    }

    const contextData = {
        blogs, username,
        content, setContent,
        files, setFiles,
        saveFileHandler,
        reponame, setReponame,
        description, setDescription, deployBlog, deleteHandler, fetchOldValues,
        updateContent, resetValues
    }
    return (
        <BlogContext.Provider value={contextData}>
            {children}
        </BlogContext.Provider>
    );
}