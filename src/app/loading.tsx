const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-8">
      <div className="relative">
        <div className="relative h-32 w-32">
          <div
            className="border-dimmed/10 border-r-primary border-b-primary absolute h-full w-full animate-spin rounded-full border-[3px]"
            style={{ animationDuration: '3s' }}
          ></div>

          <div
            className="border-dimmed/10 border-t-primary absolute h-full w-full animate-spin rounded-full border-[3px]"
            style={{ animationDuration: '2s', animationDirection: 'reverse' }}
          ></div>
        </div>

        <div className="from-primary/10 to-primary/5 absolute inset-0 animate-pulse rounded-full bg-gradient-to-tr via-transparent blur-sm"></div>
      </div>
      <div className="ml-8 text-center">
        <h1
          className="text-5xl font-bold"
          style={{ color: 'var(--color-primary)' }}
        >
          LOADING...
        </h1>
      </div>
    </div>
  );
};

export default Loading;
