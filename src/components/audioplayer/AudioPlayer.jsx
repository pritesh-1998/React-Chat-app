import React from 'react';

const AudioPlayer = ({ src }) => {
    return (
        <div className="custom_audio_player">
            <audio controls className="audio_element">
                <source src={src} type="audio/ogg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default AudioPlayer;
