import { createContext } from "react";
import { Establishment } from "../api/ratingsAPI";

export type FavouriteEstablishments = {
  favouriteEstablishments: Establishment[];
  addFavouriteEstablishment: (
    establishment: Establishment,
    favouriteEstablishments: Establishment[]
  ) => Establishment[];
  removeFavouriteEstablishment: (
    establishment: Establishment,
    favouriteEstablishments: Establishment[]
  ) => Establishment[];
  setFavouriteEstablishments: (
    favouriteEstablishments: Establishment[]
  ) => void;
};

export const addFavouriteEstablishment = (
  establishment: Establishment,
  favouriteEstablishments: Establishment[]
) => {
  return [...favouriteEstablishments, establishment];
};

export const removeFavouriteEstablishment = (
  establishment: Establishment,
  favouriteEstablishments: Establishment[]
) => {
  return favouriteEstablishments.filter(
    (favouriteEstablishment) =>
      favouriteEstablishment.FHRSID !== establishment.FHRSID
  );
};

export const INITIAL_FAVOURITE_ESTABLISHMENTS_CONTEXT = {
  favouriteEstablishments: [],
  addFavouriteEstablishment,
  removeFavouriteEstablishment,
  setFavouriteEstablishments: () => {},
};

export const FavouriteEstablishmentsContext =
  createContext<FavouriteEstablishments>(
    INITIAL_FAVOURITE_ESTABLISHMENTS_CONTEXT
  );
