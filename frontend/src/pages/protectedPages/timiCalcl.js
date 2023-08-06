import { Fragment } from "react";
import TimiCalculationScore from "../../components/mainComponent/timicalculation";
import MainPageLayout from "../../layout/mainLayout";
const TimiScoreCalc = () => {
  return (
    <Fragment>
      <MainPageLayout>
        <TimiCalculationScore></TimiCalculationScore>
      </MainPageLayout>
    </Fragment>
  );
};

export default TimiScoreCalc;
