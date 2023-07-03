import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ValidateForm from '../Components/ValidateFrom';
import { Languages } from '../Components/Languages';
import { Select, Option } from "@material-tailwind/react";
import axios from 'axios';
const SignUpForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        preferredLanguage: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const navigate = useNavigate();
    const { Option } = Select;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ValidateForm(formData, "signIn")) {
            if (formData.password === formData.confirmPassword) {
                axios.post('http://localhost:5000/user/Register', formData).then((response) => {
                    if (response) {
                        toast.success(response.data.message)
                        toast.success("Please Login to continue...")
                        setTimeout(() => {
                            navigate('/login')
                        }, 2000)
                    } else {
                        toast.error(response.data.error)
                    }
                }).catch((error) => {
                    toast.error(error.response.data.message)
                })
            } else {
                toast.error('Both passwords are not the same');
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
    const handleLanguage = (selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            preferredLanguage: selectedOption
        }));
    };
    return (
        <div className='my-10'>
            <ToastContainer />
            <div className='rounded-md shadow-lg w-[34%] m-auto'>
                <form className='p-4' onSubmit={handleSubmit}>
                    <div className='p-5'>
                        <h1 className='text-lg text-center text-blue font-bold'>Create An Account</h1>
                        <div className='text-left pt-3'>
                            <h2>First Name </h2>
                            <input type='text' className='p-3 shadow-lg  w-full ' name="firstName" value={formData.firstName} placeholder='Please Enter First Name' onChange={handleChange} />
                        </div>
                        <div className='text-left pt-3'>
                            <h2>Last Name </h2>
                            <input type='text' className='p-3 shadow-lg w-full' name="lastName" value={formData.lastName} placeholder='Please Enter Last Name' onChange={handleChange} />
                        </div>
                        <div className='pt-3 text-left'>
                            <h2>Preferred Language </h2>
                            {/* <Select options={Languages} className='shadow-lg w-full'  name="preferredLanguage" value={Languages.find((lang) => lang.value === formData.preferredLanguage)} placeholder='Please Enter Preferred Language' onChange={handleLanguage}  /> */}
                            <Select className='shadow-lg w-full' onChange={handleLanguage} >
                                {Languages.map((item, index) => (
                                    <Option value={item.value} key={index}>
                                        {item.label}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div className='pt-3 text-left'>
                            <h2>Email </h2>
                            <input type='email' className='p-3 shadow-lg w-full' name="email" value={formData.email} placeholder='Please Enter Email' onChange={handleChange} />
                        </div>
                        <div className='pt-3 text-left'>
                            <h2>Password </h2>
                            <input type='password' className='p-3 shadow-lg w-full' name="password" value={formData.password} placeholder='Please Enter Password' onChange={handleChange} />
                        </div>
                        <div className='pt-3 text-left'>
                            <h2>Confirm Password </h2>
                            <input type='password' className='p-3 shadow-lg w-full' name="confirmPassword" value={formData.confirmPassword} placeholder='Please Enter Password Again' onChange={handleChange} />
                        </div>
                        <button className='bg-blue rounded-md mt-3 w-full h-12' type='submit'>
                            <span className='p-3 text-white'>Create a new account</span>
                        </button>
                        <p className='flex justify-center p-2'>Already have an Account ? {" "}<span className='cursor-pointer text-blue' onClick={() => { navigate('/login') }}> &nbsp; Login</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpForm