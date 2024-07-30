/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

const companyUrl = (process.env.REACT_APP_COM === 'sec' ? process.env.REACT_APP_PRO_SEC_URL : process.env.REACT_APP_PRO_NET_URL)
const company = (process.env.REACT_APP_COM === 'sec' ? 'Securli Limited' : 'Netswitch Inc.')

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href={companyUrl}>
              Securli
            </a>
          </li>{" "}
          <li className="nav-item">
            <a
              className="nav-link"
              href={companyUrl}
            >
              About us
            </a>
          </li>{" "}
        </ul>

        <div className="copyright">
          © {new Date().getFullYear()}{" "}by{" "}
          <a href={companyUrl} target="_blank">
            {company}
          </a>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
