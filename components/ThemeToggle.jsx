import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { DarkModeSwitch } from "react-toggle-dark-mode";


const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    const themeCheck = () => {
        if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add('dark', new Boolean(setDarkMode(true)).toString())
        } else {
            document.documentElement.classList.remove('dark');
            setDarkMode(false);
        }
    }

    useEffect(() => {
        themeCheck()
    }, [darkMode]);

    useEffect(() => {
        themeCheck()
    }, []);

    const toggleDarkMode = () => {
        const theme = localStorage.getItem('theme');
        if (theme) {
            localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
        } else {
            localStorage.setItem('theme', 'dark')
        }
        setDarkMode(!darkMode)
    }



  return (
    <div className="text-white text-xl cursor-pointer">
          <DarkModeSwitch
              checked={darkMode}
              onChange={toggleDarkMode}
              size={25}
          />
    </div>
  );
};

export default ThemeToggle;
