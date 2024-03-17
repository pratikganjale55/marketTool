import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, Card, Image, Button } from "react-bootstrap";
import {
  ArrowDown,
  ArrowDownUp,
  ArrowUp,
  Buildings,
} from "react-bootstrap-icons";
import { CompanyContext } from "../context/CompanyProvider";
import Lottie from "lottie-react";
import emptyLottie from "../../lottie/emptyBox.json" ;
const WacthlistCard = () => {
  const { cardData, setCardData } = useContext(CompanyContext);
  const colors = [
    "#0582FA",
    "#FF9900",
    "#E51837",
    "#feff9c",
    "#c8a8d5",
    "#d2ccf2",
    "#EDBC4C",
    "#e6f2a2",
    "#d5f9eb",
  ];

  const storedUser = JSON.parse(localStorage.getItem("currentUser"));
 const getWatchlistData = async () => {
    // try {
    //   let data = await axios.get("http://localhost:8000/card");
    //   const particularUserData = data.data.filter(
    //     (data) => data.userId === storedUser.id
    //   );
    //   console.log();
    //   setCardData(particularUserData);
    //   console.log("data", particularUserData);
    // } catch (error) {
    //   console.log("error while getting card data");
    // }
    let data = JSON.parse(localStorage.getItem("stockData")) ;
    setCardData(data);
  };

  useEffect(() => {
    getWatchlistData();
  }, []);
  return (
    <>
      <Container>
        <div className="row">
          {cardData?.length <= 0 ? (
            <div className="d-flex justify-content-center align-items-center mt-5" >
              <Lottie animationData={emptyLottie}/>
            </div>
            
          ) : (
            cardData?.map((ele, index) => {
              const color = colors[index % colors.length];
              return (
                <div className="col-md-3">
                  <Card
                    className=" mt-3"
                    style={{ backgroundColor: color, color: "white" }}
                  >
                    <div
                      className="d-flex justify-content-between p-3"
                      style={{ height: "150px" }}
                    >
                      <div className="d-flex align-items-center">
                        <p>
                          <Buildings />
                        </p>
                        <p className="ms-3">
                          {ele.name}
                          <p style={{ fontSize: "12px" }}>{ele.symbol}</p>
                        </p>
                      </div>
                      <div className="ms-5">
                        <p style={{ margin: "0", padding: "0" }}>last close</p>
                        {ele.previous_close}
                      </div>
                    </div>
                    <div style={{ background: "#181A20", color: "white" }}>
                      <div className="d-flex align-items-center justify-content-center">
                        <div
                          style={{
                            background: "#414a4c",
                            padding: "10px",
                            color: "white",
                            borderRadius: "5px",
                            marginTop: "5px",
                          }}
                        >
                          Rs. {ele.price}
                          {/* <ArrowDownUp /> */}
                        </div>
                      </div>
                      <div className="d-flex mt-2 p-3 justify-content-around">
                        <div>
                          <p
                            style={{
                              color:
                                ele.change_percent > 0 ? "#12D18E" : "#FA6268",
                              margin: "0",
                              padding: "0",
                            }}
                          >
                            {ele.change_percent}%
                          </p>
                          change
                        </div>
                        <div>
                          <p
                            style={{
                              color: "#12D18E",
                              margin: "0",
                              padding: "0",
                            }}
                          >
                            {ele.low} <ArrowDown />
                          </p>
                          low
                        </div>
                        <div>
                          <p
                            style={{
                              color: "#12D18E",
                              margin: "0",
                              padding: "0",
                            }}
                          >
                            {ele.high} <ArrowUp />
                          </p>
                          high
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })
          )}
        </div>
      </Container>
    </>
  );
};

export default WacthlistCard;
