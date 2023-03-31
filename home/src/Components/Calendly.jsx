import React from 'react';
import { PopupWidget } from 'react-calendly';

const PopupComponent = (user) => {
  return (
    <div className="popup-widget">
      <PopupWidget
        url="https://calendly.com/tutorsrus62" 
        rootElement={document.getElementById('root')}
        text="Schedule Tutoring Time!"
        textColor="#ffffff"
        color="#319795"
      />
    </div>
  );
};

export default PopupComponent;
