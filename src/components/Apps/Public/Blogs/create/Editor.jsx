import React, { useCallback, useContext, useMemo, useState } from 'react';
import JoditEditor from 'jodit-react';
import ThemeToggler from './ThemeToggler';
import { useNavigate } from 'react-router-dom';
import BlogContext from '../../../../Contexts/BlogContext';

export default function Editor() {
    const { content, setContent, saveFileHandler } = useContext(BlogContext);
    const [theme, setTheme] = useState(localStorage.getItem('editor-theme') || 'light');
    const navigate = useNavigate();

    const config = useMemo(() => ({ readonly: false, height: '95dvh', theme }), [theme]);

    const onBlur = useCallback((newContent) => {
        setContent(newContent);
    },
        [setContent]
    );

    function saveHandler() {
        saveFileHandler('index.html');
        navigate(-1);
    }

    return (
        <div style={{ all: 'initial' }}>
            <div style={{ height: '5dvh', backgroundColor: theme === 'light' ? 'white' : 'grey' }} className='p-1 d-flex justify-content-between'>
                <div>
                    <button onClick={saveHandler}>save</button>
                    <button onClick={()=>navigate(-1)}>cancel</button>
                    <button>upload</button>
                </div>
                <ThemeToggler {...{ theme, setTheme }} />
            </div>
            <JoditEditor
                value={content}
                config={config}
                tabIndex={1}
                onBlur={onBlur}
                onChange={() => { }}
            />
        </div>
    );
}
