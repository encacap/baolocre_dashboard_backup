import {
  Collapse,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  Select,
  SelectProps,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';
import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { InputImageProps } from '../../../app/types/props';
import InputImage from './InputImage';

interface OptionType {
  label: string;
  value: string;
}

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: HTMLInputElement['type'];
  label?: string;
  labelClassName?: string;
  inputProps?: InputProps;
  imageInputProps?: InputImageProps;
  textareaProps?: TextareaProps;
  selectProps?: SelectProps;
  options?: OptionType[];
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
    selectProps,
    imageInputProps,
    options,
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
      {type === 'select' && (
        <Select placeholder={placeholder} focusBorderColor="teal.500" disabled={disabled} {...selectProps}>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      )}
      {type === 'file' && (
        <InputImage placeholder={placeholder} focusBorderColor="teal.500" {...imageInputProps} />
      )}
      <Collapse in={!!errorMessage}>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </Collapse>
    </FormControl>
  );
};

export default forwardRef(InputGroup);
