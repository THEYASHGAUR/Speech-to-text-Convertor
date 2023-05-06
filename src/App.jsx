import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import {useState} from "react";

const App = () => {

    // State variables to manage the text to copy and the copied state
    const [textToCopy, setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration:1000
    });

    // Function to start listening to user's speech
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

    // React hook to manage the transcript of user's speech
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    // If the browser does not support speech recognition, return null
    if (!browserSupportsSpeechRecognition) {
        return null
    }

    // Render the speech to text converter
    return (
        <>
            <div className="container">
                <h2>Speech to Text Converter</h2>
                <br/>
                <p>A React hook that converts speech from the microphone to text and makes it available to your React
                    components.</p>

                {/* The main content area where the transcript is displayed */}
                <div className="main-content" onClick={() =>  setTextToCopy(transcript)}>
                    {transcript}
                </div>

                {/* Buttons to copy the transcript, start and stop listening */}
                <div className="btn-style">
                    <button onClick={setCopied}>
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button>
                    <button onClick={startListening}>Start Listening</button>
                    <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
                </div>

                {/* Note to inform the user on how to copy the transcript */}
                <p>Note: To copy the text in clipboard first click on the text area then click on copy to clipboard.</p>
            </div>
        </>
    );
};

export default App;
