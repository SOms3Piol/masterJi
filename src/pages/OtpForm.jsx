import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const OtpForm = () => {
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const [bgColor, setBgColor] = useState('bg-slate-800');
    const inputRefs = useRef([]);

    useEffect(() => {
        const handleBackgroundColor = () => {
            const otpValue = otp.join("");
            const actualSize = otp.filter(el => el !== "").length;

            if (otpValue === "1234") {
                setBgColor('bg-[#23CF9B]');
            } else if (otpValue !== "1234" && actualSize === 4) {
                setBgColor('bg-[#EB2D5B]');
            } else {
                setBgColor('bg-slate-800');
            }
        };

        handleBackgroundColor();
    }, [otp]);

    const handleChange = (index, e) => {
        const value = e.target.value;

        // Validate input: Allow only integers
        if (!/^\d*$/.test(value)) {
            e.target.value = '';
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move focus to the next input if the current input is filled
        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKey = (index, e) => {
        // Handle backspace to focus on the previous input
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputRefs.current[index - 1].focus();
        } else if (e.target.value.length === 1) {
            // Move focus to the next input if the current input is filled
            if (index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handlePaste = async (index, e) => {
        e.preventDefault();

        try {
            const clipboardData = await navigator.clipboard.read();
            const textData = await clipboardData[0].getType('text/plain');
            const text = await textData.text();

            // Split the pasted text into individual digits
            const digits = text.split('').filter(char => /^\d$/.test(char)); // Only keep digits

            const newOtp = [...otp];

            // Fill the input boxes with the pasted digits
            digits.forEach((digit, i) => {
                if (index + i < inputRefs.current.length) {
                    newOtp[index + i] = digit; // Update the array with the new digit
                    
                }
            });

            setOtp(newOtp);

            // Focus on the last input filled
            inputRefs.current[index + digits.length - 1]?.focus();
        } catch (error) {
            console.error('Failed to read clipboard data:', error);
        }
    };

    return (
        <div className="relative bg-sky-800 flex gap-9 flex-col justify-center items-center h-screen w-full">
            <h1 className="text-white text-5xl max-md:text-3xl font-bold">Chai aur Code</h1>
            <div className="w-[60vw] m-3 max-sm:w-full flex flex-col gap-[44px] items-center justify-center text-center rounded-3xl py-5 gap-3 bg-white h-[514px]">
                <div className="flex flex-col gap-1">
                    <h1 className="font-semibold text-[40px] max-md:text-2xl max-sm:text-3xl">Mobile Phone Verification</h1>
                    <p className="text-slate-400 text-[25px] max-md:text-base max-sm:text-sm font-medium">Enter the 4-digit verification code that was sent to <br /> your phone number</p>
                </div>
                <div className="flex gap-5 items-center">
                    {
                        otp.map((digit, index) => (
                            <input
                                key={index}
                                value = {digit}
                                ref={(input) => inputRefs.current[index] = input}
                                type="text"
                                className="border text-center max-md:w-[75px] max-md:h-[80px] text-[48px] outline-none rounded-lg bg-slate-300 w-[90px] h-[100px]"
                                onKeyDown={(e) => handleKey(index, e)}
                                onChange={(e) => handleChange(index, e)}
                                onPaste={(e) => handlePaste(index, e)}
                                maxLength={1}
                            />
                        ))
                    }
                </div>
                <div className="flex flex-col gap-1">
                    <button id="verify-button" className={`py-3 w-[417px] max-md:w-[350px] rounded text-white ${bgColor}`}>Verify Account</button>
                    <p className="text-slate-400">Didn't receive Code?
                        <span className={text-slate-800 font-semibold}>Resend</span>
                        <Link to={'/course-list'}>course-list</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OtpForm;
