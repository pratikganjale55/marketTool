import axios from "axios";
import { Chart } from "chart.js";
import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import { CompanyContext } from "../context/CompanyProvider";
import { useParams } from "react-router-dom";
const balance_sheet = [
  {
    year: 2022,
    currency: "USD",
    cash_and_short_term_investments: 16.2,
    total_assets: 352755000000,
    total_liabilities: 302083000000,
    total_equity: 50672000000,
    shares_outstanding: 15908118000,
    price_to_book: 47.3962,
    return_on_assets_percent: 21.21,
    return_on_capital_percent: 39,
  },
  {
    year: 2021,
    currency: "USD",
    cash_and_short_term_investments: 13.3,
    total_assets: 351002000000,
    total_liabilities: 287912000000,
    total_equity: 63090000000,
    shares_outstanding: 16406397000,
    price_to_book: 39.25,
    return_on_assets_percent: 20.18,
    return_on_capital_percent: 35.17,
  },
  {
    year: 2020,
    currency: "USD",
    cash_and_short_term_investments: 14.43,
    total_assets: 323888000000,
    total_liabilities: 258549000000,
    total_equity: 65339000000,
    shares_outstanding: 17001802000,
    price_to_book: 39.1481,
    return_on_assets_percent: 12.51,
    return_on_capital_percent: 21.46,
  },
  {
    year: 2019,
    currency: "USD",
    cash_and_short_term_investments: 15.94,
    total_assets: 338516000000,
    total_liabilities: 248028000000,
    total_equity: 90488000000,
    shares_outstanding: 17773060000,
    price_to_book: 29.611,
    return_on_assets_percent: 11.35,
    return_on_capital_percent: 19.02,
  },
  {
    year: 2018,
    currency: "USD",
    cash_and_short_term_investments: 18.34,
    total_assets: 365725000000,
    total_liabilities: 258578000000,
    total_equity: 107147000000,
    shares_outstanding: 18981592000,
    price_to_book: 26.7709,
    return_on_assets_percent: 11.96,
    return_on_capital_percent: 18.8,
  },
  {
    year: 2017,
    currency: "USD",
    cash_and_short_term_investments: 24.56,
    total_assets: 375319000000,
    total_liabilities: 241272000000,
    total_equity: 134047000000,
    shares_outstanding: 20537248000,
    price_to_book: 23.0459,
    return_on_assets_percent: 11,
    return_on_capital_percent: 16.49,
  },
  {
    year: 2016,
    currency: "USD",
    cash_and_short_term_investments: 25.56,
    total_assets: 321686000000,
    total_liabilities: 193437000000,
    total_equity: 128249000000,
    shares_outstanding: 21329252000,
    price_to_book: 25.0782,
    return_on_assets_percent: 12.26,
    return_on_capital_percent: 18.81,
  },
  {
    year: 2015,
    currency: "USD",
    cash_and_short_term_investments: 26.37,
    total_assets: 290345000000,
    total_liabilities: 170990000000,
    total_equity: 119355000000,
    shares_outstanding: 22301324000,
    price_to_book: 28.172,
    return_on_assets_percent: 17.05,
    return_on_capital_percent: 26.94,
  },
  {
    year: 2014,
    currency: "USD",
    cash_and_short_term_investments: 26.13,
    total_assets: 231839000000,
    total_liabilities: 120292000000,
    total_equity: 111547000000,
    shares_outstanding: 23459360000,
    price_to_book: 31.7305,
    return_on_assets_percent: 14.96,
    return_on_capital_percent: 22.84,
  },
  {
    year: 2013,
    currency: "USD",
    cash_and_short_term_investments: 26.15,
    total_assets: 207000000000,
    total_liabilities: 83451000000,
    total_equity: 123549000000,
    shares_outstanding: 25192664000,
    price_to_book: 30.6965,
    return_on_assets_percent: 15.99,
    return_on_capital_percent: 23.67,
  },
  {
    year: 2012,
    currency: "USD",
    cash_and_short_term_investments: 25.16,
    total_assets: 176064000000,
    total_liabilities: 57854000000,
    total_equity: 118210000000,
    shares_outstanding: 26339376000,
    price_to_book: 33.4933,
    return_on_assets_percent: 23.61,
    return_on_capital_percent: 35.44,
  },
];
const BalanceSheet = () => {
  const headings = Object.keys(balance_sheet[0]);
  const finalHeading = headings.filter((ele) => ele !== "year")

 

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th></th>
            {balance_sheet.map((year, i) => (
              <th key={i}>{year.year}</th>
            ))}
          </tr>
        </thead>
        <tbody>
            {
                finalHeading.map((ele, i) => {
                return <tr key={i}>
                    <td>{ele}</td>
                    {
                       balance_sheet.map((item, i) => {
                        // console.log(item, ele)
                          return <td>{item[ele]}</td>
                       }) 
                    }
                </tr>
               }) 
            }
        </tbody>
      </Table>
    </div>
  );
};

export default BalanceSheet;
