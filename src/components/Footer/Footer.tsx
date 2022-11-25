import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="left-footer">
              <span className="copyright">
                <i className="far fa-copyright copyright-icon"></i>
                2022 Airbnb, Inc.
              </span>
              <span className="dot">.</span>
              <Link to={'/'} className="privacy">Privacy</Link>
              <span className="dot">.</span>
              <Link to={'/'} className="terms">Terms</Link>
              <span className="dot">.</span>
              <Link to={'/'} className="sitemap">Sitemap</Link>
              <span className="dot">.</span>
              <Link to={'/'} className="destination">Destinations</Link>
            </div>
            <div className="right-footer d-flex">
              <span className="language">
                <i className="fas fa-globe-africa language-icon"></i>
                <span className="current-lang">
                  English (US)
                </span>
              </span>
              <span className="currency">
              <i className="fas fa-dollar-sign currency-icon"></i>
                <span className="current-currency">USD</span>
              </span>
              <span className="support">
                Support and Resources
                <i className="fas fa-chevron-up support-icon"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
