import React, { useState } from "react"
import { useHref, useNavigate, useLocation } from "react-router-dom";
import { Viewer } from "@react-pdf-viewer/core";


import "./Help.css"
import Tabs from "./Tabs";
export const ViewPDF = ({ GlobalState }) => {
    const location = useLocation();

    const { currUser, setCurrUser } = GlobalState;
    setCurrUser(location.state.u)

    const base64toBlob = (data) => {
        // Cut the prefix `data:application/pdf;base64` from the raw base 64
        const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

        const bytes = atob(base64WithoutPrefix);
        let length = bytes.length;
        let out = new Uint8Array(length);

        while (length--) {
            out[length] = bytes.charCodeAt(length);
        }

        return new Blob([out], { type: 'application/pdf' });
    };

    const blob = base64toBlob(location.state.pdf);
    const url = URL.createObjectURL(blob);


    return (


        <div className="App">
            <div
                style={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    height: '750px',
                }}
            >
                <Viewer fileUrl={url} />
            </div>

        </div>



    )

}