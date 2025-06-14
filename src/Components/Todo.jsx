import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Check from "@mui/icons-material/Check";
import ModeEditOutlined from "@mui/icons-material/ModeEditOutlined";

import { useTodosDispatch } from "../Context/TodosContext";

import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import { useSnackBar } from "../Context/SnackBarContext";


export default function Todo({todoo, showDelete, showUpdate}) {

    const disPatch = useTodosDispatch()

    const {showHideSnack} = useSnackBar()

    function handleCheckClicked () {

        disPatch({type: "toggleCompleted", payload: todoo})
        showHideSnack("تم الاضافة الى مكتمل بنجاح")
    }

    function handleDeleteClick() {

        showDelete(todoo)
    }

    function handleUpdateClick() {

        showUpdate(todoo)
    }

    return(

        <>

            <Card className="todoCard" sx={{minWidth: 275, background: "#283593", color: "white", marginTop: 3}}>

                <CardContent>

                    <Grid container spacing={2}>

                        <Grid size={8}>
                            
                            <Typography 
                                variant="h5" 
                                sx={{textAlign: "right", textDecoration: todoo.isCompleted ? "line-through" : "none"}}>{todoo.title}
                            </Typography>
                            <Typography variant="h6" sx={{textAlign: "right"}}>{todoo.details}</Typography>
                        </Grid>

                        <Grid size={4} display="flex" justifyContent="space-around" alignItems="center">
                            
                            <IconButton 
                                className="iconButton" aria-label="delete" onClick={() => {handleCheckClicked()}}
                                style={{color: todoo.isCompleted ? "white" : "#8bc34a", border: "solid #8bc34a 3px", 
                                background: todoo.isCompleted ? "#8bc34a" : "white"}}>

                                <Check />
                            </IconButton>

                            <IconButton className="iconButton" aria-label="delete" onClick={handleUpdateClick}
                                        style={{color: "#1769aa", background: "white", border: "solid #1769aa 3px"}}>

                                <ModeEditOutlined />
                            </IconButton>

                            <IconButton className="iconButton" aria-label="delete" onClick={handleDeleteClick} 
                                        style={{color: "#b23c17", background: "white", border: "solid #b23c17 3px"}}>

                                <DeleteOutlined />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>

    )
}