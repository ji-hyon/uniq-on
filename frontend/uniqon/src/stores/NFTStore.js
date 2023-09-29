import { create } from "zustand";
import { persist } from "zustand/middleware";

let nftStore = (set) => ({
  nft: [],
  setNft: (payload) => set({ nft: payload }),

  name: [],
  setName: (payload) => set({ name: payload }),

  age: [],
  setAge: (payload) => set({ age: payload }),

  feature: [],
  setFeature: (payload) => set({ feature: payload }),

  selectedMain: [],
  setSelectedMain: (payload) => set({ selectedMain: payload }),

  selectedMiddle: [],
  setSelectedMiddle: (payload) => set({ selectedMiddle: payload }),

  ipfsUrl: [],
  setIpfsUrl: (payload) => set({ setIpfsUrl: payload }),

  hash: [],
  setHash: (payload) => set({ setHash: payload }),

  tokenId: [],
  setTokenId: (payload) => set({ setTokenId: payload }),

  status: [],
  setStatus: (payload) => set({ setStatus: payload }),

  address: [],
  setAddress: (payload) => set({ setAddress: payload })
});

nftStore = persist(nftStore, { name: "nft" });

export const useNftStore = create(nftStore);
