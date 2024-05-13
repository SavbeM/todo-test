import React, { useEffect, useState } from "react"
import { useAppSelector, useWindowSize } from "./app/hooks"
import { MobileHeader } from "./components/MobileHeader"
import { Search } from "./components/Search"
import type { Todo } from "./types/todo"
import { Filter } from "./components/Filter"
import { SwitchTheme } from "./components/SwitchTheme"
import { List } from "./components/List"
import { AddTodo } from "./components/AddTodo"


const App = () => {
  const theme = useAppSelector(state => state.global.theme)
  const [searchedTodos, setSearchedTodos] = useState<Todo[]>([])
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([])
  const windowSize = useWindowSize()
  const height = windowSize.height;
  const mobile = windowSize.width <= 640;

  useEffect(() => {
    console.log(filteredTodos)
  }, [filteredTodos])
  return (
    <div className={`flex flex-col items-center pb-32 min-h-screen w-full  ${theme}`}>
      {mobile ? <>
          <MobileHeader />
          <hr className={`w-full h-[2px] ${theme === "dark" ? "text-purple" : "text-transparent"}`} />
        </> :
        <h1 className=" text-[26px] font-semibold font-kanit-medium mt-[40px]">TODO LIST</h1>}
      <div className="flex flex-col items-center sm:max-w-2xl ">
      <div
        className={`mt-[64px] p-2 sm:mt-[18px] w-full max-w-[440px] sm:max-w-2xl grid grid-cols-3 grid-rows-1 gap-4 items-center`}>
        <div className="col-span-2">
          <Search setSearchedTodos={setSearchedTodos} />
        </div>
        <div className="col-span-1">
          <div className="flex flex-row gap-8 ">
            <Filter setFilteredTodos={setFilteredTodos} />
            {!mobile &&
              <div className="col-span-1">
                <SwitchTheme />
              </div>
            }
          </div>
        </div>
      </div>
      <div className="mt-12">
        <List searchedTodos={searchedTodos} filteredTodos={filteredTodos} />
      </div>
      <div className="ml-auto mt-auto pt-20 pr-2">
        <AddTodo />
      </div>
    </div>
</div>
  )
}

export default App
