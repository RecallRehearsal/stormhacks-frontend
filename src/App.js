import logo from './logo.svg';
import './App.css';
import { Button, ChakraProvider, Image, Text } from '@chakra-ui/react'
import axios from "axios"
import { useRef, useState } from 'react';
import { ScrollControls, Scroll } from '@react-three/drei';
import WebAppStage from './components/WebAppStage'
import StageTwo from './components/StageTwo'
import StageThree from './components/StageThree'
import arrow from './images/arrow.svg'
import upload from './images/upload.svg'

function App() {

    const [file, setFile] = useState(null);

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
            } catch (error) {
              console.error('Error uploading file:', error);
            }
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };


  return (
      <>
        <ScrollControls pages={1}>

          <StageThree/>

          <Scroll></Scroll>

          <Scroll html style={{width: '100%'}}>
              <ChakraProvider>
                <div className="App">
                  <Text className='title title-top'>
                    Recall
                  </Text>
                  <Text className='title title-bottom'>
                    Rehearsal
                  </Text>
  
                  <Text className='description-text'>
                    Step into a dynamic learning experience where your lecture notes come to life!
                  </Text>
  
                  <Image className='arrow-img' src={arrow}/>
  
                  <input 
                    type="file" 
                    style={{ display: 'none' }} // Hide the file input
                    onChange={handleFileChange} 
                    ref={fileInputRef}
                    accept="application/pdf"
                  />
                  <Button onClick={handleButtonClick} className="pdf-button">
                    <Image src={upload} className='upload-img'/>
                    <Text className='button-text'>
                      Upload your PDF
                    </Text>
                  </Button>
                </div>
              </ChakraProvider>
            </Scroll>

        </ScrollControls>
      </>
  );
}

export default App;
