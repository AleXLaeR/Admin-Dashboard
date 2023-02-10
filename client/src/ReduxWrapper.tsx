import { persistor, store } from '@redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as ReduxProvider } from 'react-redux';

interface ReduxWrapperProps {
  children: JSX.Element[] | JSX.Element;
}

export default function ReduxWrapper({ children }: ReduxWrapperProps) {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {Array.isArray(children) ? [...children] : children}
      </PersistGate>
    </ReduxProvider>
  );
}
