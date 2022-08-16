import { Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { configService } from '../../app/services';
import { ContactInformationDataType } from '../../app/types/config';
import InputGroup from '../../common/components/InputGroup';
import useToast from '../../common/hooks/useToast';

const ContactInformation = () => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<ContactInformationDataType>();

  const handleFinish: SubmitHandler<ContactInformationDataType> = async (data) => {
    await configService.updateContactInformation(data);
    toast.success('Thành công!', 'Đã cập nhật thông tin liên hệ.');
    return data;
  };

  useEffect(() => {
    configService.getContactInformation().then((data) => {
      setValue('address', data.address);
      setValue('phoneNumber', data.phoneNumber);
      setValue('zalo', data.zalo);
      setValue('facebook', data.facebook);
      setValue('youtube', data.youtube);
    });
  }, []);

  return (
    <div className="">
      <div className="text-lg font-semibold text-teal-600">Thông tin liên hệ</div>
      <form className="mt-3 grid gap-y-3 pb-2" onSubmit={handleSubmit(handleFinish)}>
        <InputGroup
          label="Địa chỉ"
          placeholder="VD: 01 Nguyễn Văn A, P.B, Q.12, TP.HCM"
          inputProps={{ ...register('address') }}
        />
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <InputGroup
            label="Số điện thoại"
            placeholder="VD: 0901010101"
            inputProps={{ ...register('phoneNumber') }}
          />
          <InputGroup label="Zalo" placeholder="VD: 0901010101" inputProps={{ ...register('zalo') }} />
          <InputGroup
            label="Facebook"
            placeholder="VD: https://www.facebook.com/khackhanh.encacap"
            inputProps={{ ...register('facebook') }}
          />
          <InputGroup
            label="Youtube"
            placeholder="VD: https://www.youtube.com/channel/UCRLAyC2EsX58scfCFKNrqZg"
            inputProps={{ ...register('youtube') }}
          />
        </div>
        <Button
          type="submit"
          colorScheme="teal"
          className="mt-4"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Cập nhật
        </Button>
      </form>
    </div>
  );
};

export default ContactInformation;
