import { createContext, useContext, useState } from "react";
import SnackBar from "../Components/SnackBar";


const SnackBarContext = createContext({})

export const SnackBarProvider = ({children}) => {

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")

    function showHideSnack(message) {

        setOpen(true)
        setMessage(message)
        setTimeout(() => {

        setOpen(false)
        }, 2000)
    }

    return(

        <SnackBarContext.Provider value={{showHideSnack}}>
            
            <SnackBar open={open} message={message} />
            {children}
        </SnackBarContext.Provider>
    )
}

export const useSnackBar = () => {

    return useContext(SnackBarContext)
}