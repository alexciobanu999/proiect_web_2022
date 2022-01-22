import { useState, useEffect } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { post, get, put, remove } from '../Calls.js';
import { routePostUser, routeGetUser, routePutUser, routeDeleteUser } from '../ApiRoutes.js'
import { useNavigate } from 'react-router-dom';

export default function CreateAccountScreen() {

    const [user, setUser] = useState
        ({
            UserName: "",
            UserPassword: "",
            UserEmail: "",
            UserLastName: "",
            UserFirstName: "",
            UserBio: ""
        });

    const [postScreen, setPostScreen] = useState(false);

    const navigate = useNavigate();

    const onChangeUser = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const saveUser = async () => {
        let username = user.UserName;
        let obj = await get(routeGetUser, username);
        if (!obj) {
            await post(routePostUser, user);
            let obj2 = await get(routeGetUser, username);
            if (obj2)
                alert("User creat cu succes!");
        }
        else {
            alert("User deja existent!");
        }
    }

    const updateUser = async () => {
        await put(routePutUser, user.UserName, user);
        let obj = await get(routeGetUser, user.UserName);
        if (obj.UserEmail === user.UserEmail &&
            obj.UserLastName === user.UserLastName &&
            obj.UserFirstName === user.UserFirstName &&
            obj.UserBio === user.UserBio)
            alert("Modificat cu succes!");
    }

    useEffect(async () => {
        if (!(JSON.parse(sessionStorage.getItem('loggedIn')))) {
            setPostScreen(!postScreen);
            return;
        }

        let data = await get(routeGetUser, sessionStorage.getItem('loggedUser'));
        setUser(data);
    }, [])

    const cancelAction = () => {
        if (JSON.parse(sessionStorage.getItem('loggedIn'))) {
            navigate('/experiencesList')
        } else {
            navigate('/')
        }
    }

    const deleteUser = async (username) => {
        await remove(routeDeleteUser, username);
        alert("Contul a fost sters.");
        navigate('/');
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={4} sm={4}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="UserName"
                        name="UserName"
                        label="Introdu numele de utilizator dorit"
                        fullWidth
                        value={user.UserName}
                        onChange={e => onChangeUser(e)}
                        disabled={!postScreen}
                    />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <TextField

                        margin="dense"
                        id="UserPassword"
                        name="UserPassword"
                        label="Introdu parola dorita"
                        fullWidth
                        value={user.UserPassword}
                        onChange={e => onChangeUser(e)}
                        disabled={!postScreen}
                    />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <TextField

                        margin="dense"
                        id="UserEmail"
                        name="UserEmail"
                        label="Introdu email-ul"
                        fullWidth
                        value={user.UserEmail}
                        onChange={e => onChangeUser(e)}
                    />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <TextField

                        margin="dense"
                        id="UserLastName"
                        name="UserLastName"
                        label="Introdu numele de familie"
                        fullWidth
                        value={user.UserLastName}
                        onChange={e => onChangeUser(e)}
                    />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <TextField

                        margin="dense"
                        id="UserFirstName"
                        name="UserFirstName"
                        label="Introdu prenumele"
                        fullWidth
                        value={user.UserFirstName}
                        onChange={e => onChangeUser(e)}
                    />
                </Grid>
                <Grid item xs={4} sm={4}>
                    <TextField

                        margin="dense"
                        id="UserBio"
                        name="UserBio"
                        label="Introdu un scurt bio (optional)"
                        fullWidth
                        value={user.UserBio}
                        onChange={e => onChangeUser(e)}
                    />
                </Grid>

            </Grid>

            <Button color="primary" variant='outlined' startIcon={<CancelIcon />}
                onClick={cancelAction}
            >
                Cancel
            </Button>

            {
                !(JSON.parse(sessionStorage.getItem('loggedIn'))) &&
                <Button color="primary" variant='outlined' startIcon={<SaveIcon />}
                    onClick={saveUser}
                >
                    Save
                </Button>
            }
            <br />
            {JSON.parse(sessionStorage.getItem('loggedIn')) &&
                <Button color="primary" variant='outlined' startIcon={<SaveIcon />}
                    onClick={updateUser}>
                    Update
                </Button>
            }
            {JSON.parse(sessionStorage.getItem('loggedIn')) &&
                <Button color="primary" variant='outlined' startIcon={<CancelIcon />}
                    onClick={() => deleteUser(user.UserName)} >
                    Delete
                </Button>
            }

        </div>
    )
}