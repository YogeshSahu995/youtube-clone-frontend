import { Link } from "react-router-dom"

export function Protectedpage () {
    return (
        <div className="grid place-items-center h-[50vh] w-full">
            <div className="text-blue-100 h-fit text-center">
                <h1 className="text-6xl mb-3">Access Denied</h1>
                <p className="text-4xl mb-3">You must be logged in to access this page.</p>
                <p className="text-2xl">
                    <Link className="text-[#10e3ff]" to='/login'>
                        Login here
                    </Link> to continue.
                </p>
            </div>
        </div>
    )
}