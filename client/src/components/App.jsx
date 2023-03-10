


import React from 'react';
import "./App.css";
import BranchForm from "./BranchForm";
import FormSubmitted from "./FormSubmitted";
import Main from "./Main";
import { Routes, Route } from "react-router-dom";
import InvalidPage from "./InvalidPage";
import DetailsForm from "./DetailsForm";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Main />}/>
        {/* <Route index element={<BranchForm />} /> */}
        <Route path="/submit" element={<FormSubmitted />} />
        <Route path="/form" element={<DetailsForm />} />
        <Route path="/error" element={<InvalidPage />} />
    </Routes>
  );
}

export default App;
