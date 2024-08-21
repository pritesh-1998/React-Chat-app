import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import "./webcam.css";

export const CustomWebcam = ({ isActive, hadlewebcameClose, addwebcameImagetoChat }) => {
    const webcamRef = useRef(null);
    const [image, setimage] = useState({
        file: null,
        url: "",
    });

    const handleCapture = useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const blob = await fetch(imageSrc).then(res => res.blob());
        const file = new File([blob], `webcam-image-${Date.now()}.jpeg`, { type: "image/jpeg" });
        const objectUrl = URL.createObjectURL(file);
        setimage({
            file: file,
            url: objectUrl,
        });

        addwebcameImagetoChat({
            file: file,
            url: objectUrl,
        }); // Pass the image back to the Chat component
    }, [webcamRef, addwebcameImagetoChat]);

    return (
        isActive ? (
            <div className="webcam-container">
                <button className="close-button" onClick={hadlewebcameClose}>×</button>
                <Webcam screenshotFormat="image/jpeg" className="webcam" ref={webcamRef} />
                <button className="capture-button" onClick={handleCapture}>Capture</button>
            </div>
        ) : null
    );
};
