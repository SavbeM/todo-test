// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "./store"
import { useEffect, useState } from "react"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const useSearch = (text: string) => {
  const todos = useAppSelector(state => state.todos);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  useEffect(() => {
    if(text === "") {
      setFilteredTodos(todos)
    }
    else{
      let newTodos = todos.filter(todo =>
        todo.title.toLowerCase().includes(text.toLowerCase()) ||
        todo.description.toLowerCase().includes(text.toLowerCase()))

      setFilteredTodos(newTodos);
    }

  }, [todos, text]);


  return filteredTodos;
}

export const useFilter = (filter: "all" | "completed" | "uncompleted") => {
  const todos = useAppSelector(state => state.todos);
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    let newTodos = todos.filter(todo =>
      filter === "all" ||
      (filter === "completed" && todo.completed) ||
      (filter === "uncompleted" && !todo.completed)
    );
    setFilteredTodos(newTodos);

  }, [todos, filter])

  return filteredTodos;
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{width: number, height: number}>({width: window.innerWidth, height: window.innerHeight});

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({width: window.innerWidth, height: window.innerHeight});
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}