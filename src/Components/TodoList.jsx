import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Dialog  from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

import Todo from "./Todo";
import { useEffect, useMemo, useState } from "react";
import { useTodos, useTodosDispatch } from "../Context/TodosContext";


import { useSnackBar } from "../Context/SnackBarContext";


export default function TodoList() {
    
    const todos = useTodos()
    const disPatch = useTodosDispatch()

    const {showHideSnack} = useSnackBar()

    const [dialogTodo, setDialogTodo] = useState(null)
    const [titleInput, setTitleInput] = useState("")
    const [displayTodoTyped, setDisplayTodoTyped] = useState("all")
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showUpdateDialog, setShowUpdateDialog] = useState(false)


    // Filteration Array
    const completedTodos = useMemo(() => {

        return todos.filter((todo) => {
            
            return todo.isCompleted
        })
    }, [todos])

    const nonCompletedTodos = useMemo(() => {

        return todos.filter((todo) => {

            return !todo.isCompleted
        })
    }, [todos])

    let todosToBeRendered = todos

    if (displayTodoTyped == "completed") {

        todosToBeRendered = completedTodos

    } else if (displayTodoTyped == "non-completed") {

        todosToBeRendered = nonCompletedTodos

    } else {

        todosToBeRendered = todos
    }

    function changeDisplayTyped(e) {

        setDisplayTodoTyped(e.target.value)
    }

    useEffect(() => {

        disPatch({type: "read"})

    },[])

    function handleAddClick() {

        disPatch({type: "added", payload: {title: titleInput}})
        setTitleInput("")
        showHideSnack("تم اضافة مهمة بنجاح")
    }

    function openDeleteDialog(todo) {
        
        setDialogTodo(todo)
        setShowDeleteDialog(true)
    }

    function openUpdateDialog(todo) {

        setDialogTodo(todo)
        setShowUpdateDialog(true)
    }

    function handleDeleteDialogClose() {

        setShowDeleteDialog(false)
    }

    function handleDeleteConfirm() {

        disPatch({type: "deleted", payload: dialogTodo})
        setShowDeleteDialog(false)
        showHideSnack("تم الحذف بنجاح")
    }

    function handleUpdateDialogClose() {

        setShowUpdateDialog(false)
    }

    function handleUpdateConfirm() {

        disPatch({type: "updated", payload: dialogTodo})
        setShowUpdateDialog(false)
        showHideSnack("تم التعديل بنجاح")
    }


    const getTodos = todosToBeRendered.map((todo) => {

        return <Todo key={todo.id} todoo={todo} showDelete={openDeleteDialog} showUpdate={openUpdateDialog} />
    })

    return(

        <>

            {/* Delete Dialog */}
            <Dialog open={showDeleteDialog} onClose={handleDeleteDialogClose} sx={{direction: "rtl"}}
                    aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            
                <DialogTitle id="alert-dialog-title">
            
                    هل انت متأكد من حذف هذه المهمة؟
                </DialogTitle>
            
                <DialogContent>
            
                    <DialogContentText id="alert-dialog-description">
            
                        لا يمكنك التراجع بعد حذف المهمة
                    </DialogContentText>
                </DialogContent>
            
                <DialogActions>
            
                    <Button autoFocus onClick={handleDeleteDialogClose}>اغلاق</Button>
                    <Button onClick={handleDeleteConfirm} style={{background: "red", color: "white"}}>حذف</Button>
                </DialogActions>
            
            </Dialog>

            {/* Update Dialog */}
            <Dialog open={showUpdateDialog} onClose={handleUpdateDialogClose} sx={{direction: "rtl"}}
                    aria-labelledby="alert-dialog-title" 
                    aria-describedby="alert-dialog-description">

                <DialogTitle id="alert-dialog-title">

                    هل تريد تعديل المهمة؟
                </DialogTitle>

                <DialogContent>

                   <TextField value={dialogTodo?.title} autoFocus margin="dense" 
                              onChange={(e) => {setDialogTodo({...dialogTodo, title: e.target.value})}}
                              id="titleTask" label="عنوان المهمة" fullWidth variant="standard" />
                   
                   <TextField value={dialogTodo?.details} autoFocus
                              onChange={(e) => {setDialogTodo({...dialogTodo, details: e.target.value})}} 
                              margin="dense" id="detailsTask" label="تفاصيل المهمة" fullWidth variant="standard" />
                </DialogContent>

                <DialogActions>

                    <Button autoFocus onClick={handleUpdateDialogClose}>اغلاق</Button>
                    <Button onClick={handleUpdateConfirm} style={{background: "blue", color: "white"}}>تعديل</Button>
                </DialogActions>

            </Dialog>


            <Container maxWidth="sm">

                <Card sx={{minWidth: 275, maxHeight: "80vh", overflowY: "scroll"}}>

                    <CardContent>

                        <Typography variant="h2" sx={{fontWeight: "bold"}}>المهام</Typography>
                        <Divider />

                        {/* Filter Buttons */}

                        <ToggleButtonGroup
                            value={displayTodoTyped}
                            onChange={changeDisplayTyped}
                            exclusive 
                            aria-label="text alignment" 
                            style={{direction: "ltr", marginTop: "30px"}}
                            color="primary">

                            <ToggleButton value="non-completed">غير مكتمل</ToggleButton>
                            <ToggleButton value="completed">مكتمل</ToggleButton>
                            <ToggleButton value="all">الكل</ToggleButton>
                        </ToggleButtonGroup>

                        {/* All Todo List */}

                        {getTodos}

                        {/* Input + Add Todo Button */}

                        <Grid container sx={{marginTop: "20px"}} spacing={2}>

                            <Grid size={8} display="flex" alignItems="center" justifyContent="center">

                                <TextField 
                                    sx={{width: "100%"}} id="outlined-basic" 
                                    label="عنوان المهمة" variant="outlined"
                                    value={titleInput} onChange={(e) => {setTitleInput(e.target.value)}} />
                            </Grid>

                            <Grid size={4} display="flex" alignItems="center" justifyContent="center">

                                <Button sx={{width: "100%", height: "100%"}} 
                                        onClick={handleAddClick} 
                                        variant="contained"
                                        disabled={titleInput.length == 0}>اضافة</Button>
                            </Grid>

                        </Grid>

                    </CardContent>
                </Card>
            </Container>
        </>
    )
}