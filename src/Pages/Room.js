import React, { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

const Room = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const data = JSON.parse(localStorage?.getItem('userData'));
    const USER_ID = JSON.parse(localStorage?.getItem('userData'))?._id;
    const USER_NAME = data?.firstname + " " + data?.lastname;
    const zpRef = useRef(null);
    const elementRef = useRef(null);

    useEffect(() => {
        const myMeeting = async () => {
            const APPID = 339704119;
            const SERVER_SECRET = '374d52dac581ed25bd8fd140a94604d1';
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                APPID,
                SERVER_SECRET,
                id,
                USER_ID,
                USER_NAME
            );
            const zp = ZegoUIKitPrebuilt.create(kitToken);
            zpRef.current = zp; // Store the Zego meeting object in the ref

            zp.joinRoom({
                container: elementRef.current,
                scenario: {
                    mode: ZegoUIKitPrebuilt.VideoConference
                },
                onLeaveRoom: () => {
                    // Stop the meeting when the user leaves the room
                    zp.destroy();
                    navigate('/home');
                },
                showPreJoinView: true,
                showRoomTimer: true,
                showRemoveUserButton: true,
                onUserJoin: users => {
                    console.log('users----------------', users)
                },
                showRemovehostButton: true
            });
        };

        myMeeting();

        return () => {
            if (zpRef.current) {
                    zpRef.current.destroy();
            }
        };
    }, [id, USER_ID, USER_NAME, navigate]);
    return (
        <div ref={elementRef} className='h-auto w-[100%]'></div>
    )
}

export default Room