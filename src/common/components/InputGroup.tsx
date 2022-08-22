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
  disabled?: boolean;
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
    disabled,
    className,
    ...props
  }: InputGroupProps,
  ref?: React.LegacyRef<HTMLDivElement>,
) => {
  return (
    <FormControl
      ref={ref}
      isInvalid={!!errorMessage}
      className={twMerge(className, disabled && 'cursor-not-allowed')}
      {...props}
    >
      {label && (
        <FormLabel
          fontSize={14}
          className={twMerge('text-sm text-gray-500', disabled && 'cursor-not-allowed', labelClassName)}
        >
          {label}
        </FormLabel>
      )}
      {type === 'text' && (
        <Input
          placeholder={placeholder}
          focusBorderColor="teal.500"
          className={twMerge(
            inputProps?.className,
            'disabled:bg-gray-50 disabled:text-gray-300 disabled:placeholder-gray-300',
            disabled && 'cursor-not-allowed',
          )}
          disabled={disabled}
          _disabled={{ opacity: 1 }}
          {...inputProps}
        />
      )}
      {type === 'textarea' && (
        <Textarea
          placeholder={placeholder}
          focusBorderColor="teal.500"
          disabled={disabled}
          {...textareaProps}
        />
      )}
      <Collapse in={!!errorMessage} endingHeight={26}>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </Collapse>
    </FormControl>
  );
};

export default forwardRef(InputGroup);
