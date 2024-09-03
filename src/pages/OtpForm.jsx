import { useEffect, useState } from "react"
import { batches } from "../assets/courses"
import { GoChevronLeft , GoChevronRight } from "react-icons/go";


export default function Batches(){
    const [data , setData] = useState([]);
    const [start , setStart] = useState(0);
    const [end , setEnd ] = useState(3);
    const [ended , setIsEnded] = useState(false);
    const [values , setValue] = useState(3);
    const [isFound , setIsFound] = useState(true);

    useEffect(()=>{
        setData(batches)
        setIsFound(true);
    },[])



    const handleNext = () => {
        // if (ended) return;
    
        const newEnd = end + values;
        
        if (newEnd >= data.length) {
            setIsEnded(true);
            setStart(end);
            setEnd(data.length); // Adjust to show all remaining items
            setValue(end - start); // Adjust the value to show remaining items
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
        setValue( newValue > data.length ? data.length : newValue)
        // Adjust the end index to respect the new number of rows per page
        setEnd((prevEnd) => {
            const newEnd = start + newValue;
            return newEnd > data.length ? data.length : newEnd;
        });
        console.log(end , values)
    };

    const handleSearch = (e) => {
        // Get the search query from the event
        const query = e.target.value;
    
        // Filter the data based on the query
        const filteredArray = data.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
    
        // Update state based on whether any items matched the query
        if (filteredArray.length > 0) {
            setData(filteredArray);
            setStart(0);
            setEnd(filteredArray.length)
            setIsFound(true);
        } else {
            setData(batches);
            setIsFound(false);
        }
    }
    

    return(
        <div className=" py-9  w-full bg-[#E2BBE9] items-center flex flex-col gap-4 justify-center">
            <div className="text-5xl text-[#444B79] py-3">
                <h1>Chai aur Code</h1>
            </div>
            <div className="w-[90vw] bg-white flex flex-col gap-6 rounded-xl px-5 py-7 ">
                <div>
                    <h1 className="text-5xl text-[#313131] mb-1  max-sm:text-xl">Batches</h1>
                    <p className="text-[#4B4747] max-sm:text-xs ">Create learner’s batch and share information at the same time.</p>
                </div>
                <div className="flex gap-2">
                    <input type="text" onChange={(e)=>handleSearch(e)} className="border px-1 outline-none h-[43px] rounded" placeholder="Search by title"/>
                    <button className="bg-[#6C6BAF] text-white h-[43px] w-[116px] rounded">Search</button>
                </div>
               <div>
                    <table className="table-auto rounded-lg max-sm:text-xs text-left px-3 border-collapse      ">
                        <thead className="bg-[#F2F2F2] w-full">
                            <th className="border sm:px-3 sm:py-3">Title</th>
                            <th className="border sm:px-3 sm:py-3">Start Date</th>
                            <th className="border sm:px-3 sm:py-3">End Date</th>
                            <th className="border sm:px-3 sm:py-3">Price</th>
                            <th className="border sm:px-3 sm:py-3">status</th>
                        </thead>
                        
                            {
                              isFound &&  data.slice(start , end).map((item)=>(
                                    <>
                                    <tbody key={start}>
                                        <td className="border flex gap-2 items-center sm:px-3 sm:py-3 max-md:flex-col justify-center"><span><img src={item.img} className="w-[130px] rounded-lg h-[60px]" alt="" /></span><span>{item.title}</span></td>
                                        <td className="border sm:px-3 sm:py-3">{item.startDate}</td>
                                        <td className="border sm:px-3 sm:py-3">{item.enddate}</td>
                                        <td className="border sm:px-3 sm:py-3">{item.price}</td>
                                        <td className="border sm:px-3 sm:py-3"><span className="border px-2 rounded border-[#4ED04B] bg-[#DEFFDE]">{item.status}</span></td>
                                    </tbody>
                                    </>
                                ))
                            }
                    </table>
                   <div className="flex justify-end w-[62vw] gap-3 py-5 ">
                        <span className="flex   text-[#4B4747] items-center">Rows per Page</span>
                        <div className="flex ml-3 mr-3  border">
                            <input
                            value={values}
                            onChange={handleValueChange}
                            type="number" className="text-center w-[40px] h-[40px] "/>
                        </div>
                         
                        <button disabled={start == 0 ? true : false} onClick={handlePrev}>{start == 0 ? <GoChevronLeft size={30} color="grey" />:<GoChevronLeft size={30} />}</button>
                        <button disabled={end == data.length ? true : false} onClick={handleNext}>{end == data.length ? <GoChevronRight size={30} color="grey" />:<GoChevronRight size={30} />}</button>
                   </div>
               </div>
            </div>
        </div>
    )
}
