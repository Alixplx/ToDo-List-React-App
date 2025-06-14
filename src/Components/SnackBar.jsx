import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar'
import React, {useState} from "react";
import Stack from "@mui/material/Stack"
import MuiAlert from "@mui/material/Alert"

const Alert = React.forwardRef(function Alert(props, ref) {

    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function SnackBar({open, message}) {

    const action = (

        <React.Fragment>

            <Button color="secondary" size="small">Undo</Button>
            <IconButton size="small" aria-label="close" color="inherit"></IconButton>
        </React.Fragment>
    )

    return (

        <div>

            <Stack spacing={2} sx={{width: "100%"}}>

                <Snackbar open={open} autoHideDuration={4000} message="Message" action={action}>

                    <Alert severity="success" sx={{width: "100%"}}>{message}</Alert>
                </Snackbar>
            </Stack>
        </div>
    )
}