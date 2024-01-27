export function Header({ isPrivate, setIsPrivate }) {
    return (
        <div className="modal-header px-2">
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                    checked={isPrivate}
                    onChange={() => setIsPrivate(!isPrivate)} />
            </div>
            {isPrivate ?
                <div className='text-success px-2'>Now your file will be private <em>[make sure your repo is private too]</em></div>
                :
                <div className='text-primary px-2'>This file will be private except from owner. To make it completely private, toggle the switch.</div>
            }
        </div>
    );
}

