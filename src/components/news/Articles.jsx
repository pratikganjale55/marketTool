import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";

const Articles = () => {
  const [economyNewsData, setEconomyData] = useState([]);

  const endpoint = useLocation();
  const path = endpoint.pathname;
  // console.log(path);
  useEffect(() => {
    let title = "";
    switch (path) {
      case "/economy":
        title = "economy_news";
        break;
      case "/forex":
        title = "forex_news";
        break;
      case "/cryptocurrency":
        title = "cryptocurrency_news";
        break;
      default:
        title = "stock_market_news";
        break;
    }

    getEconomyNews(title);
  }, [path]);

  const getEconomyNews = async (title) => {
    try {
      const options = {
        method: "GET",
        url: `https://global-stock-market-api-data.p.rapidapi.com/news/${title}/1`,

        headers: {
          "X-RapidAPI-Key":
            "41336a76c1msh0cbe4d203db0fe6p11889fjsn3914427a718c",
          "X-RapidAPI-Host": "global-stock-market-api-data.p.rapidapi.com",
        },
      };
      const res = await axios.request(options);
      setEconomyData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{backgroundColor : "#EEE9DA" }}>
      {economyNewsData &&
        economyNewsData.map((ele, i) => {
          return (
            <Row className="me-3 p-3">
              <Col md={3}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{ele.newsTitle}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      - {ele.postedBy}
                    </Card.Subtitle>
                    <Card.Text className="text-muted">{ele.shotDesc}</Card.Text>
                    <div className="d-flex justify-content-between">
                      <Card.Link href={ele.newsUrl} target="_blank">
                        Read more
                      </Card.Link>
                      <p className="text-muted">{ele.postedOn}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{ele.newsTitle}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      - {ele.postedBy}
                    </Card.Subtitle>
                    <Card.Text className="text-muted">{ele.shotDesc}</Card.Text>
                    <div className="d-flex justify-content-between">
                      <Card.Link href={ele.newsUrl} target="_blank">
                        Read more
                      </Card.Link>
                      <p className="text-muted">{ele.postedOn}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{ele.newsTitle}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      - {ele.postedBy}
                    </Card.Subtitle>
                    <Card.Text className="text-muted">{ele.shotDesc}</Card.Text>
                    <div className="d-flex justify-content-between">
                      <Card.Link href={ele.newsUrl} target="_blank">
                        Read more
                      </Card.Link>
                      <p className="text-muted">{ele.postedOn}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{ele.newsTitle}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      - {ele.postedBy}
                    </Card.Subtitle>
                    <Card.Text className="text-muted">{ele.shotDesc}</Card.Text>
                    <div className="d-flex justify-content-between">
                      <Card.Link href={ele.newsUrl} target="_blank">
                        Read more
                      </Card.Link>
                      <p className="text-muted">{ele.postedOn}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          );
        })}
    </div>
  );
};

export default Articles;
