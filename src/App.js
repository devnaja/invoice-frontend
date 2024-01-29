import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/index";
import Signup from "./pages/Auth/signup";
import Signin from "./pages/Auth/signin";
import ReceivableList from "./pages/Receivable/index";
import PayableList from "./pages/Payable/index";
import Setting from "./pages/Setting/index";
import DetailsInfo from "pages/Receivable/accordionDetails";
import DetailsInfoPayable from "pages/Payable/accordionDetails";
import ForgotPassword from "pages/Auth/forgotPassword";
import PrivateRoutes from "./utils/privateRoutes";
import History from "pages/History";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/invoice-frontend" element={<Homepage />} />

          <Route path="/account-receivable" element={<ReceivableList />} />
          <Route path="/account-receivable/:id" element={<DetailsInfo />} />
          <Route path="/account-payable" element={<PayableList />} />
          <Route path="/account-payable/:id" element={<DetailsInfoPayable />} />
          <Route path="/request-history" element={<History />} />
          {/* <Route path="/account-payable" element={<Payable />} /> */}
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
