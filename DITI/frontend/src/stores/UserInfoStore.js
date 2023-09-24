import { create } from 'zustand';

const useUserInfoStore = create((set) => ({
  walletAddress: null,
  originalMessage: null,
  signedMessage: null,
  setUserInfo: (walletAddress, originalMessage, signedMessage) => {
    set({ walletAddress, originalMessage, signedMessage });
  },
}));

export default useUserInfoStore;
