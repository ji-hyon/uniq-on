import { create } from "zustand";
import { persist } from "zustand/middleware";

let transactionStore = (set) => ({
  salesItemsList: [],
  itemsPriceList: [],
  itemTitleList: [],
  itemSpeciesList: [],
  itemNicknameList: [],
  itemImageList: [],
  isWishList: 0,
  setSalesItemsList: (payload) => set({ salesItemsList: payload }),
  setItemsPriceList: (payload) => set({ itemsPriceList: payload }),
  setItemTitleList: (payload) => set({ itemTitleList: payload }),
  setItemSpeciesList: (payload) => set({ itemSpeciesList: payload }),
  setItemNicknameList: (payload) => set({ itemNicknameList: payload }),
  setItemImageList: (payload) => set({ itemImageList: payload }),
  setIsWishList: (payload) => set({ isWishList: payload }),
});

transactionStore = persist(transactionStore, { name: "transaction_store" });

export const useTransactionStore = create(transactionStore);