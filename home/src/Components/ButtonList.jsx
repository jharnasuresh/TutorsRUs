import React from 'react';
import { useNavigate } from 'react-router-dom';
const user = ""
var followingArr = []
var oldUser = ""
const Button = (props) => {
  const [color, setColors] = React.useState("");
  const [active, setActive] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmit = (props) => {
    console.log("clicked " + props)

    
    const headers = { "content-type": "application/json" };
        const requestData = JSON.stringify({ "username":  props});
    
        fetch('http://localhost:3001/info', { method: 'POST', body: requestData, headers: headers })
        .then((res) => res.json())
        .then((res) => {
          console.log(res["taking"].toString())
          var follows = false;
          console.log(res["u"] + " " + res["email"] )
          if ((followingArr).includes(res["u"])) {
            follows = true
            console.log("we do follow this person")
          }
          console.log("june this is follow check" + follows)
            navigate("/NotYourProfile", {
              
                state: {
                    oldU: oldUser,
                    u: res.u,
                    fname: res["fname"],
                    lname: res["lname"], 
                    email: res["email"], 
                    active: res["active"],
                    lang: res["lang"],
                    followers: res["followers"],
                    following: res["following"],
                    follows: follows,
                    taking: res["taking"],
                    tutor: res["tutor"],
                    price: res["price"]
                }
            });
        })
        

    
  }

  return (
    <div>
      <button
      onClick={() => handleSubmit(props.text)}>
      {props.text}
    </button>
    </div>
    
  );
};

function ButtonList(props) {
  const followers = props.followers;
  oldUser = props.oldUser
  followingArr = props.following
  const navigate = useNavigate();

  

  return (
    <div>
      {followers.map((followers) => (
        <Button key={followers} text={followers} />
      ))}
    </div>
  );
}

export default ButtonList;