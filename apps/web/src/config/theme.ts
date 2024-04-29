import { extendTheme } from '@chakra-ui/react';

const colorTheme = { baseStyle: { color: 'theme.900' } };

const theme = extendTheme({
  global: {
    body: {
      transformOrigin: '0 0',
      transform: 'scale(1)',
    },
  },
  colors: {
    transparent: 'transparent',
    black: '#000',
    white: {
      900: '#FAf8fA',
      100: '#CDCDDE',
    },
    menutheme: {
      900: '#fff',
      800: '#fff',
      700: '#fff',
      600: '#fff',
      500: '#ff0000',
      400: '#fff',
      300: '#fff',
      200: '#fff',
      100: '#fff',
    },
    theme: {
      900: '#000',
      800: '#111',
      700: '#fff',
      600: '#000',
      500: '#000',
      400: '#ccc',
      300: '#eee',
      200: '#F9FAFB',
      100: '#425166',
    },
  },
  components: {
    Text: { ...colorTheme },
    Heading: { ...colorTheme },
    FormLabel: { ...colorTheme },
    Checkbox: {
      baseStyle: {
        control: {
          padding: 2,
          borderRadius: 'md',
          background: 'black',
          border: '2px solid rgba(0, 0, 0, 0.1)',
          _checked: {
            border: '2px solid rgba(0, 0, 0, 0.1)',
            background: 'black',
            _hover: {
              border: '2px solid rgba(0, 0, 0, 0.1)',
              background: 'black',
            },
          },
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            _focusVisible: {
              bg: 'white',
              borderColor: 'theme.900',
              boxShadow: '0 0 0 0.25rem rgba(0,0,0, 0.3)',
            },
            _autofill: { boxShadow: '0 0 0px 1000px #fff inset' },
            _placeholder: { color: 'gray.400' },
            textColor: 'theme.900',
          },
        },
      },
      baseStyle: {
        field: {
          border: '1px solid',
          borderColor: 'theme.900',
          borderRadius: 'xl',
          boxShadow: '0 0 0 0.25rem rgba(0,0,0, 0.1)',
          _hover: {
            bg: 'white',
            boxShadow: '0 0 0 0.25rem rgba(0,0,0, 0.2)',
          },
          _autofill: {
            boxShadow: '0 0 0 0.25rem rgba(0,0,0, 0.2)',
            borderRadius: 'xl',
            bgColor: 'red',
            backgroundColor: 'red',
          },
        },
      },
    },
    Textarea: {
      baseStyle: {
        border: '1px solid',
        borderColor: 'theme.900',
        borderRadius: 'xl',
        boxShadow: '0 0 0 0.25rem rgba(0,0,0, 0.1)',
        textColor: 'theme.900',
        _placeholder: { color: 'gray.400' },
        _hover: {
          bg: 'white',
          boxShadow: '0 0 0 0.25rem rgba(0,0,0, 0.2)',
        },
        _focus: {
          bg: 'white',
          borderColor: 'theme.900',
          boxShadow: '0 0 0 0.25rem rgba(0,0,0, 0.3)',
        },
      },
    },
    Modal: { baseStyle: () => ({ dialog: { bg: 'white' } }) },
  },
  fonts: {
    heading: '\'Poppins\', sans-serif',
    body: '\'Poppins\', sans-serif',
  },
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  },
});

export default theme;
