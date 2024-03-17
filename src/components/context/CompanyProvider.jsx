import axios from "axios";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CompanyContext = createContext();

const CompanyProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [companyName, setName] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [data, setData] = useState({});
  const [IssetNotification, setNotificationShow] = useState(false);
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("currentUser");
  const [isAddNotification, setAddNotification] = useState(false);
  const [changeLang, setLanguage] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [isBuyStock, setBuyStock] = useState(false);
  const userId = JSON.parse(localStorage.getItem("currentUser"));

  const handleChangeLang = (lang) => {
    if (lang == "ar") {
      setLanguage(true);
    } else {
      setLanguage(false);
    }
  };
  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setSearchQuery(value);
  };
  const handleCompanyDetails = (name) => {
    setName(name);
    navigate(`/company/${name}`);
  };

  const handleAddWatchList = async (data) => {
    console.log("data", data);
    let storeData = JSON.parse(localStorage.getItem("stockData")) || []; 
    storeData.push(data);
    localStorage.setItem("stockData", JSON.stringify(storeData))
   
   
  };

  // get particular company details //

  // const comapnyNameId = JSON.parse(localStorage.getItem("company")) ;

  const getComapnyOverview = async (id) => {
    const options = {
      method: "GET",
      url: "https://real-time-finance-data.p.rapidapi.com/stock-overview",
      params: {
        symbol: id,
        language: "en",
      },
      headers: {
        "X-RapidAPI-Key": "d71b1a39femsh75660f052fda3c5p1216fbjsn459b87fd2a28",
        "X-RapidAPI-Host": "real-time-finance-data.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      // localStorage.setItem("company", JSON.stringify(companyName))
    } catch (error) {
      console.error(error);
    }
  };
 
    
  setTimeout(() => {
    setBuyStock(false);
  }, 2000);

 

  

  const handleCheckNotification = () => {
    setNotificationShow(true);
    setAddNotification(false);
  };

  return (
    <CompanyContext.Provider
      value={{
        handleSearchChange: handleSearchChange,
        searchQuery: searchQuery,
        setSearchResults: setSearchResults,
        searchResults: searchResults,
        handleCompanyDetails: handleCompanyDetails,
        companyName: companyName,
        handleAddWatchList: handleAddWatchList,
        setIsAdd: setIsAdd,
        isAdd: isAdd,
        storedUser: storedUser,
        getComapnyOverview: getComapnyOverview,
        data: data,
        handleCheckNotification: handleCheckNotification,
        IssetNotification: IssetNotification,
        setNotificationShow: setNotificationShow,
        setAddNotification: setAddNotification,
        isAddNotification: isAddNotification,
        handleChangeLang: handleChangeLang,
        changeLang: changeLang,
        setCardData: setCardData,
        cardData: cardData,
        isBuyStock: isBuyStock,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyProvider;
