import ThreeDots from "../../../../images/ThreeDots";
import LinkShortnerModal from "./LinkShortnerModal";
import ToDoModal from "./ToDoModal";

export default function Dropdown({ color }) {
    return (
        <div className="dropdown" style={{ ...dropdownStyle, backgroundColor: color, }} >
            <ThreeDots />
            <ul className="dropdown-menu dropdown-menu-end">
                <li>
                    <button className="dropdown-item"
                        data-bs-toggle="modal" data-bs-target="#linkShortnerModal">LinkShortner
                    </button>
                </li>
                <li>
                    <button className="dropdown-item" onClick={()=>alert('needs to be implemted')}
                        >Open ToDo
                    </button>
                </li>
            </ul>
            <LinkShortnerModal />
            <ToDoModal />
        </div>
    )
}


const dropdownStyle = {
    cursor: 'pointer',
    borderRadius: "0 6px 6px 0",
    borderLeft:'solid 1px grey'
}