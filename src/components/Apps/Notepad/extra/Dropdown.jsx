import ThreeDots from "../../../../images/ThreeDots";
import LinkShortnerModal from "./LinkShortnerModal";
import ToDoModal from "./ToDoModal";

export default function Dropdown() {
    return (
        <div className="dropdown" style={{ backgroundColor: "#a5d3fb",borderRadius:"0 6px 6px 0"}} >
            <ThreeDots />
            <ul className="dropdown-menu dropdown-menu-end">
                <li>
                    <button className="dropdown-item"
                        data-bs-toggle="modal" data-bs-target="#linkShortnerModal">LinkShortner
                    </button>
                </li>
                <li>
                    <button className="dropdown-item"
                        data-bs-toggle="modal" data-bs-target="#ToDoModal">Open ToDo
                    </button>
                </li>
            </ul>
            <LinkShortnerModal />
            <ToDoModal />
        </div>
    )
}
