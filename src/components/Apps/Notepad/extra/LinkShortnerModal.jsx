import InputAndCopy from "../../LinkShortner/InputAndCopy";

export default function LinkShortnerModal() {
    return (
        <div className="modal fade" id="linkShortnerModal" tabIndex="-1" aria-labelledby="linkShortnerModal" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body pb-0">
                        <InputAndCopy isInModal="modal"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
