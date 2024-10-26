import {useToast} from '@chakra-ui/react';

export const useCustomToast = () => {
  const toast = useToast();

  const customToast = ({
    title,
    status = 'success',
  }: {
    title: string;
    status: 'success' | 'error';
  }) => {
    toast({
      title,
      status,
      duration: 2000,
    });
  };

  return customToast;
};
