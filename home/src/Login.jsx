import React, {useState} from "react"
export const Login = () => {
    const [user, setUsername] = useState('');
    const [pass, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
    }
    return (
        <form onSubmit={handleSubmit}>
            <label for="username:">username</label>
            <input value={user} onChange={(e) => setUsername(e.target.value)}type="username" placeholder="enter your username" id="username" name="username"/>
            <label for="password:">password</label>
            <input value={pass} onChange={(e) => setPassword(e.target.value)}type="password" placeholder="enter your password" id="password" name="password"/>
            <button>Log In</button>
        </form>
    )
}