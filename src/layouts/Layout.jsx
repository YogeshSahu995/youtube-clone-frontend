import { Header, Sidebar, Container, ScrollDiv } from "../components";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef } from "react";

export default function Layout (){
    const mainRef = useRef(null) // create ref for scrollbar div
    const authStatus = useSelector(state => state.status)
    return (
        <Container>
            <Header />
            <div className={`${authStatus && "grid grid-rows-custom  md:grid-cols-custom"} relative top-[80px]`}>

                {authStatus && (
                    <div className={`md:w-[50px] lg:w-[200px] z-20`}>
                        <Sidebar />
                    </div>
                )}
                <main className="overflow-x-hidden"> {/* its imp overflow-hidden */}
                    <ScrollDiv ref={mainRef}>
                        <Outlet context={{mainRef}} /> {/* pass ref to the outlet */}
                    </ScrollDiv>
                </main>
            </div>
        </Container>
    )
}