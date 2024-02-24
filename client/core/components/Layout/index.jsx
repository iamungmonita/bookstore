


const Layout = ({ children }) => {
    return (
        <div className='max-w-7xl mx-auto'>
            <div className=" border-b py-5">
                <div className="p-5">
                    <h2 className="text-2xl font-bold text-center">THE BOOKMARK</h2>
                </div>
            </div>
            {children}
        </div>

    )
}

export default Layout