import React, { useEffect, Fragment } from 'react'
import ZoomVideo from '@zoom/videosdk'

const Meeting = () => {
    const client = ZoomVideo.createClient()
    client.init('en-US', `CDN`)
    const payload = {
        meetingNumber: 88415528976,
        role: 0,
        sdkKey: "0RMUjG4SFSXyaPr7JluJA",
        sdkSecret: "GrhBfWi2G29gKn0iXcgp3ZmlwiF0g4Hg",
        passWord: "fau9VQ",
        userName: "Testing",
        userEmail: "wrt.mital@gmail.com",
        leaveUrl: "http://localhost:5000"
    }
    useEffect(() => {

        const GernerateMeeting = async () => {
            const { ZoomMtg } = await import('@zoomus/websdk');
            ZoomMtg.setZoomJSLib('http://source.zoom.us/lib', '/av');
            ZoomMtg.preLoadWasm()
            ZoomMtg.prepareWebSDK()

            ZoomMtg.generateSDKSignature({
                meetingNumber: payload.meetingNumber,
                role: payload.role,
                sdkKey: payload.sdkKey,
                sdkSecret: payload.sdkSecret,
                success: function (signature) {
                    ZoomMtg.init({
                        leaveUrl: payload.leaveUrl,
                        success: function (data) {
                            ZoomMtg.join({
                                meetingNumber: payload.meetingNumber,
                                signature: signature.result,
                                userName: payload.userName,
                                userEmail: payload.userEmail,
                                tk: '',
                                success: function () {
                                    console.log("joined---------------")
                                },
                                error: function (error) {
                                    console.log("error----------", error)
                                }
                            })
                        },
                        error: function (error) {
                            console.log("error----", error)
                        }
                    })
                },
                error: function (error) {
                    console.log("error-----", error)
                }
            })
        }
        GernerateMeeting()
    })
    const topic = "Meeting"
    const token = "GrhBfWi2G29gKn0iXcgp3ZmlwiF0g4Hg"
    const userName = "Testing"
    const password = "fau9VQ"
    useEffect(() => {
        const joinMeeting = async () => {
            client.join(topic, token, userName, password).then(() => {
                const stream = client.getMediaStream()
                console.log('stream-----', stream)
            }).catch((error) => {
                console.log("error-------------------", error)
            })

        }
        joinMeeting()
    }, [])
    return (
        <Fragment></Fragment>
    )
}

export default Meeting