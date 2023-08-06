import { Fragment } from "react";
import GraceCalculatorComp from "../../components/mainComponent/gracecalculatorComp";
import MainPageLayout from "../../layout/mainLayout";
const GraceCalculator = () => {
  return (
    <Fragment>
      <MainPageLayout>
        <GraceCalculatorComp />
      </MainPageLayout>
    </Fragment>
  );
};

export default GraceCalculator;
