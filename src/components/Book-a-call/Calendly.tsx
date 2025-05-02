'use client';

import { InlineWidget } from 'react-calendly';

const Calendly = () => {
  return (
    <div className="w-full">
      <InlineWidget
        styles={{ height: '1020px' }}
        url="https://calendly.com/trixtent/30min"
      />
    </div>
  );
};

export default Calendly;
