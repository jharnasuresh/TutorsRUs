import React, { useState, useEffect } from 'react';

let gapi = window.gapi;
const API_KEY =  'AIzaSyDz4YskXpTe-Pslm1tyQv0_a1dc75-hkwA';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const CLIENT_ID = '535425680769-fg1rm6lf3dj5gp2csn0q4tne4uv5hsbp.apps.googleusercontent.com';
const SCOPES = "https://www.googleapis.com/auth/calendar.events";
var moment = require('moment');
export function initClient(callback) {
    gapi.load('client:auth2',()=>{
        try {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            }).then(function () {
                if (typeof(callback)==='function'){
                    callback(true)
                }
            }, function(error) {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    });
};
export const checkSignInStatus =async () =>{
    try {
        let status = await gapi.auth2.getAuthInstance().isSignedIn.get();
        return status;
    } catch (error) {
        console.log(error);
    }
}
export const signInToGoogle = async ()=>{
    try {
        console.log("pre-conse")
        let googleuser = await gapi.auth2.getAuthInstance().signIn({prompt:'consent'});

        if (googleuser){
            console.log("consented")
            return true;
        }
    } catch (error) {
        console.log(error)
    }
};
export const signOutFromGoogle = () => {
    try {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            auth2.disconnect();
        });
        return true;
    } catch (error) {
        console.log(error)
    }
}
export const getSignedInUserEmail = async () => {
    try {
        let status = await checkSignInStatus();
        if (status){
            var auth2 = gapi.auth2.getAuthInstance();
            var profile = auth2.currentUser.get().getBasicProfile();
            return profile.getEmail()
        } else {
            return null;
        }
    } catch (error) {
        console.log(error)
    }
}
export const publishTheCalenderEvent = (event) => {
    try {
        gapi.client.load('calendar', 'v3', () => {
            var request = gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': event
            });
        
            request.execute(function(event) {
                console.log('Event created: ' + event.htmlLink);
            });
        })
          
    } catch (error) {
        console.log(error)
    }
}

   