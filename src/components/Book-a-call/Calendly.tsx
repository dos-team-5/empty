'use client';

import { InlineWidget } from 'react-calendly';

const Calendly = () => {
  return (
    <div className="mt-20 w-full">
      <InlineWidget
        styles={{ height: '1100px' }}
        url="https://calendly.com/wwalsh-emptyad/30min"
      />
    </div>
  );
};

export default Calendly;
