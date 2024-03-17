import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  FloatingLabel,
  Form,
  ListGroup,
  Offcanvas,
  OffcanvasHeader,
  Toast,
} from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import feedStyle from "../../styles/feed.module.css";
import WatchlistTable from "./WatchlistTable";
import { CompanyContext } from "../context/CompanyProvider";
import { Cursor, Trash3, X } from "react-bootstrap-icons";
import emailjs from "emailjs-com";
import latestData from "../../assets/data/data";
import Translatetext from "../../translate/TranslateText";

const Feed = () => {
  const [show, setShow] = useState(false);
  const [addNote, setAddNote] = useState({});
  const [noteData, setNoteData] = useState([]);
  const [isNifty50, setNifty50] = useState(false);
  const handleShowOffcanvas = () => setShow(true);
  const handleCloseOffCanvas = () => setShow(false);
  const { changeLang, isBuyStock } = useContext(CompanyContext);
  const [feedTrans, setFeedTrans] = useState({
    watchlist: "",
    myWatchlist: "",
    addNote: "",
    notePlaceholder: "",
    add: "",
    last: "",
    change: "",
    SBI: "",
    "Indian Railway Catering": "",
    "ICICI Bank": "",
    "Reliance Industries": "",
    "Tata Motors": "",
    "HDFC Bank": "",
    Wipro: "",
    "Tata Power Co.": "",
    Infosys: "",
    "AXIS Bank": "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setAddNote({
      title: value,
    });
  };

  // get note data //
  const getNoteData = () => {
    let noteData = JSON.parse(localStorage.getItem("addNotes")) || [];

    setNoteData(noteData);
  };

  // add note data //
  const handleAddNote = () => {
    const currentDate = new Date();
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const formatDate = currentDate.toLocaleString("en-US", options);

    let noteData = JSON.parse(localStorage.getItem("addNotes")) || [];
    noteData.push({ ...addNote, formatDate });
    localStorage.setItem("addNotes", JSON.stringify(noteData));
    getNoteData();
  };

  const translateWatchListData = async () => {
    const feedArr = [
      "watchlist",
      "my watchlist",
      "addNote",
      "Start typing your note here",
      "Add",
      "last",
      "change",
      "SBI",
      "Indian Railway Catering",
      "ICICI Bank",
      "Reliance Industries",
      "Tata Motors",
      "HDFC Bank",
      "Wipro",
      "Tata Power Co.",
      "Infosys",
      "AXIS Bank",
    ];
    const feedData = await Promise.all(
      feedArr.map((ele) => Translatetext(ele))
    );
    const [
      watchlist,
      myWatchlist,
      addNote,
      notePlaceholder,
      add,
      last,
      change,
      SBI,
      IndianRailwayCatering,
      ICICIBank,
      RelianceIndustries,
      TataMotors,
      HDFCBank,
      Wipro,
      TataPowerCo,
      Infosys,
      AXISBank,
    ] = feedData;
    setFeedTrans({
      watchlist,
      myWatchlist,
      addNote,
      notePlaceholder,
      add,
      last,
      change,
      SBI,
      IndianRailwayCatering,
      ICICIBank,
      RelianceIndustries,
      TataMotors,
      HDFCBank,
      Wipro,
      TataPowerCo,
      Infosys,
      AXISBank,
    });
  };
 
  useEffect(() => {
    getNoteData();
    translateWatchListData();
  
  }, []);
  return (
    <>
      <div className="container p-2" style={{ backgroundColor: "#91C8E4" }}>
        <marquee className="marquee" behavior="left">
          {latestData &&
            latestData.map((ele) => {
              return (
                <span>
                  {" "}
                  | {changeLang ? feedTrans.Wipro : ele.name}{" "}
                  {changeLang ? feedTrans.last : "last"}:{ele.last}{" "}
                  {changeLang ? feedTrans.change : "Change"}:{ele.chg} |{" "}
                </span>
              );
            })}
        </marquee>
      </div>
      <div
        className={`p-2 vh-100`}
        style={{ backgroundColor: "#EEE9DA", margin: 0, padding: 0 }}
      >
        <Container>
          <Card className="p-3">
            <h4>{changeLang ? feedTrans.watchlist : "Watchlist"}</h4>
            {/* // is already buy popup // */}
            {isBuyStock && (
              <Toast bg="primary" className="text-white">
                <Toast.Body>You already buy this stock</Toast.Body>
              </Toast>
            )}
            <CardHeader className="d-flex mt-5">
              <div>
                <h5
                  variant="outline-info"
                  className="me-4"
                  style={{ cursor: "pointer" }}
                  onClick={() => setNifty50(false)}
                >
                  {changeLang ? feedTrans.myWatchlist : "My Watchlist"}
                </h5>
              </div>

              <Button
                variant="info"
                className="ms-auto"
                onClick={handleShowOffcanvas}
              >
                {changeLang ? feedTrans.addNote : "Notepad"}
              </Button>
            </CardHeader>
            <Card.Body>{isNifty50 ? "nifty" : <WatchlistTable />}</Card.Body>
          </Card>
        </Container>
      </div>

      {/* // note book // */}

      <Offcanvas show={show} onHide={handleCloseOffCanvas} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {changeLang ? feedTrans.addNote : "Notepad"}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <hr />
        <Offcanvas.Body>
          <FloatingLabel
            controlId="floatingTextarea2"
            label={
              changeLang ? feedTrans.notePlaceholder : "start typing here..."
            }
          >
            <Form.Control
              as="textarea"
              style={{ height: "100px" }}
              onChange={handleChange}
            />
          </FloatingLabel>
          <div className="d-flex">
            <Button className="ms-auto mt-2" onClick={() => handleAddNote()}>
              {changeLang ? feedTrans.add : "Add"}
            </Button>
          </div>
          <div
            className={`mt-3`}
            style={{ overflow: "flow", maxHeight: "250px" }}
          >
            <ListGroup>
              {noteData &&
                noteData.map((ele, i) => {
                  return (
                    <ListGroup.Item
                      key={i}
                      className="d-flex mt-3"
                      style={{ minHeight: "auto", padding: "10px" }}
                    >
                      <div style={{ width: "80%" }}>
                        <p>{ele.title}</p>
                        <p style={{ fontSize: 12, color: "gray" }}>
                          {ele.date}
                        </p>
                      </div>
                    </ListGroup.Item>
                  );
                })}
            </ListGroup>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Feed;
