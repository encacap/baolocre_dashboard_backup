const { extendTheme } = require('@chakra-ui/react');

const chakraTheme = extendTheme({
  fonts: {
    body: `'Source Sans Pro', sans-serif`,
  },
  colors: {
    encacap: {
      100: '#F0F8FF',
    },
  },
});

export default chakraTheme;
