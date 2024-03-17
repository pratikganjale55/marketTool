import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";

import style from "../../styles/news.module.css" ;
import { Link } from "react-router-dom";

const News = () => {
  const [newsData, setData] = useState([]);
  const options = {
    method: "GET",
    url: "https://global-stock-market-api-data.p.rapidapi.com/news/stock_market_news/1",

    headers: {
      "X-RapidAPI-Key": "41336a76c1msh0cbe4d203db0fe6p11889fjsn3914427a718c",
      "X-RapidAPI-Host": "global-stock-market-api-data.p.rapidapi.com",
    },
  };
  const getNews = async () => {
    try {
      const res = await axios.request(options);
      setData(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);
  return (
    <div className={`d-flex vh-100  ${style.news_container}`}>
      <Container>
        {newsData &&
          newsData.map((ele, i) => {
            return (
              <Card key={i} className="mt-3">
                <Card.Body>
                  <Card.Title>{ele.newsTitle}</Card.Title>
                  <Card.Link href={ele.newsUrl} target="_blank">{ele.shotDesc}</Card.Link>
                  <Card.Text className="text-muted">{ele.postedOn}</Card.Text>
                </Card.Body>
               
              </Card>
            );
          })}
      </Container>
      <Container className={`mt-3`}>
           <Card>
            <Card.Header>Articles</Card.Header>
            <ListGroup>
              <ListGroup.Item as={Link} to="/economy" className={style.item}>Economy News </ListGroup.Item>
              <ListGroup.Item as={Link} to="/forex" className={style.item}>Forex News</ListGroup.Item>
              <ListGroup.Item as={Link} to="/cryptocurrency" className={style.item}>Cryptocurrency News</ListGroup.Item>

            </ListGroup>
           </Card>
      </Container>
    </div>
  );
};

export default News;
