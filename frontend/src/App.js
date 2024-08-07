import React from "react";
import AppRoutes from "../src/routes/routes";
import { AuthProvider } from "./context/AuthContext";

const App = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);

export default App;
