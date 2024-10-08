import React, { useState } from "react";
import InputField from "../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import store, { AppDispatch } from "../services/store";
import { userLogin } from "../services/authActions";
import { useNavigate } from "react-router-dom";
export default function Login(this: any, props: any) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch<AppDispatch>();
    const { userToken, loading } = useSelector((state: ReturnType<typeof store.getState>) => state.auth);
    const navigate = useNavigate();
    if (userToken) {
        navigate('/')
    }

    const [fieldError, setFieldError] = useState(false)

    const checkIfAnyEmpty = () => (email.length === 0 || password.length === 0)

    return (
        <div className="h-screen w-screen font-mont flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")` }}>
            <div className="bg-white/20 backdrop-blur-sm px-8 py-12 w-1/4 space-y-6 rounded-xl shadow-md">
                {loading ? <h1 className="text-3xl text-primary font-semibold mb-4">Loading</h1> :
                    <div className="">
                        <h1 className="text-3xl text-primary font-semibold mb-4">Login</h1>
                        <InputField label="Email Address" type="email" placeholder="johndoe@gmail.com" onChange={(e: any) => setEmail(e.target.value)} />
                        <div className="my-4"></div>
                        <InputField label="Password" type="password" placeholder="" onChange={(e: any) => setPassword(e.target.value)} />
                        {
                            fieldError ? <div className="flex text-xxl font-bold text-primary items-center justify-center">
                                Error: Fields cannot be empty
                            </div> : <div className=""></div>
                        }
                        <button className=" mt-4 w-2/3  hover:shadow  duration-300 hover:scale-[102%] text-primary rounded-full font-medium py-2 bg-white/20 backdrop-blur-sm" onClick={async (e) => {
                            e.preventDefault()
                            if (!checkIfAnyEmpty()) {
                                await dispatch(userLogin({ email: 'eve.holt@reqres.in', password: 'random' }))
                                navigate('/')
                            } else {
                                setFieldError(checkIfAnyEmpty())
                            }
                        }}>Login</button>
                    </div>
                }
            </div>
        </div>
    );
}