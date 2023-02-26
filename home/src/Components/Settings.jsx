import React, {useState} from "react"
import  './Main.css'
import About from './About';

export const Settings = (props) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
    }

    return (
      <div className="App Profile">
        <h2> Edit Profile </h2>
        <form className = "settings-name" onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input value={name} onChange={(e) => setName(e.target.value)}type="name" placeholder="Enter Your Full Name" id="name" name="name"/>
        </form>

        <form className = "settings-username" onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input value={username} onChange={(e) => setUsername(e.target.value)}type="username" placeholder="Username" id="username" name="username"/>
        </form>

        <form className = "settings-password" onSubmit={handleSubmit}>
            <label htmlFor="password">Password: </label>
            <input value={password} onChange={(e) => setPassword(e.target.value)}type="password" placeholder="Password" id="password" name="password"/>
        </form>

        <form className = "settings-email" onSubmit={handleSubmit}>
            <label htmlFor="email">Email: </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="Email Address" id="email" name="email"/>
        </form>
        <button type = "submit" className = "setting-sub">Submit Changes</button>
        <button type = "submit" className="profile-btn" onClick={() => props.onFormSwitch('profile')}>Back to Profile</button>
        <button type = "submit" className = "deactivate-btn">Deactivate Account</button>
      </div>
    );
}

export default Settings;