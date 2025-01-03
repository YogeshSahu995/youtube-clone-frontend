import {NavLink} from 'react-router-dom'
import { useSelector } from 'react-redux'

export function Sidebar () {
    const authStatus = useSelector(state => state.status)

    const listOfIcons = [
        { 
            element: <i className="ri-home-4-line"></i>, 
            slug: "/", 
            name: "Home" 
        },
        { 
            element: <i className="ri-image-add-line"></i>, 
            slug: "/create-post", 
            name: "Create Post" 
        },
        { 
            element: <i className="ri-video-add-line"></i>, 
            slug: "/add-video", 
            name: "Add Video" 
        },
        { 
            element: <i className="ri-play-list-add-line"></i>, 
            slug: "/create-playlist", 
            name: "Create Playlist" 
        },
        { 
            element: <i className="ri-user-follow-line"></i>, 
            slug: "/subscriptions", 
            name: "Subscriptions" 
        },
        { 
            element: <i className="ri-user-fill"></i>, 
            slug: `/feed/you`, 
            name: "You" 
        },
    ];
    return (
        <nav className={`${!authStatus && "hidden"} fixed z-[9999] bottom-0 md:top-[90px] h-fit w-[97%] md:h-[80vh] md:w-fit px-3  rounded-xl bg-[#222] md:bg-white md:bg-opacity-10`}>
            <ul className='md:h-full w-full list-none flex justify-around md:flex-col md:justify-around'>
                {listOfIcons.map((item) => (
                    <li key={item.name}>
                        <NavLink 
                            to={item.slug}
                            className={({isActive}) => 
                                ` text-lg ${isActive? "text-cyan-600": "text-gray-400"} text-xl font-semibold hover:text-cyan-700`
                            }>
                                <div className='flex'>
                                    {item.element}
                                    <p className='ml-1 hidden lg:block'>
                                        {item.name}
                                    </p>
                                </div>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}