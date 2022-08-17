import { Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { configService } from '../../app/services';
import { ContactInformationDataType } from '../../app/types/config';
import InputGroup from '../../common/components/InputGroup';
import useToast from '../../common/hooks/useToast';
import { updateContactInformationSchema } from '../../common/utils/validationSchemas/config';

const ContactInformation = () => {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors, isSubmitted },
  } = useForm<ContactInformationDataType>({
    resolver: yupResolver(updateContactInformationSchema),
  });

  const handleFinish: SubmitHandler<ContactInformationDataType> = async (data) => {
    await configService.updateContactInformation(data);
    toast.success('Thành công!', 'Đã cập nhật thông tin liên hệ.', {
      id: 'updateContactInformationSuccess',
    });
    return data;
  };

  useEffect(() => {
    setIsLoading(true);
    configService
      .getContactInformation()
      .then((data) => {
        setValue('address', data.address);
        setValue('phoneNumber', data.phoneNumber);
        setValue('zalo', data.zalo);
        setValue('facebook', data.facebook);
        setValue('youtube', data.youtube);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isSubmitting) {
      setIsLoading(true);
      return;
    }
    if (isSubmitted) {
      setIsLoading(false);
    }
  }, [isSubmitting, isSubmitted]);

  return (
    <div className="">
      <div className="text-lg font-semibold text-teal-600">Thông tin liên hệ</div>
      <form className="mt-3 grid gap-y-3 pb-2" onSubmit={handleSubmit(handleFinish)}>
        <InputGroup
          label="Địa chỉ"
          placeholder="VD: 01 Nguyễn Văn A, P.B, Q.12, TP.HCM"
          inputProps={{
            ...register('address', {
              disabled: isLoading,
            }),
          }}
          errorMessage={errors?.address?.message}
        />
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <InputGroup
            label="Số điện thoại"
            placeholder="VD: 0901010101"
            inputProps={{
              ...register('phoneNumber', {
                disabled: isLoading,
              }),
            }}
            errorMessage={errors?.phoneNumber?.message}
          />
          <InputGroup
            label="Zalo"
            placeholder="VD: 0901010101"
            inputProps={{
              ...register('zalo', {
                disabled: isLoading,
              }),
            }}
            errorMessage={errors?.zalo?.message}
          />
          <InputGroup
            label="Facebook"
            placeholder="VD: https://www.facebook.com/khackhanh.encacap"
            inputProps={{
              ...register('facebook', {
                disabled: isLoading,
              }),
            }}
            errorMessage={errors?.facebook?.message}
          />
          <InputGroup
            label="Youtube"
            placeholder="VD: https://www.youtube.com/channel/UCRLAyC2EsX58scfCFKNrqZg"
            inputProps={{
              ...register('youtube', {
                disabled: isLoading,
              }),
            }}
            errorMessage={errors?.youtube?.message}
          />
        </div>
        <Button
          type="submit"
          colorScheme="teal"
          className="mt-4"
          loadingText="Đang cập nhật"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Cập nhật
        </Button>
      </form>
    </div>
  );
};

export default ContactInformation;
