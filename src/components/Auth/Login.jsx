import { Input, FormStyle, Button, Error } from "../index"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../store/authSlice"
import { loginUser, getcurrentUser } from "../../services/userService"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { errorHandler } from "../../utils/errorHandler"

export function Login(){
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const dataSubmit = async(data) => {
        const controller = new AbortController()
        const signal = controller.signal
        setLoading(true)
        setError("")
            try {
                const response = await loginUser(data)
                if(response.data){
                    const userData = await getcurrentUser(signal)
                    if(userData) {
                        const {username, fullname, email, _id} = userData.data.data
                        dispatch(login({username, fullname, email, _id}))
                        navigate('/')
                    }
                }
                else{
                    const errorMsg = errorHandler(response)
                    setError(errorMsg)
                }
            } catch (error) {
                setError(error.message)
            }
            finally{
                setLoading(false)
            }
            return () => controller.abort()
        }


    return (
        <FormStyle heading="Sign In">
            {error && <Error message={error} />}
            <form onSubmit={handleSubmit(dataSubmit)}>
                <Input 
                    label="Email"
                    type = "email"
                    placeholder="enter your email.."
                    outline = "outline-none"
                    {...register("email",{
                        required: true,
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invailed Email Address"
                        }
                    })}
                />

                <Input 
                    type="password"
                    label="Password..."
                    outline = "outline-none"
                    placeholder = "Enter Password"
                    {...register("password",{
                        required: true,

                    })}
                />

                <Button 
                    value={loading? "Sign In..." : "Sign In"}
                    type="submit"
                    bgColor = {loading? "bg-cyan-900" : "bg-cyan-700"}
                    className="mr-2 mt-2"
                />
            </form>
            <p className="font-semibold text-blue-100 mt-2">
                Don't have an account ?  
                <Link to='/register' className="text-[#10e3ff] ">
                    _Create Account_
                </Link>
            </p>

        </FormStyle>
    )
}