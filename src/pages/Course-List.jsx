import { useEffect, useState } from "react";
import { data } from "../assets/courses"
import Draggable from 'react-draggable'
import { MdOutlineGridView } from "react-icons/md";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";

export default function CourseList(){
    const [items , setItems] = useState([]);
    const [shown , setShowm] = useState(null)

    useEffect(()=>{
        setItems(data);
    },[])
    const handleClick = (id) =>{
        setItems(prev=>{
            return prev.filter(el => el.id != id )
        })
    }
    const handleUp = (index) => {
        setItems(prev => {
            if(index == 0) return [...prev];
            const temp = prev[index - 1];
            prev[index - 1] = prev[index];
            prev[index] = temp;
            return [...prev];
        })
    }
    const handleDown = (index) => {
        setItems(prev => {
            if(index == items.length - 1) return [...prev];
            const temp = prev[index + 1];
            prev[index + 1] = prev[index];
            prev[index] = temp;
            return [...prev];
        })
    }
   const handleClick2 = (itemId) =>{
        shown == itemId ? setShowm(null) : setShowm(itemId);
   }

    return(
            <div className="h-screen  w-full flex flex-col bg-[#D2E3C8] py-3  justify-center items-center">
                <h1 className="text-5xl text-[#4F6F52] font-bold py-4">Chai aur Code</h1>
                <div className="bg-white flex gap-9 flex-col px-5 items-left rounded-xl  w-[1223px] overflow-y-scroll h-[585px] py-4">
                    <div className="flex flex-col gap-5 w-[1025px] mt-8">
                        <h1 className="text-5xl text-left font-semibold">Manage Bundle</h1>
                        <p className="text-[#4B4747]">Change orders of the products based on priority</p>
                    </div>
                {
                items.map((item , index) =>{
                    return <Draggable 
                            defaultPosition={{x:0 , y:0}}
                            position={{x:0 , y:0}}
                        >
                        <div key={item} className={`   py-1  items-center shadow  justify-between w-[1025px] h-[93px] px-3 rounded-xl bg-white flex`}>
                            <div className="flex gap-3 items-center">
                            <MdOutlineGridView size={30}/>
                                <img className="w-[133px] rounded-lg h-[75px]" src={item.img} alt="" />
                                <p>{item.title}</p>
                            </div>
                            <div className="flex gap-5">
                                <p>{item.price}</p>
                                <p className="bg-green-100 border border-green-500  px-1 flex  items-center text-[14px] rounded">{item.category}</p>
                               <div className="relative">
                                <button
                                    onClick={()=>handleClick2(item.id)}
                                    ><img className="w-[25px] h-[25px]" src="https://cdn-icons-png.flaticon.com/512/15061/15061184.png" alt="" /></button>
                                    {
                                        (shown ==item.id) && (
                                            <div className="absolute top-0 left-[30px] z-999 bg-white shadow z- whitespace-nowrap flex flex-col gap-3 w-[150px] text-xs items-left py-3 rounded-lg">
                                                <button className="text-left flex items-center gap-3 px-3"
                                                    onClick={()=>handleUp(index )}
                                                > <FaArrowUp />Move to top</button>
                                                <button className="text-left flex items-center gap-3 px-3"
                                                onClick={()=>handleDown(index)}
                                                > <FaArrowDown/>Move to bottom</button>
                                                <button className="text-red-800 flex items-center gap-3 px-3 text-left" onClick={()=>handleClick(item.id)}> <GoTrash color="red"/>Remove Item</button>
                                            </div>
                                        )
                                    }
                               </div>
                            </div>
                        </div>
                       
                    </Draggable>
                }) }
                </div>
            </div>
    )

}