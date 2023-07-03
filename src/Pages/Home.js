
import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import UsersListing from '../Components/UsersListing';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [groupName, setGroupName] = useState("")
  const [users, setUsers] = useState();
  const [userName, setUserName] = useState("")
  const navigate = useNavigate()
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    async function fetchData() {
      axios.get('http://localhost:5000/user/getAllUser').then((response) => {
        const filterList = response.data.filter((item) => {
          return item.email != JSON.parse(localStorage.getItem('userData')).email
        })
        setUsers(filterList)
      }).catch((error) => {
        console.log('error', error)
      })
    }
    fetchData()
  }, [])

  // generate id for jitsi route
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  function generateString(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.trim();
  }
  
  useEffect(() => {
    const aa = generateString(7)
    // console.log('aa', aa)
  }, [])

  const getInitials = (name) => {
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
  const handleChange = (e) => {
    setGroupName(e.target.value)
  }
  const gotoRoom = (id, item) => {
    navigate(`/room/${id}`)
  }
  const logout = () => {
    localStorage.removeItem('userData')
    navigate('/login')
  }

  useEffect(() => {
    const loginUserData = JSON.parse(localStorage.getItem('userData'));
    setUserName(loginUserData.firstname + " " + loginUserData.lastname);
  }, [])
  return (
    <>
      <div className='bg-blue text-white h-16 flex justify-between'>
        <span className='p-4 flex my-auto text-lg'>Video Boat</span>
        <Button onClick={logout} className='bg-blue p-2 text-white mr-3'>Logout</Button>
      </div>
      <h1 className='text-lg my-3 mx-2'>Welcome to ChatBoat {userName}</h1>
      {isOpen && <div className="backdrop"></div>}
      <div className='grid grid-flow-col gap-3 relative'>
        {isOpen &&
          <Dialog open={isOpen} handler={handleOpen}>
            <DialogHeader>Create Group</DialogHeader>
            <DialogBody divider>
              <p>Enter Group Name</p>
              <Input label="groupName" name='groupName' value={groupName} onChange={(e) => handleChange(e)} />
              <p>Choose Participants</p>
              <Checkbox id="ripple-on" label="Ripple Effect On" ripple={true} />
              <div className='h-[300px] overflow-y-scroll overflow-x-hidden'>
                <UsersListing />
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button onClick={handleOpen}>
                <span className='text-deep-purple-400'>Create</span>
              </Button>
            </DialogFooter>
          </Dialog>
        }
        <div className='col-span-3 shadow-lg'>
          <div className='m-1'>
            {/* <UsersListing /> */}
            {users?.map((item, index) => {
              return (
                <div className='h-16 flex-col shadow-lg' key={index} onClick={() => gotoRoom(index, item)} >
                  <div className="flex gap-5 p-2">
                    <div
                      className="w-10 h-10 rounded-full p-2 bg-deep-purple-300"
                    >
                      <span className='flex justify-center'>
                        {getInitials(item.firstname + item.lastname)}
                      </span>
                    </div>
                    <span className="text-start capitalize"
                    >{item.firstname + " " + item.lastname}
                      <br />
                      <span>{item.preferredLanguage}</span>
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='col-span-9'>
          <div className='flex justify-end pt-4 pr-3'>
            <Button className='bg-blue p-2 text-white' onClick={handleOpen}> Create Group</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home