import { Button } from '@chakra-ui/react';
import InputGroup from '../../common/components/InputGroup';

const ContactInformation = () => {
  return (
    <div className="border-r-2 border-gray-100 pr-8">
      <div className="text-lg font-semibold text-teal-600">Thông tin liên hệ</div>
      <div className="mt-3 grid gap-y-3">
        <InputGroup label="Địa chỉ" placeholder="VD: 01 Nguyễn Văn A, P.B, Q.12, TP.HCM" />
        <InputGroup label="Số điện thoại" placeholder="VD: 0901010101" />
        <InputGroup label="Zalo" placeholder="VD: 0901010101" />
        <InputGroup label="Facebook" placeholder="VD: https://www.facebook.com/khackhanh.encacap" />
        <InputGroup
          label="Youtube"
          placeholder="VD: https://www.youtube.com/channel/UCRLAyC2EsX58scfCFKNrqZg"
        />
        <Button type="submit" colorScheme="teal" marginTop="4" width="full">
          Cập nhật
        </Button>
      </div>
    </div>
  );
};

export default ContactInformation;
