
const Loader = () => {
  return (
    <div className="flex items-center justify-center mr-2">
      <div
        className={`inline-block rounded-full border-4 border-t-transparent border-white animate-spin`}
        style={{ width: `${7 * 4}px`, height: `${7 * 4}px` }}
        role="status"
        aria-label="Loading"
      />
    </div>
  )
}

export default Loader