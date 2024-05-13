import React, { Dispatch, SetStateAction } from "react"

export interface Todo{
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface ListProps {
  searchedTodos: Todo[];
  filteredTodos: Todo[];
}

export interface GlobalState {
  theme: "light" | "dark";
}

export interface SearchProps {
  setSearchedTodos: Dispatch<SetStateAction<Todo[]>>;
}


export interface FilterProps {
  setFilteredTodos: Dispatch<SetStateAction<Todo[]>>;
}

export interface EditProps {
  id: number;
}

export interface DeleteProps {
  id: number;
}

export interface TodoFormModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  handleAction: () => void;
  children: React.ReactNode;
  id?: number;
}