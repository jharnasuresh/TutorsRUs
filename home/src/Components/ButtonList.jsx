import React from 'react';
import { useNavigate } from 'react-router-dom';

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
          console.log(res["courses"].toString())
            navigate("/NotYourProfile", {
              
                state: {
                    u: res.u,
                    fname: res["fname"],
                    lname: res["lname"], 
                    email: res["email"], 
                    active: res["active"],
                    lang: res["lang"],
                    courses: res["courses"]
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
  const { followers } = props;
  console.log("button list followers " + followers)
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