import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div className=" relative bg-sky-800 w-[50vw]  right-0  mx-auto flex  justify-end gap-3 py-3 px-3 capitalize font-medium  w-full text-white ">
            <Link to={'/otp-form'}>otp-form</Link>
            <Link to={'/course-list'}>course-list</Link>
            <Link to={'/batches'}>batches</Link>
        </div>
    )
}
export default Navbar