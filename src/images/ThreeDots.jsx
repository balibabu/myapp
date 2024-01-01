export default function ThreeDots() {
    return (
        <svg
            width="25"
            height="3rem"
            viewBox="0 0 20 20"
            // xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            className='dropdown-toggle rounded-5' data-bs-toggle="dropdown"
        >
            <circle cx="10" cy="2" r="2" />
            <circle cx="10" cy="10" r="2" />
            <circle cx="10" cy="18" r="2" />
        </svg>
    );
}