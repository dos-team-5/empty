const Loading = () => {
  return (
    <div className="flex h-[88dvh] flex-col">
      <div className="flex flex-grow items-center justify-center">
        <div className="text-center">
          <h1
            className="mb-2 text-6xl font-bold"
            style={{ color: 'var(--color-text)' }}
          >
            LOADING...
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Loading;
