'use client';

import { InlineWidget } from 'react-calendly';

const Calendly = () => {
  return (
    <div className="w-full mt-20">
      <InlineWidget
        styles={{ height: '1100px' }}
        url="https://calendly.com/trixtent/30min"
      />
    </div>
  );
};

export default Calendly;
