import logo from './logo.svg';
import './App.css';
import { Button, ChakraProvider, Text } from '@chakra-ui/react'
import axios from "axios"
import { useState } from 'react';
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei';

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
          <mesh>
            <ambientLight intensity={0.1}/>
            <boxGeometry/>
            <meshStandardMaterial/>
          </mesh>

          <Scroll></Scroll>

          <Scroll html style={{width: '100%'}}>
            <ChakraProvider>
              <div className="App">
                <Text>Upload your PDF here</Text>
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
