import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Menu, Space } from "antd";
import { AntDesignOutlined, DownOutlined } from "@ant-design/icons";

const MainHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();

    navigate("/");
  };
  const items = [
    {
      label: <Link to={"/profile"}>Profile</Link>,
      key: "0",
    },
    {
      label: (
        <span
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </span>
      ),
      key: "1",
    },
  ];
  return (
    <Fragment>
      <nav className="mainNavProtected shadow-lg bg-light">
        <div className="protectedContainer nav-101">
          <div className="d-flex">
            <h2 className="main-heading">Heart Disease Prediction</h2>
          </div>
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <Space>
              <Avatar
                style={{
                  width: 60,
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "10px 0 10px 0",
                }}
                icon={<AntDesignOutlined className="fs-3" />}
              />
            </Space>
          </Dropdown>
        </div>
      </nav>
    </Fragment>
  );
};

export default MainHeader;
