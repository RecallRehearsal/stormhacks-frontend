import logo from './logo.svg';
import './App.css';
import { Button, ChakraProvider, Image, Text } from '@chakra-ui/react'
import axios from "axios"
import { useState } from 'react';
import { ScrollControls, Scroll } from '@react-three/drei';
import WebAppStage from './components/WebAppStage'
import arrow from './images/arrow.png'

function App() {

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
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
          alert('Error uploading file');
        }
      } else {
        alert('No file selected!');
      }
    };


  return (
      <>
        <ScrollControls pages={5}>
          <WebAppStage scale={3}/>

          <Scroll></Scroll>

          <Scroll html style={{width: '100%'}}>
            <ChakraProvider>
              <div className="App">
                <Text className='title title-top'>
                  Recall
                </Text>
                <Text className='title title-bottom' background="linear-gradient(93deg, #12E9F1 24.27%, #BF7FEA 112.43%)"
                    backgroundClip={'text'}>
                  Realm
                </Text>

                <Text className='description-text'>
                  Step into a dynamic learning experience where your lecture notes come to life!
                </Text>

                <Image src={arrow}/>

                <input type="file" onChange={handleFileChange} accept="application/pdf"/>
                <Button onClick={handleUpload}>Upload PDF</Button>
              </div>
            </ChakraProvider>
          </Scroll>

        </ScrollControls>
      </>
  );
}

export default App;
