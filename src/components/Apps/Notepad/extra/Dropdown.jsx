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

function ThreeDots() {
    return (
        <svg
            width="25"
            height="auto"
            viewBox="0 0 20 20"
            // xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            className='dropdown-toggle rounded-5' data-bs-toggle="dropdown"
        >
            <circle cx="10" cy="0" r="2" />
            <circle cx="10" cy="10" r="2" />
            <circle cx="10" cy="20" r="2" />
        </svg>
    );
}