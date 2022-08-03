import {
  Alert as ChakraAlert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
  Box,
} from '@chakra-ui/react';

interface AlertComponentProps extends AlertProps {
  message?: string;
  description: string;
}

const Alert = ({ status = 'info', message, description, ...otherProps }: AlertComponentProps) => {
  const backgroundColorByStatus = {
    success: 'green.100',
    info: 'blue.100',
    warning: 'orange.100',
    error: 'red.100',
    loading: 'gray.100',
  };

  return (
    <ChakraAlert
      rounded="md"
      backgroundColor={backgroundColorByStatus[status]}
      paddingY="4"
      status={status}
      alignItems="flex-start"
      {...otherProps}
    >
      <AlertIcon boxSize="6" mr="4" />
      <Box>
        {message && (
          <AlertTitle fontWeight="semibold" mb="1">
            {message}
          </AlertTitle>
        )}
        <AlertDescription maxWidth="sm">{description}</AlertDescription>
      </Box>
    </ChakraAlert>
  );
};

export default Alert;
