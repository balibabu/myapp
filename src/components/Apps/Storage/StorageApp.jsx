import { Route, Routes } from "react-router-dom";
import FilesNFolders from "./FilesNFolders";
import OpenFile from "./OpenFile/OpenFile";
import SharedFiles from "./sharedFiles/SharedFiles";
import ShareAccess from "./File/Access/ShareAccess";
import DetailPage from "./File/DetailPage";
import AccessRenderer from "./File/Access/AccessRenderer";
import PublicUrlPage from "./File/Access/PublicUrlPage";

export default function StorageApp() {

    return (
        <Routes>
            <Route path='/:selected' element={<FilesNFolders />} />
            <Route path='/open/:id' element={<OpenFile />} />
            <Route path='/shared' element={<SharedFiles />} />
            <Route path='/share/:id' element={<ShareAccess />} />
            <Route path='/detail/:id' element={<DetailPage />} />
            <Route path='/access/:id' element={<AccessRenderer />} />
            <Route path='/public/:key' element={<PublicUrlPage />} />
        </Routes>
    )
}
