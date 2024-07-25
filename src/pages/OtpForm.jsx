import { useEffect, useRef, useState } from "react"

const OtpForm = () => {
    const [otp , setOtp] = useState(new Array(4).fill(""));
    const [bgColor , setBgColor] = useState('bg-slate-800')
    const inputRefs = useRef([]);

    useEffect(()=>{
        const actualSize = otp.filter(el => el !== "").length;
        if(otp.join("") == "1234" ){
            setBgColor('bg-green-800') 
        }else if(otp.join("") != "1234" && actualSize == 4){
            setBgColor('bg-red-800')
        }
    },[otp])


    const handleChange = (index, e) => {
        let newArr = [...otp];
        newArr[index] = e.target.value;
        setOtp(newArr);
        setBgColor('bg-slate-800')
        if(e.target.value && index < 3){
            return inputRefs.current[index + 1].focus()
        }
    };
    

    
    const handleKey = (index, e) => {

        if(e.key === "Backspace" && !e.target.value && index > 0){
            inputRefs.current[index - 1].focus()
            setBgColor('bg-slate-800')
          }
    };
    

    return(
        <div className="bg-sky-800 flex gap-9 flex-col justify-center items-center h-screen w-full">
            <h1 className="text-white text-5xl font-bold">Chai aur Code</h1>
            <div className="w-[40vw] flex flex-col items-center text-center rounded-3xl py-5 gap-3 bg-white h-[55vh]">
                <h1 className="font-semibold text-2xl">Mobile Phone Verification</h1>
                <p className="text-slate-400 font-medium">Enter the 4-digit verification code that was sent to <br /> your phone number</p>
                 <div className="flex gap-5  items-center">
                 {
                    otp && otp.map((obj,index)=>(
                        <input 
                        key={index}
                        ref={(input)=>inputRefs.current[index] = input}
                        type="text"
                        value={obj}
                        className="border text-center text-xl outline-none rounded-lg bg-slate-300 w-[53px] h-[53px] "
                        onKeyDown={(e) => handleKey(index , e)}
                        onChange={(e) => handleChange(index , e)}
                       
                        />
                    ))
                 }
                 </div>
                 <button className={` py-3 w-[270px] rounded text-white ${bgColor}`}>Verify Account</button>
                 <p className="text-slate-400 ">Didn't receive Code?
                    <span className={`text-slate-800 
                    font-semibold `}>Resend</span> 
                 </p>
            </div>
        </div>
    )
}

export default OtpForm