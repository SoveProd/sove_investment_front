"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { hydrateToken } from "./slices/authSlice";

type Props = {
  children: React.ReactNode;
};

function StoreBootstrap({ children }: Props) {
  useEffect(() => {
    store.dispatch(hydrateToken());
  }, []);

  return <>{children}</>;
}

export function StoreProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <StoreBootstrap>{children}</StoreBootstrap>
    </Provider>
  );
}
