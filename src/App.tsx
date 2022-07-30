import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import chakraTheme from './app/chakra.config';
import CommonRoutes from './app/routes/CommonRoutes';
import { store } from './app/store';

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={chakraTheme}>
        <BrowserRouter>
          <CommonRoutes />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
