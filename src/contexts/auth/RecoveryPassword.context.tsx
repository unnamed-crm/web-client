import React, {
  createContext,
  useContext,
  useState,
  FC,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from 'react';
import { FullRecoveryPasswordData } from '@/schemas/auth/recoveryPassword.schema';

const initialData: FullRecoveryPasswordData = {
  email: '',
  code: '',
  newPassword: '',
};

type RecoveryPasswordDataPartial = Partial<FullRecoveryPasswordData>;
type UpdateContext = Dispatch<SetStateAction<RecoveryPasswordDataPartial>>;
type ResetContext = () => void;

type RecoveryPasswordType = {
  data: FullRecoveryPasswordData;
  updateData: UpdateContext;
  resetData: ResetContext;
};

const RecoveryPasswordContext = createContext<RecoveryPasswordType>({
  data: initialData,
  updateData: () => undefined,
  resetData: () => undefined,
});

export const RecoveryPasswordProvider: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState(initialData);
  const updateData: UpdateContext = (newData) => setData((oldData) => ({ ...oldData, ...newData }));
  const resetData: ResetContext = () => setData(initialData);

  return (
    <RecoveryPasswordContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </RecoveryPasswordContext.Provider>
  );
};

export const useRecoveryPasswordContext = () => useContext(RecoveryPasswordContext);
