import React from 'react';
import { Link } from "react-router-dom";

import {Row, Col} from "react-bootstrap"
function Calendar() {
    return(
    <div style={{ textAlign: "center" }}>
        <h1>Calendar</h1>
        <Link to="/">Home</Link>
        <Row>
        <Col>
          <iframe
            style={{margin:'5%'}}
            src="https://calendar.google.com/calendar/embed?src=c_d45a5e6cf0d4fedfe804fd8f39269699f596aa178cd2c3aa53cb1efec73944fb%40group.calendar.google.com&ctz=America%2FNew_York"
            width="700"
            height="500"
            scrolling="no"
          ></iframe>
        </Col>
        </Row>
        </div>
    );
}
export default Calendar;