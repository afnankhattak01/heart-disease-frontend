import { Fragment } from "react";
import MainHeader from "../components/layoutComponents/header";
import SideBar from "../components/layoutComponents/sidebar";
const MainPageLayout = ({ children }) => {
  return (
    <Fragment>
      <div className="mainLayoutContainer">
        <MainHeader></MainHeader>

        <SideBar />

        <main className="main-class">{children}</main>
      </div>
    </Fragment>
  );
};

export default MainPageLayout;
