// ** React Imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ** Store & Actions
import { useDispatch } from "react-redux";
import { authUserLogout } from "views/login/store";

// ** Reactstrap Imports
import {
  Nav,
  Input,
  Modal,
  Navbar,
  NavLink,
  Collapse,
  Container,
  ModalHeader,
  NavbarBrand,
  DropdownMenu,
  DropdownItem,
  NavbarToggler,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";

// ** Third Party Components
import classNames from "classnames";

function AdminNavbar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [collapseOpen, setcollapseOpen] = useState(false);
  const [modalSearch, setmodalSearch] = useState(false);
  const [color, setcolor] = useState("navbar-transparent");

  useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };

  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };

  // this function is to open the Search modal
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };

  const handleLogout = () => {
    dispatch(authUserLogout());
    navigate("/");
  };

  return (<>
    <Navbar className={classNames("navbar-absolute", color)} expand="lg">
      <Container fluid>
        <div className="navbar-wrapper">
          <div
            className={classNames("navbar-toggle d-inline", {
              toggled: props.sidebarOpened,
            })}
          >
            <NavbarToggler onClick={props.toggleSidebar}>
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </NavbarToggler>
          </div>
          <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
            {props.brandText}
          </NavbarBrand>
        </div>
        <NavbarToggler onClick={toggleCollapse}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>

        <Collapse navbar isOpen={collapseOpen}>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle
                nav
                caret
                color="default"
                onClick={(e) => e.preventDefault()}
              >
                <div className="photo">
                  <img alt="..." src={require("assets/img/anime3.png")} />
                </div>
                {/* <div>{userData?.user_name}</div> */}
                <b className="caret d-none d-lg-block d-xl-block" />
                <p className="d-lg-none">Log out</p>
              </DropdownToggle>
              <DropdownMenu className="dropdown-navbar" right tag="ul">
                <NavLink tag="li">
                  <DropdownItem
                    className="nav-item"
                    onClick={() => navigate("/admin/profile")}
                  >
                    Profile
                  </DropdownItem>
                </NavLink>
                <NavLink tag="li">
                  <DropdownItem
                    className="nav-item"
                    onClick={() => navigate("/admin/company-profile")}
                  >
                    Company Profile
                  </DropdownItem>
                </NavLink>
                <DropdownItem divider tag="li" />
                <NavLink tag="li">
                  <DropdownItem
                    className="nav-item"
                    onClick={() => handleLogout()}
                  >
                    Log out
                  </DropdownItem>
                </NavLink>
              </DropdownMenu>
            </UncontrolledDropdown>
            <li className="separator d-lg-none" />
          </Nav>
        </Collapse>
      </Container>
    </Navbar>

    <Modal
      isOpen={modalSearch}
      modalClassName="modal-search"
      toggle={toggleModalSearch}
    >
      <ModalHeader>
        <Input placeholder="SEARCH" type="text" />
        <button
          aria-label="Close"
          className="close"
          onClick={toggleModalSearch}
        >
          <i className="tim-icons icon-simple-remove" />
        </button>
      </ModalHeader>
    </Modal>
  </>);
}

export default AdminNavbar;
