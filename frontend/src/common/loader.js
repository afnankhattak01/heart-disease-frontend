import { Fragment } from "react";
import BarLoader from "react-spinners/BarLoader";

const Loader = () => {
  return (
    <Fragment>
      <div className="mt-5 text-center loader ">
        <BarLoader color={"green"} />
      </div>
    </Fragment>
  );
};

export default Loader;
