import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import chakraTheme from './app/chakra';
import CommonRoutes from './app/routes/CommonRoutes';

const App = () => {
  return (
    <ChakraProvider theme={chakraTheme}>
      <BrowserRouter>
        <CommonRoutes />
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
