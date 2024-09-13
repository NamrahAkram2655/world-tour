import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CityList from "./Components/CityList/CityList";
// import { useEffect, useState } from "react";
import CountryList from "./Components/CountryList/CountryList";
import City from "./Components/City/City";
import Form from "./Components/Form/Form";
import { CitiesProvider } from "./Components/Contexts/CitiesContext";
import { AuthProvider } from "./Components/Contexts/FakeAuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { lazy, Suspense } from "react";
import LoaderSpinner from "./Components/LoaderSpinner/LoaderSpinner";

// import HomePage from "./Components/HomePage/HomePage";
// import Pricing from "./Components/Pricing/Pricing";
// import Product from "./Components/Product/Product";
// import Login from "./Components/Login/Login";
// import AppLayout from "./Components/AppLayout/AppLayout";

const HomePage = lazy(() => import("./Components/HomePage/HomePage"));
const Product = lazy(() => import("./Components/Product/Product"));
const Pricing = lazy(() => import("./Components/Pricing/Pricing"));
const Login = lazy(() => import("./Components/Login/Login"));
const AppLayout = lazy(() => import("./Components/AppLayout/AppLayout"));



function App() {

  return (
    <AuthProvider >

      <CitiesProvider>
        <div>

          <BrowserRouter >

            <Suspense fallback={<LoaderSpinner />} >

              <Routes>
                <Route /*path="/"*/ index element={<HomePage />} />
                <Route path="/Product" element={<Product />} />
                <Route path="/Pricing" element={<Pricing />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/AppLayout" element={
                  <ProtectedRoute>
                    <AppLayout />

                  </ProtectedRoute>
                }>

                  {/* <Route index element={<CityList cities={cities} />} />  */}
                  {/* we want k url mai direct cities ayai so use navigate */}
                  <Route index element={<Navigate replace to="Cities" />} />
                  <Route path="Cities" element={<CityList />} />

                  <Route path="Cities/:id" element={<City />} /> {/* ye url walay kaam k liyai kia h */}

                  <Route path="Countries" element={<CountryList />} />
                  <Route path="Form" element={<Form />} />

                </Route>

                {/* <Route path="*" element={"not"} /> */}
              </Routes>
            </Suspense>
          </BrowserRouter>

        </div>
      </CitiesProvider>
    </AuthProvider >
  );
}

export default App;
