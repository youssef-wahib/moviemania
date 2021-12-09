import create from "zustand";
import { Results } from "../src/types";
import axios from "axios";
type Store = {
  readonly pageNumber: string;
  readonly mediaType: string;
  readonly searchQuery: string;
  readonly handleSetPageNumber: (page: string) => void;
  readonly handleSetMediaType: (media: string) => void;
  readonly handleSetSearchQuery: (query: string) => void;
};
const useStore = create<Store>((set) => ({
  pageNumber: "1",
  mediaType: "trending",
  searchQuery: "",
  handleSetPageNumber: (page) => {
    set(() => ({
      pageNumber: page,
    }));
  },
  handleSetMediaType: (media) => {
    set(() => ({
      mediaType: media,
      pageNumber: "1",
    }));
  },
  handleSetSearchQuery: (query) => {
    set(() => ({
      searchQuery: query,
    }));
  },
}));
export const getContent = async (): Promise<Results> => {
  if (useStore.getState().mediaType === "trending")
    return await axios
      .get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&page=${useStore.getState().pageNumber}`
      )
      .then((res) => res.data);
  else if (useStore.getState().mediaType === "search")
    return await axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&query=${useStore.getState().searchQuery}&page=${
          useStore.getState().pageNumber
        }`
      )
      .then((res) => res.data);
  else
    return await axios
      .get(
        `
https://api.themoviedb.org/3/${useStore.getState().mediaType}/popular?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&page=${useStore.getState().pageNumber}`
      )
      .then((res) => res.data);
};

export default useStore;
