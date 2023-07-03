import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ValidateForm from '../Components/ValidateFrom';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    console.log('data', process.env.SERVER_SECRET)
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (ValidateForm(formData, "login")) {
            if (formData.password) {
                axios.post('http://localhost:5000/user/login', formData).then((response) => {
                    localStorage.setItem("userData", JSON.stringify(response.data))
                    toast.success("User Login Successfully")
                    setTimeout(() => {
                        navigate('/home')
                    }, 2000)
                }).catch((error) => {
                    console.log('error', error)
                    toast.error(error.response?.data?.message)
                })
            } else {
                toast.error("There is some error in Login")
            }
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    return (
        <div>
            <ToastContainer />
            <div className='rounded-md shadow-lg w-[34%] m-auto my-28'>
                <form className='p-4' onSubmit={handleSubmit}>
                    <div className='p-5'>
                        <h1 className='text-lg text-center text-blue font-bold'>Login</h1>

                        <div className='pt-7 text-left'>
                            <h2 className=''>Email </h2>
                            <input type='email' className='p-3 shadow-lg w-full' name="email" value={formData.email} placeholder='Please Enter Email' onChange={handleChange} />
                        </div>
                        <div className='pt-7 text-left'>
                            <h2 className=''>Password </h2>
                            <input type='password' className='p-3 shadow-lg w-full' name="password" value={formData.password} placeholder='Please Enter Password' onChange={handleChange} />
                        </div>
                        <button className='bg-blue rounded-md mt-3 w-full h-12' type='submit'>
                            <span className='p-3 text-white'>Login</span>
                        </button>
                        <p className='flex justify-center p-2'>Don't have an Account ? {" "}<span className='cursor-pointer text-blue' onClick={() => { navigate('/signIn') }}> &nbsp; Create a Account</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login