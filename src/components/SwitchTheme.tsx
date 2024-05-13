import { setTheme } from "../app/slices/globalSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import React from "react"

export const SwitchTheme = () => {
  const theme = useAppSelector(state => state.global.theme);
  const shadow = theme === 'light' ? 'shadow-light' : 'shadow-dark';
  const dispatch = useAppDispatch();

  const handleThemeChange = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
  }

  return (
    <button onClick={handleThemeChange} className={`m-auto p-2 w-12  bg-purple md:hover:bg-dark-purple rounded-xl ${theme} ${shadow}`}>
      {theme === "light" ? <img className="m-auto" src="/assets/darkMode.svg" alt="dark" /> :
        <img className="m-auto" src="/assets/lightMode.svg" alt="light" />}
    </button>
  )

}