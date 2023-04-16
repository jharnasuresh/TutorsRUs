import React from 'react';
import { InlineWidget } from 'react-calendly';

const InlineComponent = () => {
  return (
    <div className="inline-widget">
      <InlineWidget url="https://calendly.com/your-calendly-url" />
    </div>
  );
};

export default InlineComponent;
