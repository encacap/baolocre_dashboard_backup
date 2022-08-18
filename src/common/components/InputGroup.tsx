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
import { twMerge } from 'tailwind-merge';

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: HTMLInputElement['type'];
  label?: string;
  labelClassName?: string;
  inputProps?: InputProps;
  textareaProps?: TextareaProps;
  placeholder?: string;
  errorMessage?: string;
}

const InputGroup = (
  {
    type = 'text',
    label,
    labelClassName,
    placeholder,
    errorMessage,
    inputProps,
    textareaProps,
    ...props
  }: InputGroupProps,
  ref?: React.LegacyRef<HTMLDivElement>,
) => {
  return (
    <FormControl ref={ref} isInvalid={!!errorMessage} {...props}>
      {label && (
        <FormLabel fontSize={14} className={twMerge('text-sm text-gray-500', labelClassName)}>
          {label}
        </FormLabel>
      )}
      {type === 'text' && <Input placeholder={placeholder} focusBorderColor="teal.500" {...inputProps} />}
      {type === 'textarea' && (
        <Textarea placeholder={placeholder} focusBorderColor="teal.500" {...textareaProps} />
      )}
      <Collapse in={!!errorMessage} endingHeight={26}>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </Collapse>
    </FormControl>
  );
};

export default forwardRef(InputGroup);
