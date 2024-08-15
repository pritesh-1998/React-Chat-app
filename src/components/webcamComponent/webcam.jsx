import Webcam from "react-webcam";
import { useRef } from "react";
import "./webcam.css";

export const CustomWebcam = () => {
    const webcamRef = useRef(null);
    const handleClose = () => {

    }
    return (
        <div className="webcam-container">
            <button className="close-button" onClick={handleClose}>×</button>
            <Webcam className="webcam" ref={webcamRef} />
            <button className="capture-button">Capture</button>
        </div>
    );
};
