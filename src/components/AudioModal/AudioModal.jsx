import React, { useState } from 'react';
import './AudioModal.css';
import CustomModal from '../CustomModal/CustomModal';
import AudioRecorder from '../audiorecorder/AudioRecorder';

const AudioModal = ({ isOpen, onClose }) => {
    const [audioBlob, setAudioBlob] = useState(null);

    const handleRecordingComplete = (blob) => {
        setAudioBlob(blob);
        console.log('Audio recorded:', blob);
    };

    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <div className="audio-modal-container">
                <h2>Record Your Message</h2>
                <AudioRecorder onRecordingComplete={handleRecordingComplete} />
                {audioBlob && (
                    <div className="audio-controls">
                        <button className="send-btn" onClick={() => console.log('Send audio')}>Send</button>
                        <button className="cancel-btn" onClick={() => setAudioBlob(null)}>Cancel</button>
                    </div>
                )}
            </div>
        </CustomModal>
    );
};

export default AudioModal;
