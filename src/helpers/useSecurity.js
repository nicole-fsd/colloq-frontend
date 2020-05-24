import { useState, useEffect } from 'react';
import axios from 'axios';
import JWT from 'jsonwebtoken'
export default () => {
    const [feedback, setFeedback] = useState("Please provide your registered username and password");
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const localToken = localStorage.getItem('token') || undefined
        //TODO: is token expired?
        if (localToken) {
            setToken(localToken)
            const decoded = JWT.decode(localToken, { complete: true })
            setUserId(parseInt(decoded.payload.security.userid))
            setIsLoggedIn(true)
        }
    }, [])

    const login = async (un, pw) => {
        try {
            const loginResponse = await axios.get(`https://ad3e84978530.eu.ngrok.io/api?action=login&username=${un}&password=${pw}`)
            const jwt = loginResponse.data.JWT;
            localStorage.setItem('token', jwt);
            const decoded = JWT.decode(jwt, { complete: true })
            setUserId(parseInt(decoded.payload.security.userid))
            setToken(jwt)
            setIsLoggedIn(true)
            // Router.push('/')
        } catch (error) {
            console.log(error)
            setFeedback("Wrong username or password provided")
        }
    }

    const logout = () => {
        try {
            localStorage.removeItem('token');
            Router.push('/')
        } catch (error) {
            console.log(error)
        }


    }
    return { isLoggedIn, token, login, feedback, logout, userId }
}