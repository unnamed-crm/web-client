import type { FC, PropsWithChildren } from 'react';
import { RegisterProvider } from './auth/Register.context';
import { RecoveryPasswordProvider } from './auth/RecoveryPassword.context';

export const RootContext: FC<PropsWithChildren> = ({ children }) => (
  <>
    <RegisterProvider>
      <RecoveryPasswordProvider>{children}</RecoveryPasswordProvider>
    </RegisterProvider>
  </>
);
