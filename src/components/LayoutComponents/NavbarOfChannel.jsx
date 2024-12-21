import { Input } from "../index"
import { NavLink } from "react-router-dom"

export function NavbarOfChannel({channelNav, handleSearchChange, username, searchPath}){

    return(
        <div className="sticky top-[-1px] bg-[#222] border-b border-b-[#ffffffa7] z-[8888]">
            <ul className="flex justify-around items-center whitespace-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-[#444] scrollbar-track-transparent">
                {channelNav.map((item) => (
                    <NavLink
                        to={item.slug.replace(':username', username)} // replace :username to username
                        key={item.name}
                        className={({ isActive }) => (`${isActive ? "text-[#fff]" : "text-[#ffffff7d]"} hover:text-[#fff]`)}
                    >
                        <li
                            className="text-lg md:text-xl py-2 px-4"
                        >
                            {item.name}
                        </li>
                    </NavLink>
                ))}
                <li key="Search" className="min-w-[150px]">
                    <NavLink to={searchPath}>
                        <div className="flex px-2 py-3 text-lg text-blue-100">
                            <Input
                                type="search"
                                placeholder="Search videos"
                                outline="outline-none"
                                className="border-b-2 border-b-white px-2"
                                onInput = {(e) => handleSearchChange(e.target.value)}
                            />
                        </div>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}