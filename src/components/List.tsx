import type { ListProps, Todo } from "../types/todo"
import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { toggleTodo } from "../app/slices/todoSlice"
import { Edit } from "./Edit"
import { Delete } from "./Delete"



export const List = ({searchedTodos, filteredTodos} : ListProps) => {
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>([]);
  const todos = useAppSelector(state => state.todos);
  const theme = useAppSelector(state => state.global.theme);
  const shadow = theme === 'light' ? 'shadow-light' : 'shadow-dark';
  const dispatch = useAppDispatch();

  const newDisplayedTodos = useMemo(() => {
    return searchedTodos.filter(todo => filteredTodos.includes(todo)).reverse();
  }, [searchedTodos, filteredTodos, todos]);



  useEffect(() => {

    setDisplayedTodos(newDisplayedTodos);
  }, [searchedTodos, filteredTodos, todos]);

  const handleCheckbox = (id: number) => {
     dispatch(toggleTodo(id));
  }

  return displayedTodos.length > 0  ? (
    <>
      <div className="grid grid-cols-1 gap-4 max-w-72">
        {displayedTodos.map(todo => (
          <div key={todo.id} className={`flex rounded flex-row items-center gap-4 p-4 ${todo.completed && "bg-purple text-white"} ${theme} ${shadow} ${theme === "dark" && "border border-purple"}`}>
            <div className="flex flex-col items-center">
              <input className={`form-checkbox h-5 w-5 text-purple-600 accent-purple`} onChange={() => handleCheckbox(todo.id)} type="checkbox" checked={todo.completed} />
            </div>
            <div className="flex flex-col">
              <h3 className={`text-lg font-semibold ${todo.completed && "line-through"}`}>{todo.title}</h3>
              <p className="text-sm">{todo.description}</p>
            </div>
            <div className="ml-auto flex flex-row gap-2">
              <Edit id={todo.id}/>
              <Delete id={todo.id}/>
            </div>
          </div>
        ))}
      </div>
    </>
  ) :
  (
    <div className="flex flex-col items-center gap-4">
      <h1 className={`text-2xl font-semibold ${theme}`}>No todos found</h1>
      <img className="w-full h-full" src={theme === "light" ? "/assets/detective-light.svg" : "/assets/detective-dark.svg"} alt="empty" />
    </div>
  )
}