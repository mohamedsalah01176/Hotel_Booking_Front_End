const Spinner = () => {
  return (
    <div
      className="inline-block h-8 w-8 animate-ping rounded-full bg-[#02717e] align-middle"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
