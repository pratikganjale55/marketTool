import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Modal,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import style from "../../styles/navbar.module.css";
import { BellFill, PersonCircle } from "react-bootstrap-icons";
import { CompanyContext } from "../context/CompanyProvider";
import Translatetext from "../../translate/TranslateText";
const NavbarStock = () => {
  const [translatedText, setTranslatedText] = useState({
    stockTool: "",
    home: "",
    feed: "",
    news: "",
    profile: "",
    logout: "",
    lang: "",
    card: "",
  });
  const [logoutModal, setLogoutModal] = useState(false);
  const {
    handleCheckNotification,
    isAddNotification,
    handleChangeLang,
    changeLang,
  } = useContext(CompanyContext);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = () => {
    setLogoutModal(!logoutModal);
  };

  const handleLogoutFinal = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
    setLogoutModal(false);
  };
  useEffect(() => {
    const translateTexts = async () => {
      const texts = [
        "Stock Tool",
        "Home",
        "Feed",
        "News",
        "Profile",
        "Logout",
        "lang",
        "card",
      ];
      const translateNavbar = await Promise.all(
        texts.map((text) => Translatetext(text))
      );
      const [
        stockTool,
        home,
        feed,
        news,
        profile,
        logout,
        lang,
        card,
      ] = translateNavbar;
      setTranslatedText({
        stockTool,
        home,
        feed,
        news,
        profile,
        logout,
        lang,
        card,
      });
    };
    translateTexts();
  }, []);
  return (
    <div>
      <Navbar
        expand="lg"
        style={{ backgroundColor: "#4682A9", color: "white" }}
      >
        <Container>
          <Navbar.Brand className="text-white fs-18">
            {changeLang ? translatedText.stockTool : "Stock Tool"}
          </Navbar.Brand>
          <Navbar.Collapse className="ml-5">
            <Nav>
              <Nav.Link as={Link} to="/" className=" text-white me-3 fs-18">
                {changeLang ? translatedText.home : "Home"}
              </Nav.Link>
              <Nav.Link as={Link} to="/feed" className="text-white me-3 fs-18">
                {changeLang ? translatedText.feed : "Feed"}
              </Nav.Link>
              <Nav.Link as={Link} to="/news" className="text-white me-3 fs-18">
                {changeLang ? translatedText.news : "News"}
              </Nav.Link>
              <Nav.Link as={Link} to="/card" className="text-white me-3 fs-18">
                {changeLang ? translatedText.card : "My Stock"}
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <div className="d-flex me-2">
                <PersonCircle size={28} className="me-2" />
                <Dropdown>
                  <Dropdown.Toggle style={{ backgroundColor: "#749BC2" }}>
                    PRATIK
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="me-3">
                   
                    <Dropdown.Item onClick={handleLogout}>
                      <Button>
                        {changeLang ? translatedText.logout : "Logout"}
                      </Button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div
                className="ml-2"
                style={{ cursor: "pointer" }}
                onClick={handleCheckNotification}
              >
                <BellFill
                  size={25}
                  className="me-2"
                  style={{ color: isAddNotification ? "red" : "" }}
                ></BellFill>
              </div>
            </Nav>
            <Nav>
              <Dropdown>
                <Dropdown.Toggle>
                  {changeLang ? translatedText.lang : "Lang"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleChangeLang("eng")}>
                    Eng
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleChangeLang("ar")}>
                    Ar
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={logoutModal} onHide={() => setLogoutModal(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Are you sure you want to Logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setLogoutModal(false)}>
            No
          </Button>
          <Button variant="info" onClick={() => handleLogoutFinal()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NavbarStock;


