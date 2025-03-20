import { useState, useEffect } from "react";

export default function ToDoList(props) {

    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    });

    const [doneTasks, setDoneTasks] = useState(() => {
        return JSON.parse(localStorage.getItem("doneTasks")) || [];
    });

    const [inputTask, setInputTask] = useState('');

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
    }, [doneTasks]);

    const addTaskOnClick = () => {
        if (inputTask.trim()) {
            const newTask = { id: Date.now(), task: inputTask.trim(), checked: false };
            setTasks(t => [...t, newTask]);
            setInputTask("");
        }
    }

    const addTaskWithKey = (e) => {
        if (e.key === 'Enter' && inputTask.trim()) {
            const newTask = { id: Date.now(), task: inputTask.trim(), checked: false };
            setTasks(t => [...t, newTask]);
            setInputTask("");
        }
    }

    const pushIntoDoneTasks = (e) => {
        const taskId = parseInt(e.target.id);
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            setDoneTasks(d => [...d, { ...task, checked: true }]);
            setTasks(tasks.filter(task => task.id !== taskId));
        }
    }

    const pushIntoTasks = (e) => {
        const taskId = parseInt(e.target.id);
        const doneTask = doneTasks.find(doneTask => doneTask.id === taskId);
        if (doneTask) {
            setTasks(t => [...t, { ...doneTask, checked: false }]);
            setDoneTasks(doneTasks.filter(doneTask => doneTask.id !== taskId));
        }
    }

    const deleteTask = (e) => {
        const idOfTask = parseInt(e.target.id);
        setTasks(tasks.filter(task => task.id !== idOfTask));
    }

    const deleteDoneTask = (e) => {
        const idOfTask = parseInt(e.target.id);
        setDoneTasks(doneTasks.filter(doneTask => doneTask.id !== idOfTask));
    }

    const deleteLists = () => {
        setTasks([]);
        setDoneTasks([]);
        localStorage.removeItem("tasks");
        localStorage.removeItem("doneTasks");
    }


    return (
        <div className="h-screen w-full flex justify-center items-center"
            style={{ backgroundColor: props.currentTheme.bgcol }}>

            <main className="w-10/12 h-11/12 sm:w-10/12 sm:h-11/12 md:w-11/12 md:h-10/12 lg:h-11/12 py-10 rounded-2xl flex flex-col justify-center items-center gap-5 overflow-hidden"
                style={{
                    border: `1px solid ${props.currentTheme.linecol}`
                }}>

                <section className="font-[Popins] font-bold text-center w-[15rem] md:w-[30rem]">
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white">To-Do-List</h1>
                </section>

                <section className="font-[Rubik] flex justify-center gap-2 text-white w-full pb-5"
                    style={{ borderBottom: `1px solid ${props.currentTheme.linecol}` }}
                >
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
                        onClick={() => props.onClick('reminders')}
                        className="size-10 text-xl p-4 shadow-2xl rounded-full flex justify-center items-center"
                        style={{ border: `1px solid ${props.currentTheme.linecol}` }} // 1px solid dynamic border for button
                    >
                        <i className="fa-solid fa-bell text-[#C5D86D]"></i>
                    </button>

                    <button
                        onClick={() => props.onClick('goals')}
                        className="size-10 text-xl p-4 shadow-2xl rounded-full flex justify-center items-center"
                        style={{ border: `1px solid ${props.currentTheme.linecol}` }}
                    >
                        <i className="fa-solid fa-bullseye text-[#E71D36]"></i>
                    </button>

                    <button
                        onClick={deleteLists}
                        className="size-10 text-xl p-4 shadow-2xl rounded-full flex justify-center items-center"
                        style={{ border: `1px solid ${props.currentTheme.linecol}` }}
                    >
                        <i className="fa-solid fa-trash-can"
                        />
                    </button>
                </section>

                {/* <hr
                    className="w-full"
                    style={{ border: `1px solid ${props.currentTheme.linecol}` }}
                /> */}

                <section className="w-full flex justify-center">
                    <input
                        className="w-6/12 sm:w-7/12 md:w-5/12 lg:w-6/12 px-3 sm:mt-12 lg:mt-6 py-2 border rounded-l-md outline-none text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                        autoFocus
                        style={{ borderColor: props.currentTheme.linecol }}
                        value={inputTask}
                        onChange={(e) => setInputTask(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                        onKeyDown={addTaskWithKey}
                        placeholder="Add a task..."
                    />
                    <button onClick={addTaskOnClick} className="w-2/12 lg:w-1/12 px-4 sm:mt-12 lg:mt-6 py-2 font-bold text-black rounded-r-md text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl" style={{ backgroundColor: props.currentTheme.linecol }}>+</button>
                </section>

                <section className="font-[Rubik] text-white h-full max-h-[70vh] w-9/12 md:w-7/12 flex-1 flex flex-col gap-3 overflow-hidden">
                    <div className="flex-1 overflow-y-auto" style={{ maxHeight: '60vh' }}>
                        <ul className="w-full py-1 px-4 md:py-4 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl flex flex-col justify-start items-start">
                            {
                                tasks.map((task) => (
                                    <li className="py-1 flex items-center justify-between w-full" key={task.id}>
                                        <div className="flex items-center w-full gap-0">
                                            <input
                                                type="checkbox"
                                                onChange={pushIntoDoneTasks}
                                                checked={task.checked}
                                                id={`${task.id}`}
                                                className="mr-3 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8"
                                            />
                                            <label className="text-white flex-1 border-b text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
                                                style={{ borderColor: props.currentTheme.linecol }}

                                                htmlFor={`${task.id}`}>{task.task}</label>
                                        </div>
                                        <i onClick={deleteTask} id={`${task.id}`} className="fa-solid fa-circle-xmark text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl" style={{ color: props.currentTheme.linecol }}></i>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className="overflow-y-auto"
                        style={{ maxHeight: '25vh' }}>
                        <ul className="w-full py-1 px-4 md:py-4 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                            {
                                doneTasks.map((doneTask) => (
                                    <li className="py-1 flex justify-between items-center w-full" key={doneTask.id}>
                                        <div className="flex items-center w-full gap-3">
                                            <input
                                                type="checkbox"
                                                checked={doneTask.checked}
                                                onChange={pushIntoTasks}
                                                id={`${doneTask.id}`}
                                                className="mr-3 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8"
                                            />
                                            <label className="line-through text-slate-400 flex-1 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl" htmlFor={`${doneTask.id}`}>{doneTask.task}</label>
                                        </div>
                                        <i onClick={deleteDoneTask} id={`${doneTask.id}`} className="fa-solid fa-circle-xmark text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl" style={{ color: props.currentTheme.linecol }}></i>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );


}
