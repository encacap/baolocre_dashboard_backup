import { Button, ModalProps } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { contactService } from '../../../app/services';
import { AxiosErrorType } from '../../../app/types/common';
import { ContactDataType } from '../../../app/types/contact';
import InputGroup from '../../../common/components/form/InputGroup';
import Modal from '../../../common/components/Modal';
import { modifyContactSchema } from '../../../common/utils/validationSchemas/contact';

type ContactModifyModalProps = Omit<ModalProps, 'children' | 'className'> & {
  contact: ContactDataType | null;
  onClose: () => void;
  onFinish: () => void;
  onFailed: (error: string) => void;
};

const ContactModifyModal = ({ contact, onClose, onFinish, onFailed, ...props }: ContactModifyModalProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const formDefaultValue: Partial<ContactDataType> = {
    name: null,
    phone: null,
    email: null,
    zalo: null,
    avatar: null,
    facebook: null,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
    setError,
    setValue,
  } = useForm<ContactDataType>({
    resolver: yupResolver(modifyContactSchema),
    defaultValues: formDefaultValue,
  });

  const handleCloseModal = () => {
    reset(formDefaultValue);
    onClose();
  };

  const handleResponseError = (error: AxiosErrorType) => {
    const responseErrors = error?.response?.data.errors;
    if (responseErrors) {
      responseErrors.forEach((responseError) => {
        setError(responseError.field as keyof ContactDataType, {
          type: 'manual',
          message: responseError.message.join(', '),
        });
      });
      return;
    }
    onFailed?.(error.response?.data.message || 'Vui lòng thử lại sau');
  };

  const handleCreateContact = async (data: ContactDataType) => {
    return contactService
      .createContact(data)
      .then(() => {
        reset();
        onFinish();
      })
      .catch(handleResponseError);
  };

  const handleUpdateContact = async (data: ContactDataType) => {
    if (!contact || !contact.id) return null;
    return contactService
      .updateContactById(contact.id, data)
      .then(() => {
        reset();
        onFinish();
      })
      .catch(handleResponseError);
  };

  const handleFinish = handleSubmit((data) => {
    if (contact) {
      return handleUpdateContact(data);
    }
    return handleCreateContact(data);
  });

  useEffect(() => {
    if (!contact || _.isEmpty(contact)) {
      setIsLoading(false);
      return;
    }
    setValue('name', contact.name);
    setValue('phone', contact.phone);
    setValue('email', contact.email);
    setValue('zalo', contact.zalo);
    setValue('facebook', contact.facebook);
    setValue('avatar', contact.avatar);
    setIsLoading(false);
  }, [contact]);

  return (
    <Modal
      title={contact ? 'Cập nhật thông tin liên hệ' : 'Thêm thông tin liên hệ'}
      size="xl"
      blockScrollOnMount
      closeOnOverlayClick
      onClose={handleCloseModal}
      {...props}
    >
      <form onSubmit={handleFinish} className="space-y-4 pb-2">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <InputGroup
            label="Tên liên hệ"
            placeholder="Nhập tên liên hệ"
            errorMessage={errors.name?.message}
            inputProps={{ ...register('name') }}
            className="col-span-2"
            disabled={isLoading || isSubmitting}
            isRequired
          />
          <InputGroup
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            errorMessage={errors.phone?.message}
            inputProps={{ ...register('phone') }}
            disabled={isLoading || isSubmitting}
            isRequired
          />
          <InputGroup
            label="Zalo"
            placeholder="Nhập Zalo"
            errorMessage={errors.zalo?.message}
            inputProps={{ ...register('zalo') }}
            disabled={isLoading || isSubmitting}
          />
          <InputGroup
            label="Địa chỉ Gmail"
            placeholder="Nhập địa chỉ Gmail"
            errorMessage={errors.email?.message}
            inputProps={{ ...register('email') }}
            disabled={isLoading || isSubmitting}
          />
          <InputGroup
            label="Địa chỉ Facebook"
            placeholder="Nhập địa chỉ Facebook"
            errorMessage={errors.facebook?.message}
            inputProps={{ ...register('facebook') }}
            disabled={isLoading || isSubmitting}
          />
        </div>
        <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <InputGroup
              type="file"
              label="Hình ảnh đại diện"
              placeholder="Chọn hình ảnh đại diện cho danh mục"
              errorMessage={errors.avatar?.message}
              imageInputProps={{
                value: field.value ? [field.value] : [],
                onChange: (images) => field.onChange(images[0] || null),
              }}
              isRequired
              disabled={isLoading || isSubmitting}
            />
          )}
        />
        <div className="pt-3">
          <Button
            type="submit"
            colorScheme="teal"
            className="w-full"
            disabled={isSubmitting || isLoading}
            isLoading={isSubmitting}
          >
            Hoàn thành
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ContactModifyModal;
