import Autofill from "./Autofill";

export function PrivateDetailForm({ privateDetails, setPrivateDetails, handlerPrivateDetails }) {
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
            <div className="input-group mt-3 position-relative">
                <input type="text" className="form-control" placeholder="Personal access Token" aria-label="Username" aria-describedby="basic-addon1"
                    value={privateDetails.token}
                    onChange={handlerPrivateDetails}
                    name='token'
                    autoComplete="off"
                />
                <a target="_blank"
                    className="position-absolute top-50 start-100 translate-middle px-2"
                    style={infoStyle}
                    href="balibabu.github.io/myapp#/a/g"> i </a>
            </div>
            <Autofill setPrivateDetails={setPrivateDetails} />
        </div>
    );
}

const infoStyle = {
    cursor: "pointer",
    textDecoration: 'none',
    backgroundColor:'rgb(199, 199, 199)',
    borderRadius:'100%',
    border:'solid black 1px'

}
// mb-1 px-2 me-2