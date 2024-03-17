import React, { useContext, useEffect, useState } from "react";
import watchlistStyle from "../../styles/feed.module.css";
import { Stack, Trash3 } from "react-bootstrap-icons";
import { Button, Modal, Offcanvas, Pagination, Toast } from "react-bootstrap";
import { CompanyContext } from "../context/CompanyProvider";
import emailjs from "@emailjs/browser";
import Notification from "./Notification";
import NiftyChart from "./NiftyChart";
import Translatetext from "../../translate/TranslateText";
import axios from "axios";
import Lottie from "lottie-react";
import emptyLottie from "../../lottie/emptyBox.json";
// 3qnVY9F313TCeMigGHa8446C

const WatchlistTable = () => {
  const [watchListData, setWatchListData] = useState([]);
  const [deleteModal, setDeleteModel] = useState(false);
  const [itemId, setId] = useState(null);
  const [notification, setNotification] = useState({});
  const [stocks, setStocks] = useState(watchListData);
  const [lowestPrice, setLowestPrice] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [watchlistTranslate, setWatlistTrans] = useState({
    MyWatchlist: "",
    symbol: "",
    name: "",
    price: "",
    ratio: "",
    previousClose: "",
    prePostMarket: "",
  });
  const { setAddNotification, changeLang } =
    useContext(CompanyContext);
  const [hoverItem, setHoverItem] = useState();
  const [isDivOpen, setIsDivOpen] = useState(false);
  const itemPerPage = 5;
  const indexOfLastPage = currentPage * itemPerPage;
  const indexFirstPage = indexOfLastPage - itemPerPage;
  const currentItems = watchListData.slice(indexFirstPage, indexOfLastPage);
 

  const getWatchListData = () => {
    let storeData = JSON.parse(localStorage.getItem("stockData")) || [];
    setWatchListData(storeData);
  };

 


 

  const getCurrentStockData = () => {
    if (watchListData.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * watchListData.length);

    const updatedStock = watchListData.map((item, i) => {
      if (i == randomIndex) {
        const priceChange = Math.random() * 10 - 5;
        console.log("priceChange", priceChange);
        const price = parseFloat((item.price + priceChange).toFixed(2));
        const previous_close = item.price;

        return {
          ...item,
          price: price,
          previous_close: previous_close,
        };
      }
      return item;
    });

    // add to watchlist in that
    const value = updatedStock.map((item) => item.price);
    const highestPrice = Math.max(...value);
    const lowestPrice = Math.min(...value);
    // console.log(lowestPrice)
    const highestPriceStock = updatedStock.find(
      (item) => item.price === highestPrice
    );
    const lowestPriceStock = updatedStock.find(
      (item) => item.price === lowestPrice
    );

    if (highestPriceStock) {
      const newNotification = `${highestPriceStock.name} has highest price - Rs.${highestPrice}`;
      console.log(newNotification);
      setNotification(newNotification);

      setAddNotification(true);
      localStorage.setItem("notificationHighest", newNotification);
     
    }
    if (lowestPriceStock) {
      const newNotification = `${lowestPriceStock.name} has lowest price - Rs.${lowestPrice}`;
      setLowestPrice(newNotification);
      setAddNotification(true);

      localStorage.setItem("notificationLowest", newNotification);
    
    }
    setWatchListData(updatedStock);
    // handleUpdateWatchList(updatedStock)
    // sendEmail()
    console.log(updatedStock);
  };

  const changeWatchListText = async () => {
    const watchlistHeading = [
      "Symbol",
      "Name",
      "Price",
      "Ratio",
      "Previous close",
      "PrePostMarket",
    ];
    const convertHeading = await Promise.all(
      watchlistHeading.map((ele) => Translatetext(ele))
    );
    const [symbol, name, price, ratio, previousClose, prePostMarket] =
      convertHeading;
    setWatlistTrans({
      symbol,
      name,
      price,
      ratio,
      previousClose,
      prePostMarket,
    });
  };
  const handleNameHover = (item) => {
    setHoverItem(item);
    setIsDivOpen(true);
    console.log("item", hoverItem);
  };

  const handleNameHoverLeave = () => {
    setIsDivOpen(false);
  };
  useEffect(() => {
    getWatchListData();
    getCurrentStockData();
    changeWatchListText();
    const interval = setInterval(getCurrentStockData, 50000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <table
        className={`table mt-5 custom-table ${watchlistStyle.watchListTable}`}
      >
        <thead>
          <tr>
            <th>{changeLang ? watchlistTranslate.symbol : "Symbol"}</th>
            <th>{changeLang ? watchlistTranslate.name : "Name"}</th>
            <th>{changeLang ? watchlistTranslate.price : "Price"}</th>
            <th>{changeLang ? watchlistTranslate.ratio : "Ratio"}</th>
            <th>
              {changeLang ? watchlistTranslate.previousClose : "Previous close"}
            </th>
            <th>
              {changeLang
                ? watchlistTranslate.prePostMarket
                : "Pre/Post Market"}
            </th>
           
          </tr>
        </thead>
        {watchListData.length <= 0 ? (
          <tbody>
            <tr>
              <td colSpan="7" className="text-center">
                <div className="d-flex justify-content-center align-items-center">
                  <Lottie animationData={emptyLottie} />
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {currentItems &&
              currentItems.map((item, i) => (
                <tr key={i}>
                  <td>{item.symbol}</td>
                  <td
                    onMouseEnter={(e) => handleNameHover(item)}
                    onMouseLeave={(e) => handleNameHoverLeave()}
                    style={{ color: "blue", cursor: "grabbing" }}
                  >
                    {item.name}
                  </td>
                  <td>{item.price}</td>
                  <td
                    style={{
                      color: item.company_pe_ratio < 0 ? "red" : "green",
                    }}
                  >
                    {item.company_pe_ratio}
                  </td>
                  <td>{item.previous_close}</td>
                  <td>
                    {item.pre_or_post_market_change
                      ? item.pre_or_post_market_change
                      : "-"}
                  </td>
                  
                </tr>
              ))}
          </tbody>
        )}
        <tfoot>
          <tr>
            <td colSpan="8">
              <Pagination>
                <Pagination.Prev
                  className="me-3"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                ></Pagination.Prev>
                <span>{currentPage}</span>
                <Pagination.Next
                  className="ms-3"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={indexOfLastPage === watchlistStyle.length}
                ></Pagination.Next>
              </Pagination>
            </td>
          </tr>
        </tfoot>
      </table>

      {/* // Nifty chart //  */}

      <div className="d-flex align-items-center justify-content-center vh-100 mt-5">
        <NiftyChart />
      </div>

    


      {isDivOpen && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "40%",
            zIndex: 1,
            backgroundColor: "#feff9c",
            padding: "10px",
            width: "300px",
          }}
        >
          <p>Name : {hoverItem.name}</p>
          <p>Year high : {hoverItem.year_high}</p>
          <p>Year low : {hoverItem.year_low}</p>
          <p>Volume : {hoverItem.volume}</p>
        </div>
      )}

    
    </div>
  );
};

export default WatchlistTable;
