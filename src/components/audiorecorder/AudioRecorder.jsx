import React, { useState, useRef } from 'react';
import './AudioRecorder.css';

const AudioRecorder = ({ onRecordingComplete }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState('');
    const mediaRecorderRef = useRef(null);

    const startRecording = async () => {
        setIsRecording(true);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
            const audioBlob = new Blob([event.data], { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioURL(audioUrl);
            onRecordingComplete(audioBlob);
        };

        mediaRecorder.start();
    };

    const stopRecording = () => {
        setIsRecording(false);
        mediaRecorderRef.current.stop();
    };

    return (
        <div className="audio-recorder">
            <button
                className={`recorder-btn ${isRecording ? 'stop-btn' : 'record-btn'}`}
                onClick={isRecording ? stopRecording : startRecording}
            >
                {isRecording ? 'Stop' : 'Record'}
            </button>
            {audioURL && (
                <audio controls src={audioURL} />
            )}
        </div>
    );
};

export default AudioRecorder;
