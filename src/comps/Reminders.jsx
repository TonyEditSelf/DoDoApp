import React, { useState, useEffect, useRef } from "react";

export default function Reminders(props) {
    const [days, setDays] = useState("");
    const [timeLeft, setTimeLeft] = useState(null);
    const countdownInterval = useRef(null);
    const [inputGoal, setInputGoal] = useState('');
    const [goal, setGoal] = useState('');
    const [error, setError] = useState('');

    const addGoalWithKey = (e) => {
        if (e.key === 'Enter') {
            setReminder();
        }
    };

    useEffect(() => {
        // Check localStorage for an existing reminder and goal on mount
        const savedTime = localStorage.getItem("reminderTime");
        const savedGoal = localStorage.getItem("goal");
        if (savedTime) {
            startCountdown(parseInt(savedTime, 10));
        }
        if (savedGoal) {
            setGoal(savedGoal);
        }

        // Clear interval on unmount
        return () => {
            if (countdownInterval.current) {
                clearInterval(countdownInterval.current);
            }
        };
    }, []);

    const setReminder = () => {
        if (!days || isNaN(days) || days <= 0 || inputGoal === '') {
            setError('Please enter goal and days');
            deleteReminder();
            return;
        }

        const now = new Date().getTime();
        const targetTime = now + days * 24 * 60 * 60 * 1000;
        localStorage.setItem("reminderTime", targetTime);
        localStorage.setItem("goal", inputGoal);
        startCountdown(targetTime);
        setGoal(inputGoal);
        setDays("");
        setInputGoal('');
        setError('');
    };

    const startCountdown = (targetTime) => {
        // Clear any existing interval before starting a new one
        if (countdownInterval.current) {
            clearInterval(countdownInterval.current);
        }
        countdownInterval.current = setInterval(() => {
            const now = new Date().getTime();
            const diff = targetTime - now;
            if (diff <= 0) {
                clearInterval(countdownInterval.current);
                setTimeLeft(null);
                setError("Time's up!");
                localStorage.removeItem("reminderTime");
                return;
            }
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000),
            });
        }, 1000);
    };

    const deleteReminder = () => {
        if (countdownInterval.current) {
            clearInterval(countdownInterval.current);
            countdownInterval.current = null;
        }
        setTimeLeft(null);
        localStorage.removeItem("reminderTime");
        localStorage.removeItem("goal");
        setGoal('');
    };

    return (
        <div
            className="h-screen w-full flex justify-center items-center" style={{ backgroundColor: props.currentTheme.bgcol }}>

            <main
                className="w-10/12 h-11/12 sm:w-10/12 sm:h-11/12 md:w-11/12 md:h-10/12 lg:h-11/12 py-10 rounded-2xl flex flex-col items-start overflow-hidden gap-16"
                style={{ border: `1px solid ${props.currentTheme.linecol}` }}>

                <div className="w-full flex flex-col items-center gap-5 pb-5"
                    style={{ borderBottom: `1px solid ${props.currentTheme.linecol}` }}>
                    {/* header secttion */}
                    <section className="font-[Popins] font-bold text-center w-[15rem] md:w-[30rem]">
                        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white">Reminders</h1>
                    </section>

                    {/* Navigation Buttons */}
                    <section className="font-[Rubik] flex justify-center gap-2 text-white w-[15rem]">
                        <button
                            onClick={() => props.onClick('home')}
                            className="size-10 text-xl p-4 shadow-2xl rounded-full flex justify-center items-center"
                            style={{ border: `1px solid ${props.currentTheme.linecol}` }}
                        >
                            <i className="fa-solid fa-house text-[#00b492]"></i>
                        </button>

                        <button
                            onClick={() => props.onClick('themes')}
                            className="size-10 text-xl p-4 shadow-2xl rounded-full flex justify-center items-center"
                            style={{ border: `1px solid ${props.currentTheme.linecol}` }}
                        >
                            <i className="fa-solid fa-paint-roller text-pink-500"></i>
                        </button>

                        <button
                            onClick={() => props.onClick('todolist')}
                            className="size-10 text-xl p-4 shadow-2xl rounded-full flex justify-center items-center"
                            style={{ border: `1px solid ${props.currentTheme.linecol}` }}
                        >
                            <i className="fa-solid fa-list-check text-[#F46036]"></i>
                        </button>

                        <button
                            onClick={() => props.onClick('goals')}
                            className="size-10 text-xl p-4 shadow-2xl rounded-full flex justify-center items-center"
                            style={{ border: `1px solid ${props.currentTheme.linecol}` }}
                        >
                            <i className="fa-solid fa-bullseye text-[#E71D36]"></i>
                        </button>

                        <button
                            onClick={deleteReminder}
                            className="size-10 text-xl p-4 shadow-2xl rounded-full flex justify-center items-center"
                            style={{ border: `1px solid ${props.currentTheme.linecol}` }}
                        >
                            <i className="fa-solid fa-trash-can" />
                        </button>
                    </section>
                </div>


                <div className="w-10/12 sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-10/12 flex mx-auto text-center">
                    <section className="font-[Rubik] text-white w-full flex flex-col items-center justify-center">
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-center">
                                <input
                                    className="w-10/12 sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-12/12 px-3 py-2 border rounded-md outline-none text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                                    autoFocus
                                    value={inputGoal}
                                    onChange={(e) => setInputGoal(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                                    onKeyDown={addGoalWithKey}
                                    style={{ borderColor: props.currentTheme.linecol }}
                                    placeholder="Add a target..."
                                />
                            </div>
                            <div className="flex justify-center">
                                <input
                                    type="number"
                                    value={days}
                                    onChange={(e) => setDays(e.target.value)}
                                    className="w-8/12 sm:w-9/12 md:w-9/12 lg:w-9/12 xl:w-10/12 px-3 py-2 border rounded-l-md outline-none text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                                    placeholder="Number of days..."
                                    onKeyDown={addGoalWithKey}
                                    style={{ borderColor: props.currentTheme.linecol }}
                                />
                                <button
                                    onClick={setReminder}
                                    className="w-2/12 lg:w-2/12 px-4 py-2 font-bold text-black rounded-r-md text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                                    style={{ backgroundColor: props.currentTheme.linecol }}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="w-10/12 sm:w-11/12 md:w-7/12 lg:w-8/12 xl:w-12/12 2xl:w-11/12 flex flex-col justify-center items-center gap-1" style={{ minHeight: '100px' }}>
                            <h1 className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-center text-red-500 font-semibold ${error ? 'block' : 'hidden'}`}>{error}</h1>
                            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold mt-10" style={{ color: props.currentTheme.linecol }}>{goal}</h1>

                            {/* Set a fixed space for countdown */}
                            <div className={`mt-4 ${timeLeft ? 'block' : 'hidden'}`}>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                                    Countdown: {timeLeft?.days}d {timeLeft?.hours}h {timeLeft?.minutes}m {timeLeft?.seconds}s
                                </p>
                            </div>
                        </div>

                    </section>
                </div>
            </main >
        </div >
    );
}
