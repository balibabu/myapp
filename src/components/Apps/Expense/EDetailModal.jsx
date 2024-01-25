export function EDetailModal({ selected }) {
    return (
        <div className="modal fade text-secondary" id="expenseDetail" tabIndex="-1" aria-labelledby="expenseDetail" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header py-2">
                        <div className="modal-title fs-5" id="staticBackdropLabel">Expense Detail</div>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body py-1">
                        <div>Title: {selected.title}</div>
                        <div>Price: {selected.amount}</div>
                        {selected.note.length > 0 && <div>Note: {selected.note}</div>}
                        <div>Date: {selected.date}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
