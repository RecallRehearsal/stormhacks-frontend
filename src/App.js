import './App.css';
import { Box, Button, ChakraProvider, Image, Text, Fade } from '@chakra-ui/react'
import axios from "axios"
import { useEffect, useRef, useState } from 'react';
import { ScrollControls, Scroll } from '@react-three/drei';
import WebAppStage from './components/WebAppStage'
import StageTwo from './components/StageTwo'
import StageThree from './components/StageThree'
import StageFour from './components/StageFour'
import StageFive from './components/StageFive'
import arrow from './images/arrow.svg'
import upload from './images/upload.svg'
import vrHeadset from './images/VRHeadset.svg'

function App() {

    const [file, setFile] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    
    
    const [show, setShow] = useState(false);

    const [showRecallApp, setShowRecallApp] = useState(true);
    const [showVrText, setShowVrText] = useState(false);


    const fileInputRef = useRef(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
    
            try {
              const response = await axios.post('https://easy-fly-cleanly.ngrok-free.app/addDocument', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
      
              alert('File uploaded successfully!');
              console.log('Server Response:', response.data);
              setFileUploaded(true);

              setTimeout(() => {
                console.log('Setting animationComplete to true after 10 seconds');
                setAnimationComplete(true);
              }, 10000);
            } catch (error) {
              console.error('Error uploading file:', error);
              setFileUploaded(true);
              // setShow(false);
              setFileUploaded(true);
              setShowRecallApp(false);
              setTimeout(() => {
                console.log('Setting animationComplete to true after 10 seconds');
                setAnimationComplete(true);
              }, 11000);
            }
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
      console.log(animationComplete, ' is the animation complate');
    }, [animationComplete])

    useEffect(() => {
      let timer = setTimeout(() => setShowVrText(true), 500);
      return () => clearTimeout(timer);
    }, []);


  return (
      <>
        <ScrollControls pages={1}>

          <StageFive fileUploaded={fileUploaded} onAnimationComplete={() => {
            setAnimationComplete(true)
            }} />

          <Scroll></Scroll>

          <Scroll html style={{width: '100%'}}>
              <ChakraProvider>
                <Fade in={showRecallApp} transition={{ enter: { duration: 1 }, exit: { duration: 1 } }}>
                  <div className="App recall-app">
                    <Text className="title title-top">Recall</Text>
                    <Text className="title title-bottom">Rehearsal</Text>

                    <Text className="description-text">
                      Step into a dynamic learning experience where your lecture notes come to life!
                    </Text>

                    <Image className="arrow-img" src={arrow} />

                    <input
                      type="file"
                      style={{ display: 'none' }} // Hide the file input
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      accept="application/pdf"
                    />
                    <Button onClick={handleButtonClick} className="pdf-button">
                      <Image src={upload} className="upload-img" />
                      <Text className="button-text">Upload your PDF</Text>
                    </Button>
                  </div>
                </Fade>

                {animationComplete && (
                  <Fade in={showVrText} transition={{ enter: { duration: 1.5, delay: 0 } }}>
                    <Box className={`vr-text-container fade-in`}>
                        <Text className='vr-text'>
                          Please put on your VR headset
                          <Image src={vrHeadset} className='vr-icon'/>
                        </Text>
                      </Box>
                  </Fade>
                )}

              </ChakraProvider>
            </Scroll>

        </ScrollControls>
      </>
  );
}

export default App;
