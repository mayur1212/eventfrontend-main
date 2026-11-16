import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import Home from "./pages/Home/home";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import Login from "./components/login/login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Events from "./pages/dashboard/Events";
import EventManagement from "./pages/dashboard/EventManagement";
import Profile from "./pages/dashboard/Profile";
import NotFound from "./pages/NotFound/NotFound";
import Payment from "./pages/Payment/Payment";
import KitsBuy from "./pages/KitsBuy/KitsBuy";
import KitCheckout from "./pages/KitsBuy/KitCheckout";
import KitProducts from "./pages/dashboard/KitProducts";
import KitOrders from "./pages/dashboard/KitOrders";

// Guards
import ProtectedRoute from "./components/ProtectedRoute";

// Context
import { UserProvider } from "./context/UserContext";

// Programs
import FirstLegoLeague from "./pages/programs/FirstLegoLeague";
import FirstTechChallenge from "./pages/programs/FirstTechChallenge";
import FirstRoboticsCompetition from "./pages/programs/FirstRoboticsCompetition";
import YouthSafety from "./pages/programs/YouthSafety";

// Community
import Students from "./pages/community/Students";
import Mentors from "./pages/community/Mentors";
import Alumni from "./pages/community/Alumni";
import Partners from "./pages/community/Partners";

// Help
import DonateC from "./pages/help/Donate";
import ContactUsC from "./pages/help/ContactUsC";
import Sponsorship from "./pages/help/Sponsorship";

// About
import AboutFirst from "./pages/about/AboutFirst";
import Leadership from "./pages/about/Leadership";
import Careers from "./pages/about/Careers";

// Animation
import AnimatiAbout from "./components/AnimatiAbout/AnimatiAbout";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer position="top-center" autoClose={1500} />

        <Routes>

          {/* ADMIN PROTECTED ROUTES */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute role="admin">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:id" element={<EventManagement />} />
            <Route path="profile" element={<Profile />} />
            <Route path="products" element={<KitProducts />} />
            <Route path="kit-orders" element={<KitOrders />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* ✅ PUBLIC ROUTES */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="payment" element={<Payment />} />
            <Route path="kits-buy" element={<KitsBuy />} />
            <Route path="kits-buy/checkout/:productId" element={<KitCheckout />} />

            {/* Programs */}
            <Route path="programs/first-lego-league" element={<FirstLegoLeague />} />
            <Route path="programs/first-tech-challenge" element={<FirstTechChallenge />} />
            <Route path="programs/first-robotics-competition" element={<FirstRoboticsCompetition />} />
            <Route path="youth-safety" element={<YouthSafety />} />

            {/* Community */}
            <Route path="community/students" element={<Students />} />
            <Route path="community/mentors" element={<Mentors />} />
            <Route path="community/alumni" element={<Alumni />} />
            <Route path="community/partners" element={<Partners />} />

            {/* Help */}
            <Route path="help/donate" element={<DonateC />} />
            <Route path="help/contactus" element={<ContactUsC />} />
            <Route path="help/sponsorship" element={<Sponsorship />} />

            {/* About */}
            <Route path="about-first" element={<AboutFirst />} />
            <Route path="leadership" element={<Leadership />} />
            <Route path="careers" element={<Careers />} />

            <Route path="animation" element={<AnimatiAbout />} />

            <Route path="*" element={<NotFound />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
