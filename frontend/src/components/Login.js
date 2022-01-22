import { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { get } from '../Calls.js';
import { routeGetUser } from '../ApiRoutes.js'
import { useNavigate } from 'react-router-dom';


export default function LoginScreen() {

    const [userDetails, setUserDetails] = useState(
        {
            UserName: "",
            UserPassword: ""
        }
    );

    const navigate = useNavigate();

    useEffect(async () => {
        sessionStorage.clear();
        sessionStorage.setItem("loggedIn", false);
    }, [])

    const onChangeUserDetails = e => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    }

    const tryLogin = async () => {
        let data = await get(routeGetUser, userDetails.UserName);
        if (!data) {
            alert("Nu s-a gasit userul in baza de date!");
        }
        else if (userDetails.UserPassword !== data.UserPassword) {
            alert("Parola gresita!");
        }
        else {
            sessionStorage.setItem("loggedIn", true);
            sessionStorage.setItem("loggedUser", userDetails.UserName);
            navigate('/experiencesList');
        }
    }

    const withoutLogin = () => {
        navigate('/experiencesList');
    }

    const createAccount = () => {
        navigate('/createAccount');
    }

    return (
        <div>
            <h1>Bun venit!</h1>
            <TextField
                autoFocus
                margin="normal"
                id="UserName"
                name="UserName"
                label="Introduceti username-ul"
                value={userDetails.UserName}
                onChange={e => onChangeUserDetails(e)}
            />
            <br />
            <TextField
                margin="normal"
                id="UserPassword"
                name="UserPassword"
                label="Introduceti parola"
                value={userDetails.UserPassword}
                onChange={e => onChangeUserDetails(e)}
            />
            <br />
            <Button color="primary" variant='contained'
                onClick={tryLogin}>
                Login
            </Button>

            <br />
            <Button color="primary" variant='text'
                onClick={withoutLogin}>
                Continue without Login
            </Button>
            <br /><br />
            <Button color="primary" variant='outlined'
                onClick={createAccount}>
                No account? Create one
            </Button>
        </div >
    )
}