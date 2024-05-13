import { useAppDispatch, useAppSelector } from "../app/hooks"
import { useState } from "react"
import { addTodo } from "../app/slices/todoSlice"
import { TodoFormModal } from "./TodoFormModal"

export const AddTodo = () => {
  const theme = useAppSelector(state => state.global.theme)
  const shadow = theme === "light" ? "shadow-light" : "shadow-dark"
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")

  const handleAddTodo = () => {
    if (!title || !title.trim()) return alert("Title is required")
    dispatch(addTodo({
      title,
      description
    }))
    setIsOpen(false)
  }


  return (
    <>
      <button onClick={() => setIsOpen(true)}
              className={`p-2 h-10 w-10 rounded-full bg-purple hover:bg-dark-purple ${shadow}`}>
        <img className="h-[24px] w-[24px] m-auto" src="/assets/add.svg" alt="add" />
      </button>
      <TodoFormModal isOpen={isOpen} setIsOpen={setIsOpen} title="Add TODO" handleAction={handleAddTodo}>
        <input defaultValue={title} onChange={(e) => setTitle(e.target.value)}
               className={`pl-8 w-full h-9 rounded ${theme} ${theme === "light" ? "focus:outline-none focus:ring-2 focus:ring-purple focus:ring-opacity-40 border border-purple" :
                 "focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 border border-white"}`}
               type="text" placeholder="Title" />
        <input onChange={(e) => setDescription(e.target.value)}
               className={`pl-8 w-full h-9 rounded ${theme} ${theme === "light" ? "focus:outline-none focus:ring-2 focus:ring-purple focus:ring-opacity-40 border border-purple" :
                 "focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 border border-white"}`}
               type="text" placeholder="Description" />
      </TodoFormModal>

    </>
  )
}