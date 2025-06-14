import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import TodoList from './Components/TodoList';
import { useState } from "react";
import { TodosContext } from './Context/TodosContext';
import { SnackBarProvider } from './Context/SnackBarContext';
import TodosProvider from './Context/TodosContext';


const theme = createTheme({

  typography: {

    fontFamily: ["Alexandria"],
  },

  palette: {

    primary: {

      main: "#dd2c00",
    },
  },
})

function App() {

  const [todos, setTodos] = useState([])

  return (
    
    <ThemeProvider theme={theme}>

      <TodosProvider>

        <SnackBarProvider>

          <div className="App">

            <TodoList />
          </div>

        </SnackBarProvider>

      </TodosProvider>
      
    </ThemeProvider>
  )
}

export default App;