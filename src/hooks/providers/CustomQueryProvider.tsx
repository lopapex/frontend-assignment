import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { mutationErrorHandler, queryErrorHandler } from '../../utils/errorHandler';
import { useCustomToast } from '../useCustomToast';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const CustomQueryClientProvider = ({ children }: PropsWithChildren) => {
  const toast = useCustomToast();
  const { t } = useTranslation();

  const onError = () => {
    toast({
      title: t('app.error'),
      status: 'error',
    });
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        refetchInterval: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => queryErrorHandler(error, query, onError),
    }),
    mutationCache: new MutationCache({
      onError: (error, query, mutation, variables) =>
        mutationErrorHandler(error, query, mutation, variables, onError),
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default CustomQueryClientProvider;
