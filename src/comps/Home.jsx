import { useEffect, useState } from "react";

export default function Home(props) {

    const [quotation, setQuotation] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {

        const storedQuotation = localStorage.getItem('quotation');

        if (quotation) {
            setQuotation(storedQuotation);
        } else {

            fetch('https://api.allorigins.win/raw?url=https://zenquotes.io/api/random', {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    const quote = data[0].q;
                    const quoteAuthor = data[0].a;
                    localStorage.setItem('quotation', quote);
                    localStorage.setItem('author', quoteAuthor);
                    setQuotation(quote);
                    setAuthor(quoteAuthor);
                })
                .catch(error => {
                    setQuotation('problem fetching from API');
                });
        }
    }, []);


    return (
        <div className="h-screen w-full flex justify-center items-center"
            style={{ backgroundColor: props.currentTheme.bgcol }}>

            <main
                className="w-10/12 h-11/12 sm:w-10/12 sm:h-11/12 md:w-11/12 md:h-10/12 lg:h-11/12 py-10 rounded-2xl flex flex-col justify-center items-center gap-7 overflow-hidden"
                style={{ border: `1px solid ${props.currentTheme.linecol}` }}>

                <section className="font-[Popins] font-extrabold text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl m-2 text-white">Do-Do</h1>
                </section>

                <section className="font-[Rubik] flex flex-col md:flex md:flex-row md:justify-center md:items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-12 2xl:gap-15 text-white
                w-9/12 sm:w-6/12 md:w-11/12">

                    <button
                        onClick={() => props.onClick('todolist')}
                        className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl p-4 rounded-xl shadow-2xl md:size-36 lg:size-40 xl:size-44 2xl:size-52  cursor-pointer"

                        style={{ border: `1px solid ${props.currentTheme.linecol}` }}>
                        To-Do-List &nbsp; <i className="fa-solid fa-list-check text-orange-400"></i>
                    </button>

                    <button
                        onClick={() => props.onClick('reminders')}
                        className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl p-4 rounded-xl shadow-2xl md:size-36 lg:size-40 xl:size-44 2xl:size-52  cursor-pointer"
                        style={{ border: `1px solid ${props.currentTheme.linecol}` }}>
                        Reminders &nbsp; <i className="fa-solid fa-bell text-[#C5D86D]"></i>
                    </button>

                    <button
                        onClick={() => props.onClick('goals')}
                        className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl p-4 rounded-xl shadow-2xl md:size-36 lg:size-40 xl:size-44 2xl:size-52 text-center cursor-pointer"
                        style={{ border: `1px solid ${props.currentTheme.linecol}` }}>
                        Set Targets &nbsp; <i className="fa-solid fa-bullseye text-[#E71D36]"></i>
                    </button>

                    <button
                        onClick={() => props.onClick('themes')}
                        className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl p-4 rounded-xl shadow-2xl md:size-36 lg:size-40 xl:size-44 2xl:size-52 cursor-pointer"
                        style={{ border: `1px solid ${props.currentTheme.linecol}` }}>
                        Set Themes &nbsp; <i className="text-pink-500 fa-solid fa-paint-roller"></i>
                    </button>
                </section>

                <section className="w-9/12 sm:w-6/12 md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-7/12 h-36 overflow-y-auto flex justify-center items-center"
                // style={{ border: `1px solid ${props.currentTheme.linecol}` }}
                >

                    <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center my-2 p-2 w-fit h-fit cursor-default">
                        {quotation} -- {author}
                    </p>

                </section>



            </main >
        </div>
    );
}
