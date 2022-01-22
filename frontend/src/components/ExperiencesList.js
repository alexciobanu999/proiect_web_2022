import { useState, useEffect } from 'react';
import { Grid, TextField, Button, Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton } from '@material-ui/core';
import { get, getExperiencesQuery, remove } from '../Calls.js';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { routeDeleteExperience, routeGetExperiences } from '../ApiRoutes.js'
import { useNavigate } from 'react-router-dom';

export default function ExperiencesListScreen() {

    const [rows, setRows] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false)
    const navigate = useNavigate();

    const [filterUserName, setfilterUserName] = useState
        ({
            UserName: "",

        });
    const onChangeUserFilter = e => {
        setfilterUserName({ ...filterUserName, [e.target.name]: e.target.value });
    }

    useEffect(async () => {
        let data = await get(routeGetExperiences);
        setRows(data);
    }, [needUpdate]);

    const deleteExperience = async (id, index) => {
        await remove(routeDeleteExperience, id);

        rows.splice(index, 1);
        setRows(rows);
        setNeedUpdate(!needUpdate);
    }

    const myAccount = () => {
        navigate('/myAccount');
    }

    const filterByUser = async () => {
        let data = await getExperiencesQuery(routeGetExperiences, filterUserName.UserName);
        setRows(data);
    }
    return (
        <div>
            {JSON.parse(sessionStorage.getItem('loggedIn')) &&
                <Button color="primary" variant='contained'
                    onClick={myAccount}>
                    Contul meu
                </Button>
            }
            {JSON.parse(sessionStorage.getItem('loggedIn')) &&
                <Button color="primary" variant='contained'
                    onClick={() => navigate("/")}>
                    LOG OUT
                </Button>
            }
            <Grid container spacing={3}>
                <Grid item xs={2} sm={2}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="UserName"
                        name="UserName"
                        label="Introdu userul pentru filtrare"
                        fullWidth
                        value={filterUserName.UserName}
                        onChange={e => onChangeUserFilter(e)}
                    />
                </Grid>
            </Grid>
            <Button color="primary" variant='contained'
                onClick={filterByUser}>
                FILTER by user
            </Button>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">User</TableCell>
                            <TableCell align="right">Plecare</TableCell>
                            <TableCell align="right">Sosire</TableCell>
                            <TableCell align="right">Mijloc de transport</TableCell>
                            <TableCell align="right">Durata (min)</TableCell>
                            <TableCell align="right">Ora</TableCell>
                            <TableCell align="right">Minute</TableCell>
                            <TableCell align="right">Grad aglomerare</TableCell>
                            <TableCell align="right">Grad satisfactie</TableCell>
                            <TableCell align="right">Observatii</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.ExperienceId}>
                                <TableCell component="th" scope="row">
                                    {row.ExperienceId}
                                </TableCell>
                                <TableCell align="right">{row.User.UserName}</TableCell>
                                <TableCell align="right">{row.ExperienceDeparture}</TableCell>
                                <TableCell align="right">{row.ExperienceArrival}</TableCell>
                                <TableCell align="right">{row.ExperienceVehicle}</TableCell>
                                <TableCell align="right">{row.ExperienceDurationMinutes}</TableCell>
                                <TableCell align="right">{row.ExperienceHour}</TableCell>
                                <TableCell align="right">{row.ExperienceMinutes}</TableCell>
                                <TableCell align="right">{row.ExperienceCongestion}</TableCell>
                                <TableCell align="right">{row.ExperienceSatisfaction}</TableCell>
                                <TableCell align="right">{row.ExperienceDetails}</TableCell>
                                <TableCell align="right">
                                    {(sessionStorage.getItem('loggedUser') === row.User.UserName) &&
                                        <IconButton onClick={() => { }}>
                                            <EditIcon color="primary" />
                                        </IconButton>
                                    }
                                    {//JSON.parse(sessionStorage.getItem('loggedIn')) &&
                                        (sessionStorage.getItem('loggedUser') === row.User.UserName) &&
                                        <IconButton onClick={() => deleteExperience(row.ExperienceId, index)}>
                                            <DeleteIcon color="secondary" />
                                        </IconButton>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div >
    )
}