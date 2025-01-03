import { useEffect } from "react";
import { Container } from "../components";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { getcurrentUser } from "../services/userService";

export function Home () {
    const dispatch = useDispatch()
    useEffect(() => {
        getcurrentUser()
        .then((res) => {
            if(res.data){
                const {
                    username, 
                    fullname, 
                    email, 
                    _id, 
                    coverImage, 
                    avatar, 
                    createdAt, 
                    updateAt
                } = res.data.data
                dispatch(login({username, fullname, email, _id, coverImage, avatar, createdAt, updateAt}))
            }
        })
    },[])
    return (
        <Container>
            <h1 className="text-white text-3xl">Home</h1>
        </Container>
    )
}