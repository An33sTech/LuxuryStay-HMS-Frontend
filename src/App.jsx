import React, { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "@admin/ProtectedRoute"
import Navbar from "@website/Navbar"
import Footer from "@website/Footer"
import Page from "./Pages/website/Page"
import SelectRoom from "./Booking/SelectRoom"
import CheckInForm from "./Booking/CheckInForm"
import BookRoom from "./Booking/BookRoom"
import InvoiceRoom from "./Booking/InvoiceRoom"
import Gallery from "./Pages/website/Gallery"
import Blog from "./Pages/website/Blog"
import Services from "./Pages/website/Services"
import ContactForm from "./Pages/website/ContactForm"
import LoginPage from "./Pages/admin/Login"
import IndexPage from "./Pages/admin/Index"
import UsersDetails from "./Pages/admin/Users.jsx"
import LogoutPage from "./Pages/admin/Logout.jsx"
import RegisterPage from "./Pages/admin/Register"
import ReservationsPage from "./Pages/admin/Reservations.jsx"
import RoomsPage from "./Pages/admin/Rooms.jsx"
import RoomAddPage from "./Pages/admin/RoomAddPage.jsx"
import RoomEditPage from "./Pages/admin/RoomEditPage.jsx"
import FeedbackDetails from "./Pages/admin/Feedback.jsx"
import Profile from "./Pages/admin/Profile.jsx"

function App() {
  const isAdmin = window.location.pathname.startsWith('/admin');

  useEffect(() => {
    const loadAssets = (assets) => {
      assets.forEach((asset) => {
        const element = document.createElement(asset.type);
        if (asset.type === "link") {
          element.rel = "stylesheet";
          element.href = asset.href;
        } else if (asset.type === "script") {
          element.src = asset.src;
          element.defer = true;
        }
        document.head.appendChild(element);

        // Cleanup on unmount
        return () => {
          document.head.removeChild(element);
        };
      });
    };

    if (isAdmin) {
      // Admin-specific assets
      loadAssets([
        { type: "link", href: "../src/assets/admin/plugins/metismenu/metisMenu.min.css" },
        { type: "link", href: "../src/assets/admin/plugins/metismenu/mm-vertical.css" },
        { type: "link", href: "../src/assets/admin/plugins/simplebar/css/simplebar.css" },
        { type: "link", href: "../src/assets/admin/css/bootstrap.min.css" },
        { type: "link", href: "../src/assets/admin/plugins/datatable/css/dataTables.bootstrap5.min.css" },
        { type: "link", href: "../src/assets/admin/css/style.css" },
        { type: "link", href: "../src/assets/admin/css/bootstrap-extended.css" },
        { type: "link", href: "../src/assets/admin/sass/main.css" },
        { type: "link", href: "../src/assets/admin/sass/dark-theme.css" },
        { type: "link", href: "../src/assets/admin/sass/responsive.css" },
        { type: "script", src: "../src/assets/admin/js/bootstrap.bundle.min.js" },
        { type: "script", src: "../src/assets/admin/plugins/metismenu/metisMenu.min.js" },
        { type: "script", src: "../src/assets/admin/plugins/apexchart/apexcharts.min.js" },
        { type: "script", src: "../src/assets/admin/plugins/datatable/js/dataTables.bootstrap5.min.js" },
        { type: "script", src: "../src/assets/admin/plugins/simplebar/js/simplebar.min.js" },
        { type: "script", src: "../src/assets/admin/js/dashboard2.js" },
        { type: "script", src: "../src/assets/admin/js/main.js" },
      ]);
    } else {
      // Website-specific assets
      loadAssets([
        { type: "link", href: "../src/styles/index.css" },
      ]);
    }
  }, [isAdmin]);

  return (
    <div className={isAdmin ? 'admin-root' : 'website-root'}>
      <BrowserRouter>
        {isAdmin ? (
          <Routes>
            <Route path="/admin/login" Component={LoginPage} />
            <Route path="/admin" Component={() => (<ProtectedRoute><IndexPage /></ProtectedRoute>)} />
            <Route path="/admin/users" Component={() => (<ProtectedRoute><UsersDetails /></ProtectedRoute>)} />
            <Route path="/admin/logout" Component={() => (<ProtectedRoute><LogoutPage /></ProtectedRoute>)} />
            <Route path="/admin/reservations" Component={() => (<ProtectedRoute><ReservationsPage /></ProtectedRoute>)} />
            <Route path="/admin/rooms" Component={() => (<ProtectedRoute><RoomsPage /></ProtectedRoute>)} />
            <Route path="/admin/room-new" Component={() => (<ProtectedRoute><RoomAddPage /></ProtectedRoute>)} />
            <Route path="/admin/edit-room/:roomId" Component={() => (<ProtectedRoute><RoomEditPage /></ProtectedRoute>)} />
            <Route path="/admin/feedbacks" Component={() => (<ProtectedRoute><FeedbackDetails /></ProtectedRoute>)} />
            <Route path="/admin/profile/:userId" Component={() => (<ProtectedRoute><Profile /></ProtectedRoute>)} />
            <Route path="/admin/register" Component={() => (<ProtectedRoute><RegisterPage /></ProtectedRoute>)} />
          </Routes>
        ) : (
          <>
            <div className="">
              <Navbar />
              <Routes>
                <Route path="/" element={<Page />} />
                <Route path="/selectroom" element={<SelectRoom />} />
                <Route path="/bookroom/:roomId" element={<BookRoom />} />
                <Route path="/invoiceroom/:reservationId" element={<InvoiceRoom />} />
                <Route path="/checkin" element={<CheckInForm />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<ContactForm />} />
              </Routes>
              <Footer />
            </div>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}


export default App
