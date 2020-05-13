import React, {useState} from 'react';

export const LoginForm = props => {

    const [state, setState] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    return (<form id={'login-form'}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Username" value={state.username} onChange={handleChange}/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Password" value={state.password} onChange={handleChange}/>
        <button type="submit">Login</button>
    </form>)
};
