export default function Themes(props) {

    return (
        <main
            className="h-screen w-full flex justify-center items-center"
            style={{ backgroundColor: props.currentTheme.bgcol }}>

            <div
                className="w-10/12 h-11/12 sm:w-10/12 sm:h-11/12 md:w-11/12 md:h-10/12 lg:h-11/12 rounded-2xl flex flex-col items-center"
                style={{ border: `1px solid ${props.currentTheme.linecol}` }}>

                <div className="w-full pt-10 pb-5 flex flex-col gap-3 justify-center items-center"
                    style={{ borderBottom: `1px solid ${props.currentTheme.linecol}` }}
                >
                    <section className="font-[Popins] font-bold text-center">
                        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white">Themes</h1>
                    </section>

                    <section className="font-[Rubik] flex justify-center gap-2 w-[15rem] text-white">
                        <button onClick={() => props.onClick('home')} className="size-10 text-xl p-4 shadow-2xl rounded-full flex justify-center items-center"
                            style={{ border: `1px solid ${props.currentTheme.linecol}` }}>
                            <i className="fa-solid fa-house text-[#00b492]"></i>
                        </button>
                        <button onClick={() => props.onClick('todolist')} className="size-10 text-xl p-4 shadow-2xl rounded-full flex justify-center items-center"
                            style={{ border: `1px solid ${props.currentTheme.linecol}` }}>
                            <i className="fa-solid fa-list-check text-[#F46036]"></i>
                        </button>
                        <button onClick={() => props.onClick('reminders')} className="size-10 text-xl p-4 shadow-2xl rounded-full flex justify-center items-center"
                            style={{ border: `1px solid ${props.currentTheme.linecol}` }}>
                            <i className="fa-solid fa-bell text-[#C5D86D]"></i>
                        </button>
                        <button onClick={() => props.onClick('goals')} className="size-10 text-xl p-4 shadow-2xl rounded-full flex justify-center items-center"
                            style={{ border: `1px solid ${props.currentTheme.linecol}` }}>
                            <i className="fa-solid fa-bullseye text-[#E71D36]"></i>
                        </button>
                    </section>

                </div>

                <div className="flex justify-center items-center my-8 h-full w-10/12 overflow-y-auto">

                    <section className="font-[Rubik] flex flex-col justify-start items-center gap-4 px-5 text-white w-full h-full">
                        {[
                            { name: "Space Cadet & Persian Green", colors: ["#2E294E", "#1B998B"], key: "scpg" },
                            { name: "Space Cadet & Mellow Apricot", colors: ["#2E294E", "#ffb85f"], key: "scma" },
                            { name: "Space Cadet & Lavender Gray", colors: ["#2E294E", "#ada9bb"], key: "sclg" },
                            { name: "Space Cadet & Chartreuse Yellow", colors: ["#2E294E", "#f9f871"], key: "sccy" },
                            { name: "Space Cadet & Mindaro", colors: ["#2E294E", "#C5D86D"], key: "scmi" },
                            { name: "Space Cadet & Cream", colors: ["#2E294E", "#EAEFBD"], key: "sccr" },
                            { name: "Space Cadet & Beige", colors: ["#2E294E", "#877666"], key: "scbe" },
                        ].map((theme) => (
                            <div key={theme.key} onClick={() => props.changeTheme(theme.key)} className="w-full flex justify-between items-center cursor-pointer">
                                <h1 className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl px-2">{theme.name}</h1>
                                <div className="flex">
                                    {theme.colors.map((color, index) => (
                                        <div key={index} className="size-10 w-10 h-10"
                                            style={{ backgroundColor: color, border: `1px solid ${props.currentTheme.linecol}` }}>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>

                </div>



            </div>
        </main>

    );
}
