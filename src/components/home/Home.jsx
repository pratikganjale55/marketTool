import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import style from "../../styles/home.module.css";
import { Search } from "react-bootstrap-icons";
import axios from "axios";
import { CompanyContext } from "../context/CompanyProvider";
import Translatetext from "../../translate/TranslateText";
import Lottie from "lottie-react";
import mainStock from "../../lottie/headingLottie.json";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [homeText, setHomeText] = useState({
    stockTool: "",
    subText: "",
    placeholder: "",
  });
  const {
    handleSearchChange,
    searchQuery,
    setSearchResults,
    searchResults,
    handleCompanyDetails,
    changeLang,
  } = useContext(CompanyContext);

  // console.log(searchQuery,setSearchResults )
  const fetchDataFromApi = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://real-time-finance-data.p.rapidapi.com/search",
      params: {
        query: searchQuery,
        language: "en",
      },
      headers: {
        "X-RapidAPI-Key": "d71b1a39femsh75660f052fda3c5p1216fbjsn459b87fd2a28",
        "X-RapidAPI-Host": "real-time-finance-data.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setSearchResults(response.data.data.stock);
      // console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const translateLangauge = async () => {
    const translateTextArr = [
      "Stock Tool",
      "Stock analysis and screening tool for investors",
      "Search for company",
    ];
    const translateHome = await Promise.all(
      translateTextArr.map((ele) => Translatetext(ele))
    );
    const [stockTool, subText, placeholder] = translateHome;
    setHomeText({
      stockTool,
      subText,
      placeholder,
    });
  };

  useEffect(() => {
    translateLangauge();
    const delayApiCall = setTimeout(() => {
      if (searchQuery) {
        fetchDataFromApi();
      }
    }, 2000);

    return () => clearTimeout(delayApiCall);
  }, [searchQuery]);

  return (
    <div
      className={`d-flex align-items-center justify-content-center vh-100`}
      style={{
        position: "relative",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${require("../../assets/images/stockMarket.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        className="w-25 p-3"
        style={{ backgroundColor: "rgba(248, 249, 250, 0.5)" }}
      >
        <div className="d-flex justify-content-center align-item-center">
          <Lottie animationData={mainStock} style={{ height: "200px" }} />
        </div>
        <p className="text-center mb-5">
          {changeLang
            ? homeText.subText
            : "Stock analysis and screening tool for investors."}
        </p>
        <InputGroup>
          <InputGroup.Text>
            <Search size={20} />
          </InputGroup.Text>
          <Form.Control
            placeholder={
              changeLang ? homeText.placeholder : "Search company here"
            }
            onChange={handleSearchChange}
          />
        </InputGroup>
        {loading ? (
          <div
            className={`d-flex justify-content-center align-items-center p-2`}
          >
            <Spinner
              animation="grow"
              size="sm"
              variant="primary"
              className="me-2"
            />
            <p className="mt-3">Loading...</p>
          </div>
        ) : (
          <ListGroup className="mt-3">
            {searchResults.length > 0 &&
              searchResults.map((result, index) => (
                <ListGroup.Item
                  key={index}
                  onClick={() => handleCompanyDetails(result.symbol)}
                  className="cursor-pointer"
                >
                  {result.name}
                </ListGroup.Item>
              ))}
          </ListGroup>
        )}
      </Container>
    </div>
  );
};

export default Home;
