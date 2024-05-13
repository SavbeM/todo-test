import { useAppSelector, useSearch } from "../app/hooks"
import { memo, useEffect, useState } from "react"
import type { SearchProps } from "../types/todo"


export const Search = memo(function({ setSearchedTodos }: SearchProps) {
  const theme = useAppSelector(state => state.global.theme)
  const [searchText, setSearchText] = useState<string>("")
  const todos = useSearch(searchText)

  useEffect(() => {
    setSearchedTodos(todos)
  }, [searchText, todos])

  return (
    <div className="relative w-full min-w-[200px]">
      <img
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5  `}
        src={theme === "light" ? "/assets/search.svg" : "/assets/search-white.svg"} alt="search" />
      <input type="text" onChange={(e) => setSearchText(e.target.value)}
             className={`pl-8 w-full h-9 rounded ${theme} ${theme === "light" ? "focus:outline-none focus:ring-2 focus:ring-purple focus:ring-opacity-40 border border-purple" :
               "focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 border border-white"}`}
             placeholder="Search note..." />
    </div>
  )
})