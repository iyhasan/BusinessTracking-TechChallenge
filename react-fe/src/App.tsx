import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protected-route";
import { openRoutes } from "./routes/open-routes";
import { protectedRoutes } from "./routes/protected-routes";

const App: React.FC = () => {
  return (
        <Router>
          <Routes>
            {openRoutes.map((route, index) => (
              <Route key={index} {...route} />
            ))}
            <Route element={<ProtectedRoute />}>
              {protectedRoutes.map((route, index) => (
                <Route 
                key={index} 
                {...route} />
              ))}
            </Route>
          </Routes>
        </Router>
  )
}

export default App;