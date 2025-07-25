
const ConfirmMessage = () => {
  return (
    <div className='fixed w-full h-full bg-black/20 flex justify-center items-center z-20 animate-fade-in'>
      <div className="bg-white px-7 py-14 w-[300px] md:w-[600px] min-h-[200px] relative rounded-xl">
        <h2 className="text-center text-xl font-semibold">Confirm Reservation</h2>

        <button className="w-full p-5 bg-[#e77008] hover:bg-[#02717e] transition-all duration-300 text-white">Confirm</button>
      </div>
    </div>
  )
}

export default ConfirmMessage