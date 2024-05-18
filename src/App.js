import logo from './logo.svg';
import './App.css';
import { Button, ChakraProvider } from '@chakra-ui/react'
import axios from "axios"

function App() {





  return (
    <ChakraProvider>
      <div className="App">
        <h1>
          Hi
        </h1>
        <Button>
          button
        </Button>
      </div>
    </ChakraProvider>
  );
}

export default App;
