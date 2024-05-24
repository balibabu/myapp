import React, { useCallback, useContext, useMemo, useState } from 'react';
import JoditEditor from 'jodit-react';
import ThemeToggler from './ThemeToggler';
import { useNavigate } from 'react-router-dom';
import BlogContext from '../../../../Contexts/BlogContext';

export default function Editor() {
    const { content, setContent } = useContext(BlogContext);
    const [theme, setTheme] = useState(localStorage.getItem('editor-theme') || 'light');
    const navigate = useNavigate();

    const config = useMemo(() => ({ readonly: false, height: '95dvh', theme }), [theme]);

    const onBlur = useCallback((newContent) => {
        setContent(newContent);
    },
        [setContent]
    );


    return (
        <div style={{ all: 'initial' }}>
            <div style={{ backgroundColor: theme === 'light' ? 'white' : 'grey' }} className='p-1 d-flex justify-content-between'>
                <button className='btn btn-success btn-sm' onClick={() => navigate(-1)}>save</button>
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
