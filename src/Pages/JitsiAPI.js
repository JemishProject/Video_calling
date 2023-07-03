import React, { useEffect } from 'react'
import { useCallback } from 'react';

const JitsiAPI = () => {
    const domain = "meet.jit.si";
    let api = {};
  
    // THIS IS TO EXTRACT THE NAME WHICH WAS FILLED IN THE FIRST PAGE
    const name ="mittal"
  
    // INTIALISE THE MEET WITH THIS FUNCTION
    const startMeet = useCallback(() => {
      const options = {
        roomName:1,
        width: "100%",
        height: 500,
        configOverwrite: { prejoinPageEnabled: false },
        interfaceConfigOverwrite: {
          // overwrite interface properties if you want
        },
        // VIDEO FRAME WILL BE ADDED HERE
        parentNode: document.querySelector("#jitsi-iframe"),
        userInfo: {
          displayName: name,
        },
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      api = new window.JitsiMeetExternalAPI(domain, options);
  
      api.addEventListeners({
        readyToClose: handleClose,
        participantLeft: handleParticipantLeft,
        participantJoined: handleParticipantJoined,
        videoConferenceJoined: handleVideoConferenceJoined,
        videoConferenceLeft: handleVideoConferenceLeft,
      });
    }, [api]);
  
    useEffect(() => {
      if (window.JitsiMeetExternalAPI) {
        startMeet();
      } else {
        alert("JitsiMeetExternalAPI not loaded");
      }
    }, [startMeet]);
  
    // ALL OUR HANDLERS
    const handleClose = () => {
      console.log("handleClose");
    };
  
    const handleParticipantLeft = async (participant) => {
      console.log("handleParticipantLeft", participant);
      await getParticipants();
    };
  
    const handleParticipantJoined = async (participant) => {
      console.log("handleParticipantJoined", participant);
      await getParticipants();
    };
  
    const handleVideoConferenceJoined = async (participant) => {
      console.log("handleVideoConferenceJoined", participant);
      await getParticipants();
    };
  
    const handleVideoConferenceLeft = () => {
      console.log("handleVideoConferenceLeft");
    };
  
    // GETTING ALL PARTICIPANTS
    const getParticipants = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(api.getParticipantsInfo());
        }, 500);
      });
    };
  return (
    <React.Fragment>
    <div
      style={{
        backgroundColor: "rgb(10, 25, 41)",
        color: "white",
        textAlign: "center",
      }}
    >
      <p style={{ margin: 0, padding: 10 }}>Meeting name</p>
    </div>
    <div id="jitsi-iframe" style={{ marginBottom: 0 }}></div>
  </React.Fragment>
  )
}

export default JitsiAPI


T