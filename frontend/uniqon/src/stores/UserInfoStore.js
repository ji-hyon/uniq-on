import { create } from 'zustand';

const useUserInfoStore = create((set) => ({
  walletAddress: null,
  accessToken: null,
  setUserInfo: (walletAddress, token) => {
    set({ walletAddress, token });
  },
  setWalletAddress: (payload) => {
    set({ walletAddress: payload })
  },
  setAccessToken: (payload) => {
    set({ accessToken: payload })
  },
}));

export default useUserInfoStore;