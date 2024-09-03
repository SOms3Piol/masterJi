import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const OtpForm = () => {
    const otpRef = useRef(new Array(4).fill(""));
    const bgColorRef = useRef('bg-slate-800');
    const inputRefs = useRef([]);

    useEffect(() => {
        const handleBackgroundColor = () => {
            const otpValue = otpRef.current.join("");
            const actualSize = otpRef.current.filter(el => el !== "").length;

            if (otpValue === "1234") {
                bgColorRef.current = 'bg-[#23CF9B]';
            } else if (otpValue !== "1234" && actualSize === 4) {
                bgColorRef.current = 'bg-[#EB2D5B]';
            } else {
                bgColorRef.current = 'bg-slate-800';
            }

            // Update the button background color
            const button = document.getElementById("verify-button");
            if (button) {
                button.className = `py-3 w-[417px] max-md:w-[350px] rounded text-white ${bgColorRef.current}`;
            }
        };

        handleBackgroundColor();
    }, [otpRef.current]);

    const handleChange = (index, e) => {
        const value = e.target.value;

        // Validate input: Allow only integers
        if (!/^\d*$/.test(value)) {
            e.target.value = '';
            return;
        }

        otpRef.current[index] = value;

        // Move focus to the next input if the current input is filled
        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }

        // Update the background color
        const button = document.getElementById("verify-button");
        if (button) {
            button.className = `py-3 w-[417px] max-md:w-[350px] rounded text-white ${bgColorRef.current}`;
        }
    };

    const handleKey = (index, e) => {
        // Handle backspace to focus on the previous input
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

   const handlePaste = (index, e) => {
    e.preventDefault();

    navigator.clipboard.readText().then(pastedData => {
        const digits = pastedData.replace(/[^0-9]/g, '').split('');
        let currentIndex = index;

        digits.forEach(digit => {
            if (inputRefs.current[currentIndex] && otpRef.current[currentIndex] === "") {
                inputRefs.current[currentIndex].value = digit;
                otpRef.current[currentIndex] = digit; // Update the ref
                inputRefs.current[currentIndex].dispatchEvent(new Event('input')); // Trigger input event
                
                currentIndex += 1; // Move to the next input
            }
        });

        while (currentIndex < otpRef.current.length && otpRef.current[currentIndex] !== "") {
            currentIndex++;
        }
        if (inputRefs.current[currentIndex]) {
            inputRefs.current[currentIndex].focus();
        }
    }).catch(error => {
        console.error('Failed to read clipboard data:', error);
    });
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
                        otpRef.current.map((_, index) => (
                            <input
                                key={index}
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
                    <button id="verify-button" className={`py-3 w-[417px] max-md:w-[350px] rounded text-white ${bgColorRef.current}`}>Verify Account</button>
                    <p className="text-slate-400">Didn't receive Code?
                        <span className={`text-slate-800 font-semibold`}>Resend</span>
                        <Link to={'/course-list'}>course-list</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OtpForm;
