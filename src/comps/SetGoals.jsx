import { useState, useEffect } from "react";

export default function SetGoals(props) {

    const [goals, setGoals] = useState(() => {
        return JSON.parse(localStorage.getItem("goals")) || [];
    });

    const [inputGoal, setInputGoal] = useState('');

    useEffect(() => {
        localStorage.setItem("goals", JSON.stringify(goals));
    }, [goals]);

    const addGoalWithKey = (e) => {
        if (e.key === 'Enter' && inputGoal.trim()) {
            const newGoal = { id: Date.now(), goal: inputGoal.trim(), checked: false };
            setGoals(g => [...g, newGoal]);
            setInputGoal('');
        }
    }

    const addGoalOnClick = () => {
        if (inputGoal.trim()) {
            const newGoal = { id: Date.now(), goal: inputGoal.trim(), checked: false };
            setGoals(g => [...g, newGoal]);
            setInputGoal('');
        }
    }

    const deleteGoal = (e) => {
        const idOfGoal = parseInt(e.target.id);
        setGoals(goals.filter(goal => goal.id !== idOfGoal));
    }

    const deleteLists = () => {
        setGoals([]);
        localStorage.removeItem("goals");
    }

    return (
        <div className="h-screen w-full flex justify-center items-center"
            style={{ backgroundColor: props.currentTheme.bgcol }}>
            <main
                className="w-10/12 h-11/12 sm:w-10/12 sm:h-11/12 md:w-11/12 md:h-10/12 lg:h-11/12 py-10 rounded-2xl flex flex-col justify-center items-center gap-5 overflow-hidden"

                style={{ border: `1px solid ${props.currentTheme.linecol}` }}>

                <section className="font-[Popins] font-bold text-center w-[15rem] md:w-[30rem]">
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white">Targets</h1>
                </section>

                <section className="font-[Rubik] flex justify-center gap-2 text-white w-[15rem]">
                    <button
                        onClick={() => props.onClick('home')}

                        className="size-10 text-xl p-4 shadow-2xl rounded-full flex justify-center items-center"

                        style={{ border: `1px solid ${props.currentTheme.linecol}` }} // 1px solid dynamic border for button
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
                        style={{ border: `1px solid ${props.currentTheme.linecol}` }} // 1px solid dynamic border for button
                    >
                        <i className="fa-solid fa-list-check text-[#F46036]"></i>
                    </button>

                    <button
                        onClick={() => props.onClick('reminders')}
                        className="size-10 text-xl p-4 shadow-2xl rounded-full flex justify-center items-center"
                        style={{ border: `1px solid ${props.currentTheme.linecol}` }} // 1px solid dynamic border for button
                    >
                        <i className="fa-solid fa-bell text-[#C5D86D]"></i>
                    </button>

                    <button
                        onClick={deleteLists}
                        className="size-10 text-xl p-4 shadow-2xl rounded-full flex justify-center items-center"
                        style={{ border: `1px solid ${props.currentTheme.linecol}` }} // 1px solid dynamic border for button
                    >
                        <i className="fa-solid fa-trash-can" />
                    </button>
                </section>

                <hr
                    className="w-full"
                    style={{ border: `1px solid ${props.currentTheme.linecol}` }}
                />

                <section className="font-[Rubik] text-white w-full flex justify-center">

                    <input
                        className="w-6/12 sm:w-7/12 md:w-5/12 lg:w-6/12 sm:mt-12 lg:mt-6 outline-none px-3 border rounded-l-md text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                        value={inputGoal}
                        onChange={(e) => setInputGoal(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}  // Capitalize the first letter
                        onKeyDown={addGoalWithKey}  // Add task on Enter key press
                        autoFocus
                        placeholder="Add a target..."
                        style={{ borderColor: props.currentTheme.linecol }} // Dynamic border for input field
                    />
                    {/* Add task button */}
                    <button
                        onClick={addGoalOnClick}
                        className="w-2/12 lg:w-1/12 sm:mt-12 lg:mt-6 px-4 py-2 font-bold text-black rounded-r-md text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                        style={{ backgroundColor: props.currentTheme.linecol }} // Dynamic background color for button
                    >
                        +
                    </button>
                </section>

                <section className="font-[Rubik] text-white h-[438px] md:h-[350px] w-9/12 sm:w-9/12 md:w-7/12 lg:w-7/12 flex-1 flex flex-col items-center gap-3 overflow-y-auto">

                    <ul className="flex flex-col items-center w-full h-full overflow-y-auto">
                        {
                            goals.map((goal) => (
                                <li
                                    className="py-1 border-b flex items-center justify-between w-11/12 sm:w-12/12 md:w-12/12 lg:w-12/12 xl:12/12"
                                    style={{ borderColor: props.currentTheme.linecol }}
                                    key={goal.id}>
                                    <div>
                                        <label htmlFor={goal.id} className="w-[30px] md:w-[50px] overflow-x-scroll h-[30px] text-white flex-1 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                                            &nbsp;{goal.goal}
                                        </label>
                                    </div>
                                    <div>
                                        <i
                                            id={goal.id}
                                            onClick={deleteGoal}
                                            className="fa-solid fa-circle-xmark text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
                                            style={{ color: props.currentTheme.linecol }} // Dynamic color for delete icon
                                        />
                                    </div>
                                </li>
                            ))
                        }
                    </ul>

                </section>

            </main>
        </div>
    );

}
