import Autofill from "./Autofill";

export function PrivateDetailForm({ privateDetails,setPrivateDetails, handlerPrivateDetails }) {
    return (
        <div className='text-black'>
            <div className="input-group mt-3">
                <span className="input-group-text">Github Username</span>
                <input type="text" className="form-control" placeholder="repo owner" aria-label="Username" aria-describedby="basic-addon1"
                    value={privateDetails.repo_owner}
                    onChange={handlerPrivateDetails}
                    name='repo_owner'
                />
            </div>
            <div className="input-group mt-3">
                <span className="input-group-text">Repo name</span>
                <input type="text" className="form-control" placeholder="eg. media, photos" aria-label="Username" aria-describedby="basic-addon1"
                    value={privateDetails.repo_name}
                    onChange={handlerPrivateDetails}
                    name='repo_name'
                />
            </div>
            <div className="input-group mt-3">
                <input type="text" className="form-control" placeholder="Personal access Token" aria-label="Username" aria-describedby="basic-addon1"
                    value={privateDetails.token}
                    onChange={handlerPrivateDetails}
                    name='token'
                    autoComplete="off"
                />
            </div>
            <Autofill setPrivateDetails={setPrivateDetails} />
        </div>
    );
}