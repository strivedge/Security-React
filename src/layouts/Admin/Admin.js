// ** React Imports
import React, { useEffect, useState, useRef } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

// ** Core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

// ** Custom Components
import useRoutesByRole from "components/useRoutesByRole";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

// ** Third Party Components
import PerfectScrollbar from "perfect-scrollbar";
import ReactSnackBar from "react-js-snackbar";
import { TiMessages } from "react-icons/ti";

import logo from "assets/img/react-logo.png";

var ps;

const Admin = () => {
  const location = useLocation();
  const mainPanelRef = useRef(null);
  const { menuRoutes, error } = useRoutesByRole();

  const [sidebarOpened, setsidebarOpened] = useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );

  const [showSnackBar, setshowSnackbar] = useState(false);
  const [SnackMessage] = useState(
    "Unable to connect to the backend server..."
  );

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);

  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }

      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.path}
            element={prop.component}
            key={key}
            exact
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (routes) => {
    let activeRoute = "Brand";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getBrandText(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          location.pathname.indexOf(
            routes[i].layout + routes[i].path
          ) !== -1
        ) {
          return routes[i].name;
        }
      }
    }

    return activeRoute;
  };

  useEffect(() => {
    setshowSnackbar(error);
  }, [error]);

  useEffect(() => {
    setTimeout(() => {
      setshowSnackbar(false);
    }, 5000);
  }, [showSnackBar]);

  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            <ReactSnackBar
              Icon={(
                <span>
                  {" "}
                  <TiMessages size={25} />{" "}
                </span>
              )}
              Show={showSnackBar}
            >
              {SnackMessage}
            </ReactSnackBar>

            <Sidebar
              routes={menuRoutes}
              logo={{
                outterLink: "https://netswitch.net",
                text: "Unity",
                imgSrc: logo,
              }}
              activeColor="blue"
              toggleSidebar={toggleSidebar}
            />
            <div className="main-panel" ref={mainPanelRef} data={color}>
              <AdminNavbar
                brandText={getBrandText(menuRoutes)}
                toggleSidebar={toggleSidebar}
                sidebarOpened={sidebarOpened}
              />
              <Routes>
                {getRoutes(menuRoutes)}
                <Route
                  path="/"
                  element={<Navigate to="/admin/dashboard" replace />}
                />
              </Routes>
              {/* we don't want the Footer to be rendered on map page */}
              {location.pathname === "/admin/maps" ? null : (
                <Footer fluid />
              )}
            </div>
          </div>

        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default Admin;
