import { Spinner } from '@chakra-ui/react';

const TableLoadingOverlay = () => {
  return (
    <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-white bg-opacity-50">
      <Spinner boxSize="8" color="teal.500" speed="0.6s" />
    </div>
  );
};

export default TableLoadingOverlay;
