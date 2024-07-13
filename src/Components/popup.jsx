const CustomPopup = (props)=>(
    <div className="popup">
        <div className='flex flex-col align-items-start max-w-sm border p-4 rounded-lg bg-green-100 popup-innter-container'>
            <h1 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">{props.title}</h1>
            
            {props.children}

                <div className="p-1 pt-2">
                <button
                variant='outlined'
                className='py-2 mr-2 col-span-2 md:col-span-1 px-5 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75'
                onClick={props.onClose}
                >
                    Cancel
                    </button>
                   {
                   props.showOkButton &&
                   <button
                    variant='outlined'
                    className='py-2 col-span-2 md:col-span-1 px-5 bg-violet-500 text-white font-semibold rounded-lg shadow-md hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75'
                    onClick={props.onSuccess}
                    >
                        {props.title}
                    </button>
                    }
            </div>
                </div>

            
    </div>
    )

export default CustomPopup;