import {
  Collapse,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';
import React, { forwardRef } from 'react';

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: HTMLInputElement['type'];
  label?: string;
  inputProps?: InputProps;
  textareaProps?: TextareaProps;
  placeholder?: string;
  errorMessage?: string;
}

const InputGroup = (
  { type = 'text', label, placeholder, errorMessage, inputProps, textareaProps, ...props }: InputGroupProps,
  ref?: React.LegacyRef<HTMLDivElement>,
) => {
  return (
    <FormControl ref={ref} isInvalid={!!errorMessage} {...props}>
      {label && <FormLabel className="text-gray-500">{label}</FormLabel>}
      {type === 'text' && <Input placeholder={placeholder} focusBorderColor="teal.500" {...inputProps} />}
      {type === 'textarea' && (
        <Textarea placeholder={placeholder} focusBorderColor="teal.500" {...textareaProps} />
      )}
      <Collapse endingHeight={26}>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </Collapse>
    </FormControl>
  );
};

export default forwardRef(InputGroup);
