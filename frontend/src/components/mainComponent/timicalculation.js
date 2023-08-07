import { Fragment, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useUserContext } from "../../context/userContext";
import Loader from "../../common/loader";
import axiosPublic from "../../helpers/axiosPublic";

const addUserSchema = yup.object().shape({
  patientAge: yup
    .number()
    .positive("Patient Age must be a positive number")
    .required("Patient Age is a required field")
    .typeError("Invalid data type!"),

  heartRate: yup
    .number()
    .positive("Heart Rate must be a positive number")
    .required("Heart Rate  is a required field")
    .typeError("Invalid data type!"),

  systolicBloodPressure: yup
    .number()
    .positive("Systolic Blood Pressure must be a positve number")
    .required("Systolic Blood Pressure is a required field")
    .typeError("Invalid data type!"),

  killip: yup
    .boolean("")
    .required("Kill Ip is a requried field")
    .oneOf([true, false], "Kill Ip is requried field")
    .typeError("Kill Ip Must be type Boolean"),

  LBBB: yup
    .boolean("")
    .required("Anterior ST Elevation is a requried field")
    .oneOf([true, false], "Anterior ST Elevation is requried field")
    .typeError("Anterior ST Elevation Must be type Boolean"),

  angina: yup
    .boolean("")
    .required("Angina is a requried field")
    .oneOf([true, false], "Angina is requried field")
    .typeError("Angina Must be type Boolean"),

  weight: yup
    .number()
    .positive("weight must be a positive number")
    .required("weight is a required field")
    .typeError("Invalid data type!"),

  timetoTreatment: yup
    .number()
    .positive("Time to Treatment be a positive number")
    .required("Time to Treatment is a required field")
    .typeError("Invalid data type!"),
});

