import { Fragment, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CalculateFirminghamScore } from "../../helpers/calculateFirghamScore";
import { useUserContext } from "../../context/userContext";
import Loader from "../../common/loader";
import axios from "axios";

const addUserSchema = yup.object().shape({
  patientAge: yup
    .number()
    .positive("Patient Age must be a positive number")
    .required("Patient Age is a required field")
    .typeError("Invalid data type!"),
  hdlCholesterol: yup
    .number()
    .positive("Hdl Cholesterol must be a positive number")
    .required("Hdl Cholesterol  is a required field")
    .typeError("Invalid data type!"),
  systolicBloodPressure: yup
    .number()
    .positive("Systolic Blood Pressure must be a positve number")
    .required("Systolic Blood Pressure is a required field")
    .typeError("Invalid data type!"),

  totalCholesterol: yup
    .number()
    .positive("Total Cholesterol must be a positve number")
    .required("Total Cholesterol is a required field")
    .typeError("Invalid data type!"),

  gender: yup
    .string()
    .required("Gender is a required field ")
    .typeError("Invalid Type"),

  smoker: yup
    .boolean("")
    .required("Smoker is a requried field")
    .oneOf([true, false], "Smoker is requried field")
    .typeError("Smoker Must be type Boolean"),
  bloodPressureTreated: yup
    .boolean("")
    .required("Blood Pressure Treated is a requried field")
    .oneOf([true, false], "Blood Pressure Treated is requried field")
    .typeError("Blood Pressure Treated Must be type Boolean"),
});

const FraminghamScoreCalc = () => {
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

  const [firminghamScore, setFirghamScore] = useState(0);
  const [deathProb, setDeathProb] = useState(0);

  const [isResult, settisResult] = useState(false);

  const onSubmit = async (data) => {
    let results = CalculateFirminghamScore(data);

    setFirghamScore(results.firminghamRiskScore);
    setDeathProb(results.deathProbability);
    settisResult(true);
    data = {
      ...data,
      user: state.user,
      firminghamScore: results.firminghamRiskScore,
      deathProbability: results.deathProbability,
    };
    try {
      const resp = await axios.post("/api/firmingham/firminghamRisk", data);
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
                <strong>Framingham Risk Calculator</strong>
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-4 col-12">
                      <label className="mb-3">Gender</label>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          {...register("gender")}
                          name="gender"
                          id="flexRadioDefault2"
                          value={"MALE"}
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          Male
                        </label>
                      </div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          {...register("gender")}
                          name="gender"
                          id="flexRadioDefault2"
                          value={"FEMALE"}
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          Female
                        </label>
                      </div>
                      <p className="text-danger">{errors.gender?.message}</p>
                    </div>

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
                      <label className="mb-3">HDL Cholesterol</label>
                      <input
                        placeholder="HDL Cholesterol"
                        className="form-control"
                        {...register("hdlCholesterol")}
                        name="hdlCholesterol"
                      />
                      <p className="text-danger">
                        {errors.hdlCholesterol?.message}
                      </p>
                    </div>
                    <div className="col-md-4 col-12">
                      <label className="mb-3">Total Cholesterol</label>
                      <input
                        placeholder="Total Cholesterol "
                        className="form-control"
                        {...register("totalCholesterol")}
                        name="totalCholesterol"
                      />
                      <p className="text-danger">
                        {errors.totalCholesterol?.message}
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
                      <label className="mb-3"> Smoker</label>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="smoker"
                          id="flexRadioDefault2"
                          value={true}
                          {...register("smoker")}
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          yes
                        </label>
                      </div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          {...register("smoker")}
                          name="smoker"
                          id="flexRadioDefault2"
                          value={false}
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          No
                        </label>
                      </div>
                      <p className="text-danger">{errors.smoker?.message}</p>
                    </div>
                    <div className="col-md-4 col-12">
                      <label className="mb-3">
                        Blood Pressure Treated With Medicine
                      </label>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          {...register("bloodPressureTreated")}
                          name="bloodPressureTreated"
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
                          {...register("bloodPressureTreated")}
                          name="bloodPressureTreated"
                          id="flexRadioDefault2"
                          value={false}
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          No
                        </label>
                      </div>
                      <p className="text-danger">
                        {errors.bloodPressureTreated?.message}
                      </p>
                    </div>
                    <div className="text-end">
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
                    </div>

                    <div className="col">
                      {isResult ? (
                        <Fragment>
                          <h4> Your Firmingham Risk Score :</h4>
                          <p className="text-danger fw-bold">
                            {`${firminghamScore}% Firmingham  Risk Score`}
                          </p>
                          <p className="text-danger fw-bold">
                            {`${deathProb}% 10 years risk of death due to coronary incident`}
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

export default FraminghamScoreCalc;
