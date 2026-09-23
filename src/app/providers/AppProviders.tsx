import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "../store/store";

type AppProvidersProps = {
  children: React.ReactNode;
};

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default AppProviders;
