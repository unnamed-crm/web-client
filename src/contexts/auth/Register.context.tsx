import { createContext, useContext, useState } from 'react';
import type { FC, PropsWithChildren, Dispatch, SetStateAction } from 'react';
import type { FullRegisterData } from '@/schemas/auth/register.schema';

const initialData: FullRegisterData = {
  email: '',
  password: '',
  confirmPassword: '',
  code: '',
};

type RegisterDataPartial = Partial<FullRegisterData>;
type UpdateContext = Dispatch<SetStateAction<RegisterDataPartial>>;
type ResetContext = () => void;

type RegisterContextType = {
  data: FullRegisterData;
  updateData: UpdateContext;
  resetData: ResetContext;
};

const RegisterContext = createContext<RegisterContextType>({
  data: initialData,
  updateData: () => undefined,
  resetData: () => undefined,
});

export const RegisterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState(initialData);
  const updateData: UpdateContext = (newData) => setData((oldData) => ({ ...oldData, ...newData }));
  const resetData: ResetContext = () => setData(initialData);

  return (
    <RegisterContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegisterContext = () => useContext(RegisterContext);
