import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import { SearchPage } from "../pages/SearchPage";
import { SurahPage } from "../pages/SurahPage";
import DetailSurahPage from "../pages/DetailSurahPage";
import DoaPerTemaPage from "../pages/DoaPerTemaPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/surah", element: <SurahPage /> },
      { path: "/surah/:surah_number", element: <DetailSurahPage /> },
      { path: "/rekomendasi_doa", element: <DoaPerTemaPage /> },
    ],
  },
]);

export default router;
