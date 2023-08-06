import { Fragment, useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { CalcualteGraceRiskFunc } from "../../helpers/calculategracerisk";
import { useUserContext } from "../../context/userContext";
import Loader from "../../common/loader";

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
  Creatinine: yup
    .number()
    .positive("Creatinine must be a positve number")
    .required("Creatinine is a required filed")
    .typeError("Invalid data type!"),

  Killip: yup
    .string()
    .required("Killip is a required field")
    .typeError("Killip Class Must be type Boolean"),

  cardiacArrest: yup
    .boolean("")
    .required(" Cardiac Arrest is a requried field")
    .oneOf([true, false], "Cardiac Arrest is requried field")
    .typeError("Cardiac Arrest Must be type Boolean"),

  stSegment: yup
    .boolean("")
    .required("Deviations of ST Segments is a requried field")
    .oneOf([true, false], "Deviations of ST Segments is requried field")
    .typeError("Deviations of ST Segments Must be type Boolean"),
  abnormalCardiac: yup
    .boolean("")
    .required("Abnormal Cardiac is a requried field")
    .oneOf([true, false], "Abnormal Cardiac is requried field")
    .typeError("Abnormal Cardiac Must be type Boolean"),
});

const GraceCalculatorComp = () => {
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

  const onSubmit = async (data) => {
    let grScore = CalcualteGraceRiskFunc(data);

    data = { ...data, user: state.user, graceScore: grScore };
    try {
      const resp = await axios.post("/api/riskcalculation/gracerisk", data);
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
                <strong>Grace Risk Calculator</strong>
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
                      <label className="mb-3">Heart Rate (HR)</label>
                      <input
                        placeholder="Heart Rate"
                        className="form-control"
                        {...register("heartRate")}
                        name="heartRate"
                      />
                      <p className="text-danger">{errors.heartRate?.message}</p>
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
                      <label className="mb-3">Creatinine</label>

                      <input
                        placeholder="Creatinine"
                        className="form-control"
                        {...register("Creatinine")}
                        name="Creatinine"
                      />
                      <p className="text-danger">
                        {errors.Creatinine?.message}
                      </p>
                    </div>

                    <div className="col-md-4 col-12">
                      <label className="mb-3">Killip Class</label>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          id="fist"
                          value={"Cardiogenic shock"}
                          {...register("Killip")}
                          name="Killip"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Cardiogenic shock
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          id="second"
                          value={"Pulmonary edema"}
                          {...register("Killip")}
                          name="Killip"
                        />
                        <label class="form-check-label" for="second">
                          Pulmonary edema
                        </label>
                      </div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          {...register("Killip")}
                          name="Killip"
                          id="third"
                          value={"Rales"}
                        />
                        <label class="form-check-label" for="third">
                          Rales and/or JVD
                        </label>
                      </div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          {...register("Killip")}
                          name="Killip"
                          id="fourth"
                          value={"No CHF"}
                        />
                        <label class="form-check-label" for="fourth">
                          No CHF
                        </label>
                      </div>
                      <p className="text-danger">{errors.Killip?.message}</p>
                    </div>

                    <div className="col-md-4 col-12">
                      <label className="mb-3">
                        Cardiac arrest at admission
                      </label>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          {...register("cardiacArrest")}
                          id="flexRadioDefault2"
                          name="cardiacArrest"
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
                          {...register("cardiacArrest")}
                          name="cardiacArrest"
                          id="flexRadioDefault2"
                          value={false}
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          No
                        </label>
                        <p className="text-danger">
                          {errors.cardiacArrest?.message}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <label className="mb-3">
                        {" "}
                        Deviations of the ST segment
                      </label>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="stSegment"
                          id="flexRadioDefault2"
                          value={true}
                          {...register("stSegment")}
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          yes
                        </label>
                      </div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          {...register("stSegment")}
                          name="stSegment"
                          id="flexRadioDefault2"
                          value={false}
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          No
                        </label>
                      </div>
                      <p className="text-danger">{errors.stSegment?.message}</p>
                    </div>
                    <div className="col-md-4 col-12">
                      <label className="mb-3"> Abnormal cardiac enzymes</label>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          {...register("abnormalCardiac")}
                          name="abnormalCardiac"
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
                          {...register("abnormalCardiac")}
                          name="abnormalCardiac"
                          id="flexRadioDefault2"
                          value={false}
                        />
                        <label class="form-check-label" for="flexRadioDefault2">
                          No
                        </label>
                      </div>
                      <p className="text-danger">
                        {errors.abnormalCardiac?.message}
                      </p>
                    </div>
                    <div className="text-end">
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
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

export default GraceCalculatorComp;
