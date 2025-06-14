import { v4 as uuidv4 } from 'uuid';



export default function reducer(currentTodos, action) {

    switch(action.type) {

        case "added" : {

            const newTodo = {
    
                id: uuidv4(),
                title: action.payload.title,
                details: "",
                isComplete: false
            }

            const addedTodos = [...currentTodos, newTodo]
            localStorage.setItem("Todo", JSON.stringify(addedTodos))
            
            return addedTodos
        }

        case "deleted" : {

            const deletedTodos = currentTodos.filter((todo) => {

                return todo.id != action.payload.id
            })

            localStorage.setItem("Todo", JSON.stringify(deletedTodos))
            
            return deletedTodos
        }

        case "updated" : {

            const updatedTodos = currentTodos.map((todo) => {

                if (todo.id == action.payload.id) {

                    return {...todo, title: action.payload.title, details: action.payload.details}
                
                } else {

                    return todo
                }
            })
            
            localStorage.setItem("Todo", JSON.stringify(updatedTodos))
            
            return updatedTodos
        }

        case "read" : {

            const storageTodos = JSON.parse(localStorage.getItem("Todo")) ?? []
            return storageTodos
        }

        case "toggleCompleted" : {

            const checkedTodos = currentTodos.map((todo) => {

                if (todo.id == action.payload.id) {

                    const checkedTodo = {...todo, isCompleted: !todo.isCompleted}
                    return checkedTodo
                }

                return todo
            })

            localStorage.setItem("Todo", JSON.stringify(checkedTodos))
            
            return checkedTodos
        }

        default: {

            throw Error("Unknown Action " + action.type)
        }
    }

    return []
}