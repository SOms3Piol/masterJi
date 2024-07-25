
import { useEffect, useState } from "react"
import { batches } from "../assets/courses"
import { FaArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function Batches(){
    const [data , setData] = useState([]);
    const [start , setStart] = useState(0);
    const [end , setEnd ] = useState(3);

    useEffect(()=>{
        setData(batches)
    },[])

    const handleNext = () =>{
        if(end => data.length) return;
        setStart(end);
        setEnd(prev => prev + 2)
    }
    const handlePrev = () => {
        if(start == 0) return;
        setStart(prev => prev -2);
        setEnd(prev => prev - 2)
    }

    return(
        <div className=" py-9  w-full bg-[#E2BBE9] items-center flex flex-col  justify-center">
            <div className="text-5xl py-3">
                <h1>Chai aur Code</h1>
            </div>
            <div className="w-[1223px] bg-white flex flex-col gap-6 rounded-xl px-5 py-7 ">
                <div>
                    <h1 className="text-5xl text-[#313131] mb-1 ">Batches</h1>
                    <p className="text-[#4B4747] ">Create learner’s batch and share information at the same time.</p>
                </div>
                <div className="flex gap-2">
                    <input type="text" className="border px-1 outline-none h-[43px] rounded" placeholder="Search by title"/>
                    <button className="bg-[#6C6BAF] text-white h-[43px] w-[116px] rounded">Search</button>
                </div>
               <div>
                    <table className="table-auto rounded-lg text-left px-3 border-collapse">
                        <thead className="bg-[#F2F2F2]">
                            <th className="border px-3 py-3">Title</th>
                            <th className="border px-3 py-3">Start Date</th>
                            <th className="border px-3 py-3">End Date</th>
                            <th className="border px-3 py-3">Price</th>
                            <th className="border px-3 py-3">status</th>
                        </thead>
                        
                            {
                                data.slice(start , end).map((item)=>(
                                    <>
                                    <tbody>
                                        <td className="border flex gap-2 items-center px-3 py-3"><span><img src={item.img} className="w-[130px] rounded-lg h-[60px]" alt="" /></span><span>{item.title}</span></td>
                                        <td className="border px-3 py-3">{item.startDate}</td>
                                        <td className="border px-3 py-3">{item.enddate}</td>
                                        <td className="border px-3 py-3">{item.price}</td>
                                        <td className="border px-3 py-3"><span className="border px-2 rounded border-[#4ED04B] bg-[#DEFFDE]">{item.status}</span></td>
                                    </tbody>
                                    </>
                                ))
                            }
                    </table>
                   <div className="flex justify-end w-[62vw] py-5 ">
                        <span className="flex gap-3 items-center">Rows per table<input type="number" className="w-[50px] h-[30px] border-2"/></span>
                        <button onClick={handlePrev}><FaArrowLeft size={30} /></button>
                        <button onClick={handleNext}><FaArrowRight size={30} /></button>
                   </div>
               </div>
            </div>
        </div>
    )
}