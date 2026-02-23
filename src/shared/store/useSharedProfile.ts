import { useSyncExternalStore } from "react";
import sharedStore from "./index";
import { updateWorkStatus } from "./userSlice";
import type { UserProfile, WorkStatus } from "../types";

/**
 * Custom hook to access shared profile state using React's `useSyncExternalStore` for subscriptions.
 * Use of providers is reserved for micro-frontend specific state, while this hook provides access to shared state across apps.
 */
export function useSharedProfile() {
  const subscribe = (cb: () => void) => sharedStore.subscribe(cb);
  const getSnapshot = (): UserProfile => sharedStore.getState().user.profile;

  return { 
    profile: useSyncExternalStore(subscribe, getSnapshot),
    setWorkStatus: (val: WorkStatus) => {
      sharedStore.dispatch(updateWorkStatus(val));
    },
  };
}

export default useSharedProfile;
