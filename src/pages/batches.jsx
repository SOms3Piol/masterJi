import { useEffect, useState } from "react";
import { batches } from "../assets/courses";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

export default function Batches() {
    const [data, setData] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(3);
    const [isEnded, setIsEnded] = useState(false);
    const [values, setValue] = useState(3);
    const [isFound, setIsFound] = useState(true);

    useEffect(() => {
        setData(batches);
        setIsFound(true);
    }, []);

    const handleNext = () => {
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
            setIsEnded(false); // Reset ended status
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
        setValue(newValue > data.length ? data.length : newValue);
        
        // Adjust the end index to respect the new number of rows per page
        setEnd((prevEnd) => {
            const newEnd = start + newValue;
            return newEnd > data.length ? data.length : newEnd;
        });
    };

    const handleSearch = (e) => {
        const query = e.target.value;

        // Filter the data based on the query
        const filteredArray = batches.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

        // Update state based on whether any items matched the query
        if (filteredArray.length > 0) {
            setData(filteredArray);
            setStart(0);
            setEnd(Math.min(filteredArray.length, values)); // Adjust end to not exceed filtered length
            setValue(Math.min(values, filteredArray.length)); // Adjust value to not exceed filtered length
            setIsFound(true);
        } else {
            setData(batches);
            setStart(0);
            setEnd(3); // Reset end to default value
            setValue(3); // Reset value to default
            setIsFound(false);
        }
    };

    return (
        <div className="py-9 w-full bg-[#E2BBE9] items-center flex flex-col gap-4 justify-center">
            <div className="text-5xl text-[#444B79] py-3">
                <h1>Chai aur Code</h1>
            </div>
            <div className="w-[90vw] bg-white flex flex-col gap-6 rounded-xl px-5 py-7">
                <div>
                    <h1 className="text-5xl text-[#313131] mb-1 max-sm:text-xl">Batches</h1>
                    <p className="text-[#4B4747] max-sm:text-xs">Create learner’s batch and share information at the same time.</p>
                </div>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        onChange={handleSearch} 
                        className="border px-1 outline-none h-[43px] rounded" 
                        placeholder="Search by title" 
                    />
                    <button className="bg-[#6C6BAF] text-white h-[43px] w-[116px] rounded">Search</button>
                </div>
                <div>
                    {isFound ? (
                        <>
                            <table className="table-auto rounded-lg max-sm:text-xs text-left px-3 border-collapse">
                                <thead className="bg-[#F2F2F2] w-full">
                                    <tr>
                                        <th className="border sm:px-3 sm:py-3">Title</th>
                                        <th className="border sm:px-3 sm:py-3">Start Date</th>
                                        <th className="border sm:px-3 sm:py-3">End Date</th>
                                        <th className="border sm:px-3 sm:py-3">Price</th>
                                        <th className="border sm:px-3 sm:py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.slice(start, end).map((item, index) => (
                                        <tr key={index}>
                                            <td className="border flex gap-2 items-center sm:px-3 sm:py-3 max-md:flex-col justify-center">
                                                <span><img src={item.img} className="w-[130px] rounded-lg h-[60px]" alt="" /></span>
                                                <span>{item.title}</span>
                                            </td>
                                            <td className="border sm:px-3 sm:py-3">{item.startDate}</td>
                                            <td className="border sm:px-3 sm:py-3">{item.endDate}</td>
                                            <td className="border sm:px-3 sm:py-3">{item.price}</td>
                                            <td className="border sm:px-3 sm:py-3">
                                                <span className="border px-2 rounded border-[#4ED04B] bg-[#DEFFDE]">{item.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-end w-[62vw] gap-3 py-5">
                                <span className="flex text-[#4B4747] items-center">Rows per Page</span>
                                <div className="flex ml-3 mr-3 border">
                                    <input
                                        value={values}
                                        onChange={handleValueChange}
                                        type="number" 
                                        className="text-center w-[40px] h-[40px]" 
                                    />
                                </div>
                                <button disabled={start === 0} onClick={handlePrev}>
                                    <GoChevronLeft size={30} color={start === 0 ? "grey" : "black"} />
                                </button>
                                <button disabled={end === data.length} onClick={handleNext}>
                                    <GoChevronRight size={30} color={end === data.length ? "grey" : "black"} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <p>Record not found! <button onClick={() => setData(batches)}>Reset State</button></p>
                    )}
                </div>
            </div>
        </div>
    );
}
