import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

import CurrentDay from "./components/CurrentDay";
import Overview from "./components/Overview";
import Error404View from "./components/Error404View";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/focus/:id" element={<CurrentDay />} />
          <Route path="*" element={<Error404View />} />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
