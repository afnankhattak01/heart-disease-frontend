import { Fragment } from "react";
import { Link } from "react-router-dom";
import { GiHeartInside } from "react-icons/gi";

const SideBar = () => {
  return (
    <Fragment>
      <div className="sidebar shadow-lg" id="style-1">
        <nav className="sidebar-nav ">
          <div className="text-center fs-1 text-white mb-4">
            <GiHeartInside />{" "}
          </div>
          <ul className="nav-for-sidebar">
            <li>
              {" "}
              {/* <Link to={"/"} className="li-101">
                Check Heart Disases
              </Link> */}
            </li>
            <li>
              {" "}
              <Link to={"/home/gracecalculator"} className="li-101">
                Calculate Grace Risk
              </Link>
            </li>
            <li>
              {" "}
              <Link to={"/home/calculateFramingham"} className="li-101">
                Framingham Risk Calculation
              </Link>
            </li>

            <li>
              {" "}
              <Link to={"/home/calculateTimiScore"} className="li-101">
                Timi Risk Calculation
              </Link>
            </li>

            <li>
              {" "}
              <Link to={"/downloadpreviosrecord"} className="li-101">
                Download  Previous Record
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

export default SideBar;
