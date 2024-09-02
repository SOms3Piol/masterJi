dimport { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";

const OtpForm = () => {
    const [otp , setOtp] = useState(new Array(4).fill(""));
    const [bgColor , setBgColor] = useState('bg-slate-800')
    const inputRefs = useRef([]);

    useEffect(()=>{
        const actualSize = otp.filter(el => el !== "").length;
        if(otp.join("") == "1234" ){
            setBgColor('bg-[#23CF9B]') 
        }else if(otp.join("") != "1234" && actualSize == 4){
            setBgColor('bg-[#EB2D5B]')
        }
    },[otp])


    const handleChange = (index, e) => {
    const value = e.target.value;

    // Validate input: Allow only integers
    if (!/^\d*$/.test(value)) {
        // If the input is not a valid integer, reset the value
        e.target.value = '';
        return;
    }
    
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);
    setBgColor('bg-[#112D4E]');

    // Move focus to the next input if the current input is filled
    if (value && index < 3) {
        return inputRefs.current[index + 1].focus();
    }
};

const handleKey = (index, e) => {
    // Handle backspace to focus on the previous input
    if (e.key === "Backspace" && !e.target.value && index > 0) {
        inputRefs.current[index - 1].focus();
        setBgColor('bg-slate-800');
    }
};

const handlePaste = (index, e) => {
    e.preventDefault(); // Prevent the default paste behavior
    const pasteData = e.clipboardData.getData('text');

    // Validate pasted data: Only allow integers
    if (/^\d*$/.test(pasteData)) {
        let newArr = [...otp];
        let currentIndex = index;

        // Distribute each digit to the respective input
        for (let i = 0; i < pasteData.length; i++) {
                newArr[i] = pasteData[i];
        }

        setOtp(newArr);
        setBgColor('bg-[#112D4E]');

        // Move focus to the last filled input
        inputRefs.current[Math.min(currentIndex, 3)].focus();
    } else {
        // If the pasted data is not valid, reset the input
        e.target.value = '';
    }
};

    

    return(
        <div className="relative bg-sky-800 flex gap-9 flex-col justify-center items-center h-screen w-full">
            <h1 className="text-white text-5xl max-md:text-3xl font-bold">Chai aur Code</h1>
            <div className="w-[60vw] m-3 max-sm:w-full flex flex-col gap-[44px] items-center justify-center text-center rounded-3xl py-5 gap-3 bg-white h-[514px]">
                <div className="flex flex-col gap-1">
                    <h1 className="font-semibold text-[40px] max-md:text-2xl max-sm:text-3xl">Mobile Phone Verification</h1>
                    <p className="text-slate-400 text-[25px] max-md:text-base max-sm:text-sm font-medium">Enter the 4-digit verification code that was sent to <br /> your phone number</p>
                </div>
                 <div className="flex gap-5  items-center">
                 {
                    otp && otp.map((obj,index)=>(
                        <input 
                        key={index}
                        ref={(input)=>inputRefs.current[index] = input}
                        type="text"
                        value={obj}
                        className="border text-center max-md:w-[75px] max-md:h-[80px] text-[48px] outline-none rounded-lg bg-slate-300 w-[90px] h-[100px] "
                        onKeyDown={(e) => handleKey(index , e)}
                        onChange={(e) => handleChange(index , e)}
                        onPaste={(e) => handlePaste(index, e)}
                        maxLength={1}
                        />
                    ))
                 }
                 </div>
                 <div className="flex flex-col gap-1">
                    <button className={` py-3 w-[417px] max-md:w-[350px] rounded text-white ${bgColor}`}>Verify Account</button>
                    <p className="text-slate-400 ">Didn't receive Code?
                        <span className={`text-slate-800 
                        font-semibold `}>Resend</span> 
                        <Link to={'/course-list'}>course-list</Link>
                    </p>
                 </div>
            </div>
        </div>
    )
}

export default OtpForm
