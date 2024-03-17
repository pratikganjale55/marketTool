import { Route, Routes } from "react-router-dom";
import "./App.css";

import NavbarStock from "./components/navbar/NavbarStock";
import Home from "./components/home/Home";
import News from "./components/news/News";
import Feed from "./components/feed/Feed";
import Articles from "./components/news/Articles";
import { useContext } from "react";
import { CompanyContext } from "./components/context/CompanyProvider";
import Company from "./components/company/Company";

import Notification from "./components/feed/Notification";
import WacthlistCard from "./components/card/WacthlistCard";

function App() {
  const {
    companyName,
    handleAddWatchList,
    IssetNotification,
    setNotificationShow,
  } = useContext(CompanyContext);
  const notificationLowest = localStorage.getItem("notificationLowest");
  const notificationHighest = localStorage.getItem("notificationHighest");

  return (
    <div className="App">
      <NavbarStock />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/news" element={<News />} />

       
        <Route path={`/company/:id`} element={<Company />} />
        <Route path="/card" element={<WacthlistCard />} />
        <Route path="/economy" element={<Articles />} />
        <Route path="/forex" element={<Articles />} />
        <Route path="/cryptocurrency" element={<Articles />} />
      </Routes>

      <Notification
        IssetNotification={IssetNotification}
        setNotificationShow={setNotificationShow}
        notificationLowest={notificationLowest}
        notificationHighest={notificationHighest}
      />
    </div>
  );
}

export default App;
