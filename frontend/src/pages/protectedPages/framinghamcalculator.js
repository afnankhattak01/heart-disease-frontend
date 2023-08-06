import { Fragment } from "react";
import FraminghamScoreCalc from "../../components/mainComponent/framinghamscoreComp";
import MainPageLayout from "../../layout/mainLayout";
const FraminghamScore = () => {
  return (
    <Fragment>
      <MainPageLayout>
        <FraminghamScoreCalc />
      </MainPageLayout>
    </Fragment>
  );
};

export default FraminghamScore;
