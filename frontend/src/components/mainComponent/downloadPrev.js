import { Fragment, useState, useEffect } from "react";
import { useUserContext } from "../../context/userContext";
import Loader from "../../common/loader";
import axios from "axios";
import { message } from "antd";
import jsPDF from "jspdf";
import "@react-pdf-viewer/core/lib/styles/index.css";

const TimiColumns = [
  {
    title: "Patient Age",
    field: "patientAge",
  },
  {
    title: "Heart Rate",
    field: "heartRate",
  },
  {
    title: "Systolic Blood Pressure",
    field: "systolicBloodPressure",
  },
  {
    title: "Timi Risk",
    field: "timiRisk",
  },
  {
    title: "Risk Precentage (%)",
    field: "riskPercentage",
  },
];

const firminghamColumns = [
  {
    title: "Patient Age",
    field: "patientAge",
  },
  {
    title: "Total Cholestrol",
    field: "totalCholesterol",
  },
  {
    title: "Systolic Blood Pressure",
    field: "systolicBloodPressure",
  },
  {
    title: "Firmingham Score",
    field: "firminghamScore",
  },
  {
    title: "Death Probability (%)",
    field: "deathProbability",
  },
];

const graceRiskColumns = [
  {
    title: "Patient Age",
    field: "patientAge",
  },
  {
    title: "Heart Rate",
    field: "heartRate",
  },
  {
    title: "Systolic Blood Pressure",
    field: "systolicBloodPressure",
  },
  {
    title: "Grace Risk Score",
    field: "graceRiskScore",
  },
];

const DownloadPrev = () => {
  const { state, Logout, fetchInitialData } = useUserContext();
  const [isDownloable, setDownloable] = useState(false);

  const [downloadData, setDownloadData] = useState([]);

  const [type, setType] = useState("");

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleFetchingPrevRecord = async (type) => {
    const { emailaddress } = state.user;
    try {
      const resp = await axios.get(`/api/fetchRecord/fetch`, {
        params: {
          email: emailaddress,
          type,
        },
      });
      if (resp.status === 200) {
        if (resp.data.data.length > 0) {
          setDownloadData(resp.data.data);
          return setDownloable(true);
        }
        setDownloable(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // autoTable(doc, { html: "#my-table" });

  const handleDownloaddable = () => {
    const doc = new jsPDF();

    doc.text(`Heart Disease Prediction - ${type}`, 50, 10);

    doc.autoTable({
      columns:
        type === "Timi Risk"
          ? TimiColumns.map((col) => ({ ...col, dataKey: col.field }))
          : type === "Firmingham Risk"
          ? firminghamColumns.map((col) => ({ ...col, dataKey: col.field }))
          : graceRiskColumns.map((col) => ({ ...col, dataKey: col.field })),
      body: downloadData,
    });

    doc.save(`${type}.pdf`);
  };

  const handleDelete = async () => {
    let deleteCredentials = {
      modalType: downloadData[0].modalType,
      emailAddress: downloadData[0].emailAddress,
    };

    try {
      const resp = await axios.post(
        "/api/delete/deleteRecord",
        deleteCredentials
      );
      setDownloadData([]);
      setDownloable(false);
      message.success("Record Deleted Successfully !");
    } catch (error) {
      console.log("new err", error);
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
                <strong>Download Previous Record</strong>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <select
                      className="form-select"
                      onChange={(e) => {
                        e.target.value === "GR"
                          ? setType("Grace Risk")
                          : e.target.value === "FM"
                          ? setType("Firmingham Risk")
                          : setType("Timi Risk");
                        handleFetchingPrevRecord(e.target.value);
                      }}
                    >
                      <option value={""}>Choose an option</option>
                      <option value={"GR"}>Grace Risk Record</option>
                      <option value={"FM"}>Framingham Risk Record</option>
                      <option value={"TI"}>Timi Risk Record</option>
                    </select>
                  </div>
                </div>
              </div>
              {isDownloable && (
                <div className="row">
                  <div className="col-12">
                    <div className=" m-3 d-flex gap-2 justify-content-end">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handleDownloaddable();
                        }}
                      >
                        Download Record
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDelete();
                        }}
                      >
                        Delete Record
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default DownloadPrev;
