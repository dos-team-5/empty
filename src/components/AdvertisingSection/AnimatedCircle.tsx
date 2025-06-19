const AnimatedCircle = () => {
  return (
    <div className="mx-auto flex items-center">
      <svg
        width="1645"
        height="1645"
        viewBox="0 0 1645 1645"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto mt-[15%] h-full !w-dvw"
      >
        <circle
          cx="822.5"
          cy="822.5"
          r="819.5"
          stroke="url(#paint0_linear_519_647)"
          strokeWidth="6"
        />
        <circle
          cx="822.5"
          cy="822.5"
          r="800"
          strokeWidth="6"
          fill="url(#paint1_linear_519_647)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_519_647"
            x1="-116.5"
            y1="875.5"
            x2="1944"
            y2="420.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF83D5" />
            <stop offset="0.243682" stopColor="#D081D0" />
            <stop offset="0.522896" stopColor="#9A7FCB" />
            <stop offset="0.561584" stopColor="#F700DA" />
            <stop offset="0.72578" stopColor="#F700DA" />
          </linearGradient>
            <linearGradient
            id="paint1_linear_519_647"
            x1="822.5"
            y1="22.5"
            x2="822.5"
            y2="1622.5"
            gradientUnits="userSpaceOnUse"
            >
            <stop offset="0" stopColor="var(--mantine-primary-color-0)" stopOpacity="0.2" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default AnimatedCircle;
