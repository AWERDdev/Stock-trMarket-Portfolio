function INFOBar() {
    return (
        <div className="Context-container  min-w-[50px] mt-4 ml-[2rem] flex gap-[5rem] hover:bg-slate-700">

            <div className="names  min-w-[50px] flex gap-[5rem]">
                <div className="Symbol"><h1 className='text-gray-400'>Symbol</h1></div>
                <div className="Name"><h1 className='text-gray-400'>Name</h1></div>
            </div>
            <div className="changes  min-w-[50px] flex gap-[5rem] ml-[20rem]">
                <div className="Price"><h1 className='text-gray-400'>Price</h1></div>
                <div className="Change"><h1 className='text-gray-400'>Change</h1></div>
                <div className="Volume"><h1 className='text-gray-400'>Volume</h1></div>
            </div>
        </div>
    )
}

export default INFOBar
