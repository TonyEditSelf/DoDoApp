import { useEffect, useState } from "react";
import Home from "./comps/Home";
import ToDoList from "./comps/ToDoList";
import Reminders from "./comps/Reminders";
import SetGoals from "./comps/SetGoals";
import Themes from "./comps/Themes";

export default function App() {

  const scpg = {
    bgcol: '#2E294E',
    linecol: '#1B998B',
  }

  const scma = {
    bgcol: '#2E294E',
    linecol: '#ffb85f',
    textcol: '000000',
  }

  const sclg = {
    bgcol: '#2E294E',
    linecol: '#ada9bb',
    textcol: '000000',
  }

  const sccy = {
    bgcol: '#2E294E',
    linecol: '#f9f871',
    textcol: '000000',
  }

  const scmi = {
    bgcol: '#2E294E',
    linecol: '#C5D86D',
    textcol: '000000',
  }

  const sccr = {
    bgcol: '#2E294E',
    linecol: '#EAEFBD',
    textcol: '000000',
  }

  const scbe = {
    bgcol: '#2E294E',
    linecol: '#877666',
  }

  const [currentView, setCurrentView] = useState('home');
  const [currentTheme, setCurrentTheme] = useState(scpg);

  const handleClick = (currentView) => {

    setCurrentView(currentView);
  }

  const changeTheme = (theme) => {

    if (theme === 'scpg') {
      setCurrentTheme(scpg);
    }

    if (theme === 'scma') {
      setCurrentTheme(scma);
    }

    if (theme === 'sclg') {
      setCurrentTheme(sclg);
    }

    if (theme === 'sccy') {
      setCurrentTheme(sccy);
    }

    if (theme === 'scmi') {
      setCurrentTheme(scmi);
    }

    if (theme === 'sccr') {
      setCurrentTheme(sccr);
    }

    if (theme === 'scbe') {
      setCurrentTheme(scbe);
    }

  };

  return (

    <div className={`w-full h-screen flex justify-center items-center`}>

      {currentView === 'home' && <Home currentView={currentView} onClick={handleClick} currentTheme={currentTheme} changeTheme={changeTheme} />}

      {currentView === 'todolist' && <ToDoList currentView={currentView} onClick={handleClick} currentTheme={currentTheme} changeTheme={changeTheme} />}

      {currentView === 'reminders' && <Reminders currentView={currentView} onClick={handleClick} currentTheme={currentTheme} changeTheme={changeTheme} />}

      {currentView === 'goals' && <SetGoals currentView={currentView} onClick={handleClick} currentTheme={currentTheme} changeTheme={changeTheme} />}

      {currentView === 'themes' && <Themes currentView={currentView} onClick={handleClick} currentTheme={currentTheme} changeTheme={changeTheme} />}

    </div>

  );

}