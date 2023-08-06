import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const MainHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();

    navigate("/");
  };

  return (
    <Fragment>
      <nav className="mainNavProtected shadow-lg bg-light">
        <div className="protectedContainer nav-101">
          <div className="d-flex">
            <h2 className="main-heading">Heart Disease Prediction</h2>
          </div>

          <ul className="nav-ul">
            <li>
              <Link to={"/home"}>Home</Link>
            </li>
            <li
              onClick={() => {
                handleLogout();
              }}
            >
              <Link to={"/home"}>Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default MainHeader;
