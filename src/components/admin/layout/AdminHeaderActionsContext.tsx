"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type HeaderActions = {
  onSave?: () => void | Promise<void>;
  onPublish?: () => void | Promise<void>;
  isPublishing?: boolean;
};

type AdminHeaderActionsContextValue = HeaderActions & {
  setHeaderActions: (next: HeaderActions) => void;
  clearHeaderActions: () => void;
};

const AdminHeaderActionsContext =
  createContext<AdminHeaderActionsContextValue | null>(null);

export function AdminHeaderActionsProvider({ children }: { children: ReactNode }) {
  const [actions, setActions] = useState<HeaderActions>({});

  const setHeaderActions = useCallback((next: HeaderActions) => {
    setActions(next);
  }, []);

  const clearHeaderActions = useCallback(() => {
    setActions({});
  }, []);

  const value = useMemo<AdminHeaderActionsContextValue>(
    () => ({
      ...actions,
      setHeaderActions,
      clearHeaderActions,
    }),
    [actions, setHeaderActions, clearHeaderActions],
  );

  return (
    <AdminHeaderActionsContext.Provider value={value}>
      {children}
    </AdminHeaderActionsContext.Provider>
  );
}

export function useAdminHeaderActions() {
  const ctx = useContext(AdminHeaderActionsContext);
  if (!ctx) {
    throw new Error(
      "useAdminHeaderActions must be used within AdminHeaderActionsProvider",
    );
  }
  return ctx;
}

