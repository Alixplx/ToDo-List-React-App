import { createContext, useContext, useReducer } from "react";
import todosReducer from "../Reducers/TodoReducer";

export const TodosContext = createContext([])
export const DispatchContext = createContext(null)

const TodosProvider = ({children}) => {

    const [todos, disPatch] = useReducer(todosReducer, [])

    return (

        <TodosContext.Provider value={todos}>

            <DispatchContext.Provider value={disPatch}>

                {children}
            </DispatchContext.Provider>
        </TodosContext.Provider>
    )
}

export const useTodos = () => {

    return useContext(TodosContext)
}

export const useTodosDispatch = () => {

    return useContext(DispatchContext)
}

export default TodosProvider;
//export const TodosContext = createContext([])