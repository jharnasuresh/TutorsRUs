import ReactPlayer from 'react-player';
import React, { useRef } from 'react';
const VIDEO_PATH = 'https://youtu.be/0BIaDVnYp2A';
function PlayerComponent() {
   const playerRef = useRef(null);
   return (
      <div>
         <ReactPlayer ref={playerRef} url={'https://youtu.be/XHT4eLVpdA8'} controls={true} />
      </div>
   )
};
export default PlayerComponent;