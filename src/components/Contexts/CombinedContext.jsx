import React, { createContext } from 'react'
import { VariableProvider } from './VariableContext';
import { StorageContextProvider } from './StorageContext';
import { NoteContextProvider } from './NoteContext';
import { TodoContextProvider } from './TodoContext';
import { ExpenseContextProvider } from './ExpenseContext';
import { ChatContextProvider } from './ChatContext';
import { PhotoContextProvider } from './PhotoContext';

const CombinedContext = createContext();
export default CombinedContext;
export function CombinedContextProvider({ children }) {
    return (
        <VariableProvider>
            <StorageContextProvider>
                <NoteContextProvider>
                    <TodoContextProvider>
                        <ExpenseContextProvider>
                            <ChatContextProvider>
                                <PhotoContextProvider>
                                    <CombinedContext.Provider value={{}}>
                                        {children}
                                    </CombinedContext.Provider>
                                </PhotoContextProvider>
                            </ChatContextProvider>
                        </ExpenseContextProvider>
                    </TodoContextProvider>
                </NoteContextProvider>
            </StorageContextProvider>
        </VariableProvider>
    )
}
