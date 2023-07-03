import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { FetchApiFromUrl } from '../Hooks/FetchApiFromUrl'

const UsersListing = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        async function fetchData() {
            axios.get('http://localhost:5000/user/getAllUser').then((response) => {
                setUsers(response.data)
            }).catch((error) => {
                console.log('error', error)
            })
        }
        fetchData()
    }, [])

    const getInitials = (name) => {
        // const names = name?.split(" ");
        const names = name
        let initials = "";
        if (names && names.length > 0) {
            for (let i = 0; i < names.length; i++) {
                initials += names[i].charAt(0).toUpperCase();

                // Break the loop if initials length reaches 2
                if (initials.length >= 2) {
                    break;
                }
            }
        }
        return initials;
    }
    return (
        <>
            {users?.map((item, index) => {
                return (
                    <div className='h-16 flex-col shadow-lg' key={index} >
                        <div className="flex gap-5 p-2">
                            <div
                                className="w-10 h-10 rounded-full p-2 bg-deep-purple-300"
                            >
                                <span className='flex justify-center'>
                                    {getInitials(item.firstname + item.lastname)}
                                </span>
                            </div>
                            <span className="text-start"
                            >{item.firstname + " " + item.lastname}
                                <br />
                                <span className="">{item.preferredLanguage}</span>
                            </span>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default UsersListing