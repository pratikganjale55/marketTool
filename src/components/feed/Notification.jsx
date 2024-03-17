import React from "react";
import { Offcanvas } from "react-bootstrap";


const Notification = ({
  IssetNotification,
  setNotificationShow,
  notificationLowest,
  notificationHighest,
}) => {
  return (
    <div>
      <Offcanvas
        show={IssetNotification}
        onHide={() => setNotificationShow(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="color-muted">
            Notification
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div
            style={{
              padding: "10px",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <p>{notificationHighest}</p>
          </div>
          <div
            style={{
              padding: "10px",
              marginTop: "20px",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <p>{notificationLowest}</p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};


export default Notification;
