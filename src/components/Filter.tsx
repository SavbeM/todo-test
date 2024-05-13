import { useEffect, useRef, useState } from "react"
import { useAppSelector, useFilter } from "../app/hooks"
import type { FilterProps } from "../types/todo"


export const Filter = ({setFilteredTodos} : FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState<"all" | "completed" | "uncompleted">("all");
  const theme = useAppSelector(state => state.global.theme);
  const shadow = theme === 'light' ? 'shadow-light' : 'shadow-dark';
  const filter = useFilter(option);
  const node = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (node.current && !node.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log(filter);
    setFilteredTodos(filter);
  },[option, filter]);

  return (
    <div ref={node} className="w-24">
      <button className={`flex justify-between items-center w-28 p-[6px] font-kanit-medium rounded text-white bg-purple text-[15px] hover:bg-dark-purple ${theme} ${shadow} ${isOpen ? "bg-dark-purple border-[2px] border-purple" : "border-[2px] border-purple"} `} onClick={() => setIsOpen(!isOpen)}>
        {option === "all" ? "All" : option === "completed" ? "Completed" : "Uncompleted"}
        {isOpen ? <img className="h-2 w-2  inline-block transform translate-y-1/4 " src="/assets/arrow-top.svg" alt="arrow-up" /> : <img className="h-2 w-2 inline-block transform translate-y-1/4" src="/assets/arrow-down.svg" alt="arrow-down" />}
      </button>
      {isOpen && (
        <div className="absolute w-28 rounded bg-white border-2 border-purple">
          <button className="w-full text-center text-purple font-kanit-regular hover:bg-purple/20" onClick={() => setOption("all")}>All</button>
          <button className="w-full text-center text-purple font-kanit-regular hover:bg-purple/20" onClick={() => setOption("completed")}>Completed</button>
          <button className="w-full text-center text-purple font-kanit-regular hover:bg-purple/20" onClick={() => setOption("uncompleted")}>Uncompleted</button>
        </div>
      )}
    </div>
  );
};