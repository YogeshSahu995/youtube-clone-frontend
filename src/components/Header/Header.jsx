import { Input, Button, Logo, LogoutBtn } from "../index"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


export function Header () {
    const authstatus = useSelector(state => state.status)
    const userData = useSelector(state => state.data)
    const navigate = useNavigate()

    const buttons = [
        {
            name: 'LogIn',
            slug: '/login',
            status: !authstatus
        },
        {
            name: 'Register',
            slug: '/register',
            status: !authstatus
        },
    ]
    return (
        <header className="fixed top-0 left-0 z-[9999] w-full">
            <div className="absolute z-10 bg-[#222] flex flex-row justify-between items-center w-full md:px-2 lg:px-4 xl:px-5">
                <Logo />
                {authstatus && (
                    <>
                        <Input 
                            type="text" 
                            placeholder="Search..."
                            className="px-2 py-1 w-[150px] sm:w-[400px] min-[400px]:w-[250px] "
                        />
                    </>
                )}
                {!authstatus? (
                    <div className="w-max">
                        {buttons.map((but) => but.status ? (
                            <Button 
                                key={but.name}
                                value={but.name}
                                onClick = {(e) => navigate(but.slug) }
                                bgColor="bg-cyan-700"
                                className="mr-2 hover:bg-opacity-70"
                            />
                        ):null
                        )}
                    </div>
                ): 
                (<div className="w-max">
                    <LogoutBtn userData={userData} />
                </div>)
                }
            </div>
        </header>
    )
}