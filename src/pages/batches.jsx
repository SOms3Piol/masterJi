
import { useEffect, useState } from "react"
import { batches } from "../assets/courses"
import { FaArrowLeft, FaArrowRight,} from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GoArrowUp } from "react-icons/go";

export default function Batches(){
    const [data , setData] = useState([]);
    const [start , setStart] = useState(0);
    const [end , setEnd ] = useState(3);
    const [ended , setIsEnded] = useState(false);
    const [values , setValue] = useState(3)

    useEffect(()=>{
        console.log((3) + (-1))
        setData(batches)
    },[])

    const handleNext = () => {
        if (ended) return;
    
        const newEnd = end + values;
        
        if (newEnd >= data.length) {
            setIsEnded(true);
            setStart(end);
            setEnd(data.length); // Adjust to show all remaining items
            setValue(data.length - start); // Adjust the value to show remaining items
        } else {
            setStart(end);
            setEnd(newEnd);
            setValue(values); // Maintain the default number of items per chunk
        }
    };
    
    const handlePrev = () => {
        if (start === 0) return; // No previous data to show

        const newStart = start - values;
        const newEnd = start;

        setStart(newStart < 0 ? 0 : newStart);
        setEnd(newStart < 0 ? values : newEnd);

        setIsEnded(false); // Reset ended status
    };
    const handleValueChange = (e) => {
        const newValue = Math.max(Number(e.target.value) || 0, 1); // Ensure the value is a positive integer
        setValue(newValue);

        // Adjust the end index to respect the new number of rows per page
        setEnd((prevEnd) => {
            const newEnd = start + newValue;
            return newEnd > data.length ? data.length : newEnd;
        });
    };

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
                                    <tbody key={start}>
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
                        <span className="flex   text-[#4B4747] items-center">Rows per Page</span>
                        <div className="flex ml-3 mr-3  border">
                            <input
                            value={values}
                            onChange={handleValueChange}
                            type="number" className="text-center w-[40px] h-[40px] "/>
                            <div className="flex flex-col justify-center flex-rev">
                            <button
                                onClick={() => {
                                    setValue((val) => Math.max(val - 1, 1)); // Decrease value but ensure it’s at least 1
                                    setEnd((prevEnd) => Math.max(start + Math.max(values - 1, 1), prevEnd));
                                }}
                            >
                                <IoIosArrowUp />
                            </button>
                            <button
                                onClick={() => {
                                    setValue((val) => val + 1);
                                    setEnd((prevEnd) => Math.min(start + (val + 1), data.length));
                                }}
                            >
                                <IoIosArrowDown />
                            </button>
                            
                            </div>
                        </div>
                         
                        <button onClick={handlePrev}><FaArrowLeft size={30} /></button>
                        <button onClick={handleNext}><FaArrowRight size={30} /></button>
                   </div>
               </div>
            </div>
        </div>
    )
}