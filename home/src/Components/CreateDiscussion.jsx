import React, {useState} from "react"
import './CreateDiscussion.css'
import { useLocation, Link, useNavigate } from "react-router-dom";

export const CreateDiscussion = ({GlobalState}) => {
    const [name, setName] = useState('');
    const [className, setClassName] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { currUser, setCurrUser } = GlobalState;
    setCurrUser(location.state.u)
    return (
        <div class="App">
        <div classNames = "CreateDiscussion App">
                <form className="createDisc" /*onSubmit={handleSubmit}*/ style={{alignContent: 'center'}}>
                        <h2 div="h2">Create a New Discussion Board!</h2>
                        <label htmlFor="name">Discussion Board Name: </label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Enter Your Name:" id="name" name="name" />
                 
                        <label htmlFor="className">Class Name: </label>
                        <input value={className} onChange={(e) => setClassName(e.target.value)} type="className" placeholder="Enter Your Class Name" id="clasName" name="className" />
                        <button type="submit" className="createdisc-sub" /*onSubmit={handleSubmit}*/>Submit Changes</button>
                </form>
        </div>
        </div>
    )
}
export default CreateDiscussion