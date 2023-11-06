import { Establishment } from "../api/establishments";
import {
  addFavouriteEstablishment,
  removeFavouriteEstablishment,
} from "./FavouriteEstablishments";

const establishment1: Establishment = {
  FHRSID: 1,
  BusinessName: "Name",
  BusinessType: "Just business",
  LocalAuthorityBusinessID: "1",
  RatingDate: "1-1-1990",
  RatingValue: "5",
  links: [],
};
const establishment2: Establishment = {
  FHRSID: 2,
  BusinessName: "Tea",
  BusinessType: "Other business",
  LocalAuthorityBusinessID: "2",
  RatingDate: "1-1-1990",
  RatingValue: "5",
  links: [],
};
const establishment3: Establishment = {
  FHRSID: 3,
  BusinessName: "Bakery",
  BusinessType: "Another business",
  LocalAuthorityBusinessID: "3",
  RatingDate: "1-1-1990",
  RatingValue: "5",
  links: [],
};

describe("addFavouriteEstablishment", () => {
  it("should add a new establishment to the list", () => {
    const favourites = [establishment1, establishment2];
    const newEstablishment = establishment3;
    const updatedFavourites = addFavouriteEstablishment(
      newEstablishment,
      favourites
    );
    expect(updatedFavourites).toContain(newEstablishment);
    expect(updatedFavourites.length).toBe(3);
  });
});

describe("removeFavouriteEstablishment", () => {
  it("should remove an establishment from the list", () => {
    const favourites = [establishment1, establishment2, establishment3];
    const establishmentToRemove = establishment2;
    const updatedFavourites = removeFavouriteEstablishment(
      establishmentToRemove,
      favourites
    );
    expect(updatedFavourites).not.toContain(establishmentToRemove);
    expect(updatedFavourites.length).toBe(2);
  });

  it("should leave the list unchanged if the establishment is not found", () => {
    const favourites = [establishment1, establishment3];
    const nonExistentEstablishment = establishment2;
    const updatedFavourites = removeFavouriteEstablishment(
      nonExistentEstablishment,
      favourites
    );
    expect(updatedFavourites).toEqual(
      expect.arrayContaining([establishment1, establishment3])
    );
    expect(updatedFavourites.length).toBe(2);
  });
});
