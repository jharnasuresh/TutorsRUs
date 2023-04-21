import ReactPlayer from 'react-player';
import React, { useRef } from 'react';
const VIDEO_PATH = 'https://youtu.be/0BIaDVnYp2A';
function PlayerComponent() {
   const playerRef = useRef(null);
   return (
      <div style={{textAlign: "center", marginTop: "100px"}} >
         <ReactPlayer style={{textAlign: "center", marginLeft: "400px"}} ref={playerRef} url={'https://youtu.be/tE0HUBlZiEk'} controls={true} />
         <h2>Register</h2>
         <ReactPlayer style={{textAlign: "center", marginLeft: "400px"}} ref={playerRef} url={'https://youtu.be/XHT4eLVpdA8'} controls={true} />
         <h2>Searching for Discussion Board</h2>
         <ReactPlayer  style={{textAlign: "center", marginLeft: "400px"}} ref={playerRef} url={'  https://youtu.be/tnkLJ0JpGVE'} controls={true} />
         <h2>Scheduling with Group!</h2>
         <ReactPlayer  style={{textAlign: "center", marginLeft: "400px"}} ref={playerRef} url={'https://youtu.be/eeb1UNIADI0'} controls={true} />
         <h2>Scheduling with Tutor!</h2>

      </div>
   )
};
export default PlayerComponent;