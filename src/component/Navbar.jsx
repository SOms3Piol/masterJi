import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div className=" w-[50vw]  right-0  mx-auto flex  justify-end gap-3 py-3 px-3 capitalize font-medium bg-transparent absolute ">
            <Link to={'/otp-form'}>otp-form</Link>
            <Link to={'/course-list'}>course-list</Link>
            <Link to={'/batches'}>batches</Link>
        </div>
    )
}
export default Navbar