const TimiScoreCalc = () => {
  const [isReuslt, setResultState] = useState(false);

  const [timiScore, setTimiScore] = useState(0);

  const [riskPPercentage, setRiskPercentage] = useState(0);
  const [result, setResult] = useState(
    "% risk of all-cause mortality at 30 days."
  );

  const { state, Logout, fetchInitialData } = useUserContext();

  useEffect(() => {
    fetchInitialData();
  }, []);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addUserSchema),
  });

  const handleResuts = (score) => {
    switch (score) {
      case 0:
        setRiskPercentage(0.8);
        return setResultState(true);

      case 1:
        setRiskPercentage(1.6);
        return setResultState(true);

      case 2:
        setRiskPercentage(2.2);
        return setResultState(true);

      case 3:
        setRiskPercentage(4.4);
        return setResultState(true);

      case 4:
        setRiskPercentage(7.3);
        return setResultState(true);

      case 5:
        setRiskPercentage(12.4);
        return setResultState(true);

      case 6:
        setRiskPercentage(16.1);
        return setResultState(true);

      case 7:
        setRiskPercentage(23.4);
        return setResultState(true);

      case 8:
        setRiskPercentage(26.8);
        return setResultState(true);

      case 9:
        setRiskPercentage(35.9);
        return setResultState(true);

      case 10:
        setRiskPercentage(35.9);
        return setResultState(true);

      case 11:
        setRiskPercentage(35.9);
        return setResultState(true);

      case 12:
        setRiskPercentage(35.9);
        return setResultState(true);

      case 13:
        setRiskPercentage(35.9);
        return setResultState(true);

      case 14:
        setRiskPercentage(35.9);
        return setResultState(true);

      case 15:
        setRiskPercentage(35.9);
        return setResultState(true);

      case 16:
        setRiskPercentage(35.9);
        return setResultState(true);

      default:
        setRiskPercentage(0);
        return setResultState(true);
    }
  };

  const onSubmit = async (data) => {
    let TimiScore = 0;

    const {
      patientAge,
      systolicBloodPressure,
      heartRate,
      timetoTreatment,
      weight,
      angina,
      killip,
      LBBB,
    } = data;

    if (patientAge < 65) {
      TimiScore += 0;
    }
    if (patientAge >= 65 && patientAge <= 74) {
      TimiScore += 2;
    }
    if (patientAge >= 75) {
      TimiScore += 3;
    }

    if (systolicBloodPressure < 100) {
      TimiScore += 3;
    }
    if (heartRate > 100) {
      TimiScore += 2;
    }

    if (killip) {
      TimiScore += 2;
    }

    if (weight < 67) {
      TimiScore += 1;
    }

    if (angina) {
      TimiScore += 1;
    }
    if (LBBB) {
      TimiScore += 1;
    }

    if (timetoTreatment > 4) {
      TimiScore += 1;
    }

    handleResuts(TimiScore);
    setTimiScore(TimiScore);

    data = {
      ...data,
      user: state.user,
      timiScore: TimiScore,
      riskPPercentage
    };
    try {
      const resp = await axiosPublic.post("/api/timi/timirisk", data);
      reset();
    } catch (error) {
      console.log("err", error.message);
      reset();
    }
  };

  return (
    <Fragment>
      {state.isLoading ? (
        <Loader />
      ) : (
        <section className="gracecalculatorpage mt-3">
          <div className="container">
            <div className="card">
              <div className="card-header">
                <strong>Timi Risk Calculator</strong>
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-4 col-12">
                      <label className="mb-3">Patient Age</label>
                      <input
                        placeholder="Age"
                        className="form-control"
                        {...register("patientAge")}
                        name="patientAge"
                      />

                      <p className="text-danger">
                        {errors.patientAge?.message}
                      </p>
                    </div>

                    <div className="col-md-4 col-12">
                      <label className="mb-3">
                        Systolic Blood Pressure (SBP)
                      </label>
                      <input
                        placeholder="Systolic Blood Pressure"
                        className="form-control"
                        {...register("systolicBloodPressure")}
                        name="systolicBloodPressure"
                      />
                      <p className="text-danger">
                        {errors.systolicBloodPressure?.message}
                      </p>
                    </div>

                    <div className="col-md-4 col-12">
                      <label className="mb-3">Heart Rate </label>
                      <input
                        placeholder="Systolic Blood Pressure"
                        className="form-control"
                        {...register("heartRate")}
                        name="heartRate"
                      />
                      <p className="text-danger">{errors.heartRate?.message}</p>
                    </div>

                    <div className="col-md-4 col-12">
                      <label className="mb-3">Killip Class II-IV</label>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          {...register("killip")}
                          name="killip"
                          id="flexRadioDefault2"
                          value={true}
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          Yes
                        </label>
                      </div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          {...register("killip")}
                          name="killip"
                          id="flexRadioDefault2"
                          value={false}
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          No
                        </label>
                      </div>
                      <p className="text-danger">{errors.killip?.message}</p>
                    </div>

                    <div className="col-md-4 col-12">
                      <label className="mb-3">weight</label>
                      <input
                        placeholder="weight"
                        className="form-control"
                        {...register("weight")}
                        name="weight"
                      />

                      <p className="text-danger">{errors.weight?.message}</p>
                    </div>

                    <div className="col-md-4 col-12">
                      <label className="mb-3">
                        Anterior ST Elevation or LBBB
                      </label>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          {...register("LBBB")}
                          name="LBBB"
                          id="flexRadioDefault2"
                          value={true}
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          Yes
                        </label>
                      </div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          {...register("LBBB")}
                          name="LBBB"
                          id="flexRadioDefault2"
                          value={false}
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          No
                        </label>
                      </div>
                      <p className="text-danger">{errors.LBBB?.message}</p>
                    </div>

                    <div className="col-md-4 col-12">
                      <label className="mb-3">
                        Diabetes, Hypertension or Angina
                      </label>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          {...register("angina")}
                          name="angina"
                          id="flexRadioDefault2"
                          value={true}
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          Yes
                        </label>
                      </div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          {...register("angina")}
                          name="angina"
                          id="flexRadioDefault2"
                          value={false}
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          No
                        </label>
                      </div>
                      <p className="text-danger">{errors.angina?.message}</p>
                    </div>

                    <div className="col-md-4 col-12">
                      <label className="mb-3">Time To Treatment</label>
                      <input
                        placeholder="Time to Treatment"
                        className="form-control"
                        {...register("timetoTreatment")}
                        name="timetoTreatment"
                      />

                      <p className="text-danger">
                        {errors.timetoTreatment?.message}
                      </p>
                    </div>

                    <div className="text-end">
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
                    </div>

                    <div className="col">
                      {isReuslt ? (
                        <Fragment>
                          <h4> Your Timi Score :</h4>
                          <p className="text-danger fw-bold">
                            {riskPPercentage}
                            {result}
                          </p>
                        </Fragment>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default TimiScoreCalc;
