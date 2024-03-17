import React, { useContext, useEffect, useState } from "react";
import { CompanyContext } from "../context/CompanyProvider";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Navbar,
  Row,
  Toast,
} from "react-bootstrap";
import styles from "../../styles/company.module.css";
import Chart from "./Chart";
import BalanceSheet from "./BalanceSheet";
import * as xlsx from "xlsx";
import {
  ArrowDownCircle,
  ArrowUpRightCircle,
  ArrowUpRightSquare,
  PlusSquare,
} from "react-bootstrap-icons";
import axios from "axios";
import { useParams } from "react-router-dom";

 

const Company = () => {
  const {
    handleAddWatchList,
    isAdd,
    setIsAdd,
    data,
    getComapnyOverview,
    companyName
    
  } = useContext(CompanyContext);
  const [statement , setStatement ] = useState([])
  const [balance_sheet, setBalance_sheet] = useState([])
  const {id} = useParams() ;
  console.log(id)

  // console.log(data)
  const handleDownloadExcel = () => {
    const workSheet = xlsx.utils.json_to_sheet([data]);
    const workbook = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(workbook, workSheet, "CompanyData");
    const excelBuffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const bufferToXlsx = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    // console.log([excelBuffer])
    const url = window.URL.createObjectURL(bufferToXlsx);
    const a = document.createElement("a");
    a.href = url;
    a.download = "company_data.xlsx";
    a.click();
  };
  const getChartData = async() => {
    // console.log(companyName , companyName)
    const options = {
      method: 'GET',
      url: 'https://real-time-finance-data.p.rapidapi.com/company-income-statement',
      params: {
        symbol: id ,
        period: 'QUARTERLY',
        language: 'en'
      },
      headers: {
        'X-RapidAPI-Key': 'd71b1a39femsh75660f052fda3c5p1216fbjsn459b87fd2a28',
        'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      setStatement(response.data.data.income_statement);
      // console.log("data" ,response.data.data.income_statement)
    } catch (error) {
      console.error(error);
    }
  }
  const getBalanceSheet = async() => {
    
    const options = {
        method: 'GET',
        url: 'https://real-time-finance-data.p.rapidapi.com/company-balance-sheet',
        params: {
          symbol: id,
          period: 'QUARTERLY',
          language: 'en'
        },
        headers: {
          'X-RapidAPI-Key': 'd71b1a39femsh75660f052fda3c5p1216fbjsn459b87fd2a28',
          'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          setBalance_sheet(response.data.data.balance_sheet);
          // console.log(response.data.data.balance_sheet)
          
      } catch (error) {
          console.error(error);
      }
  }

  useEffect(() => {
    getComapnyOverview(id);
    getChartData() ;
    getBalanceSheet()
    
  }, []);
  return (
    <>
      {
        <div
          className={`ms-auto ${styles.toast}`}
          style={{ color: "white", fontSize: "20px" }}
        >
          <Toast
            show={isAdd}
            onClose={() => setIsAdd(false)}
            autohide
            bg="success"
          >
            <Toast.Body>Add company to Watchlist</Toast.Body>
          </Toast>
        </div>
      }
      <div className={`p-5 h-auto`} style={{ backgroundColor: "#EEE9DA" }}>

        <Card>
          <Card.Body className="d-flex p-3">
            <div className="col-md-8">
              <div className="d-flex  mr-3">
                <Card.Title
                  className={`fw-bold me-3`}
                  style={{ fontSize: "35px", color: "#0c356a" }}
                >
                  {data.name}
                </Card.Title>
                <Card.Text className="me-4 fw-bold">₹{data.price}</Card.Text>
              </div>
              <Card.Link href={data.company_website} target="_blank">
                <ArrowUpRightSquare
                  size={20}
                  className="me-2"
                ></ArrowUpRightSquare>
                {data.company_website}
              </Card.Link>
              <Card className="mt-4">
                <Card.Body className="d-flex justify-content-around">
                  <div>
                    <ListGroup>
                      <ListGroup.Item className={`d-flex mb-3 justify-content-around align-center`}
                       style={{
                        width: "220px",
                        backgroundColor: "#91C8E4",
                      }}
                      >
                        <span>Symbol</span>
                        <span>{data.symbol}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className={`d-flex mb-3 justify-content-around align-center`} 
                       style={{
                        width: "220px",
                        backgroundColor: "#91C8E4",
                      }}
                      >
                        <span>Open</span>
                        <span>{data.open}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className={`d-flex mb-3 justify-content-around align-center`} 
                       style={{
                        width: "220px",
                        backgroundColor: "#91C8E4",
                      }}
                      >
                        <span>Hig/Low</span>
                        <span>
                          {data.high}/{data.low}
                        </span>
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                  <div>
                    <ListGroup>
                      <ListGroup.Item
                        className={`d-flex mb-3 justify-content-around align-center`} 
                        style={{
                          width: "220px",
                          backgroundColor: "#91C8E4",
                        }}
                      >
                        <span>Price</span>
                        <span>{data.price}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className={`d-flex mb-3 justify-content-around align-center`}
                      style={{
                        width: "220px",
                        backgroundColor: "#91C8E4",
                      }}
                      >
                        <span>Change</span>
                        <span>₹{data.change}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className={`d-flex mb-3 justify-content-around align-center`}
                      style={{
                        width: "220px",
                        backgroundColor: "#91C8E4",
                      }}
                      >
                        <span>Previous Close</span>
                        <span>{data.previous_close}</span>
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                  <div>
                    <ListGroup>
                      <ListGroup.Item className={`d-flex mb-3 justify-content-around align-center`} 
                      style={{
                        width: "220px",
                        backgroundColor: "#91C8E4",
                      }}
                      >
                        <span>change</span>
                        <span>{data.change_percent} %</span>
                      </ListGroup.Item>
                      <ListGroup.Item className={`d-flex mb-3 justify-content-around align-center`} 
                      style={{
                        width: "220px",
                        backgroundColor: "#91C8E4",
                      }}
                      >
                        <span>year low</span>
                        <span>{data.year_low}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className={`d-flex mb-3 justify-content-around align-center`}  
                      style={{
                        width: "220px",
                        backgroundColor: "#91C8E4",
                      }}
                      >
                        <span>year high</span>
                        <span>{data.year_high}</span>
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4 p-3">
              <div className="d-flex justify-content-around">
                <Button
                  className="ml-auto"
                  variant="info"
                  onClick={handleDownloadExcel}
                >
                  <ArrowDownCircle
                    size={"20"}
                    className="me-2"
                  ></ArrowDownCircle>
                  Convert To Excel
                </Button>
                <Button
                  className="ml-auto"
                  variant="info"
                  onClick={() => handleAddWatchList(data)}
                >
                  <PlusSquare size={"20"} className="me-2"></PlusSquare>
                  Add to Watchlist
                </Button>
              </div>
              <Card className="border-0 me-3 p-3">
                <Card.Title>
                  <b>About</b>
                </Card.Title>
                <Card.Text style={{overflow : "auto", maxHeight : "250px", textOverflow : "ellipsis" }}>
                  {data.about}
                </Card.Text>
              </Card>
            </div>
          </Card.Body>
        </Card>
        <Card className="mt-5 p-3">
          <Card.Title>Chart</Card.Title>
          <Chart statement={statement}/>
        </Card>
        <Card className="mt-5 p-3">
          <Card.Title>Balance Sheet</Card.Title>
          <BalanceSheet balance_sheet={balance_sheet} />
        </Card>
      </div>
    </>
  );
};

export default Company;
