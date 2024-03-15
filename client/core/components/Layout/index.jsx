import Link from "next/link"

const Layout = ({ children }) => {
    return (
        <div className='max-w-7xl mx-auto'>
            <div className=" border-b py-5">
                <div className="p-5 text-center">
                    <Link href='/' className="text-2xl font-bold">THE BOOKMARK</Link>
                </div>
            </div>
            {children}
        </div>

    )
}

export default Layout