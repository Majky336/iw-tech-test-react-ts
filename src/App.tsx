import React, { useState } from "react";
import HomePage from "./pages/HomePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EstablishmentDetailPage from "./pages/EstablishmentDetailPage";
import Layout from "./layouts/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import {
  FavouriteEstablishmentsContext,
  addFavouriteEstablishment,
  removeFavouriteEstablishment,
} from "./context/FavouriteEstablishments";
import { Establishment } from "./api/ratingsAPI";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "establishments",
        children: [
          {
            path: ":establishmentId",
            element: <EstablishmentDetailPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const App: React.FC = () => {
  const [favouriteEstablishments, setFavouriteEstablishments] = useState<
    Establishment[]
  >([]);

  return (
    <FavouriteEstablishmentsContext.Provider
      value={{
        favouriteEstablishments,
        setFavouriteEstablishments,
        addFavouriteEstablishment,
        removeFavouriteEstablishment,
      }}
    >
      <RouterProvider router={router} />
    </FavouriteEstablishmentsContext.Provider>
  );
};

export default App;
