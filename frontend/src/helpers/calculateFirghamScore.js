const CalculateFirminghamScore = (data) => {
  let firminghamRiskScore = 0;
  let deathProbability = 0;

  let {
    gender,
    patientAge,
    hdlCholesterol,
    totalCholesterol,
    systolicBloodPressure,
    smoker,
    bloodPressureTreated,
  } = data;
  if (smoker) {
    smoker = 1;
  } else {
    smoker = 0;
  }
  if (bloodPressureTreated) {
    bloodPressureTreated = 1;
  } else {
    bloodPressureTreated = 0;
  }
  if (gender === "MALE" && patientAge > 70) {
    patientAge = 70;
  }

  if (gender === "FEMALE" && patientAge > 78) {
    patientAge = 78;
  }

  switch (gender) {
    case "MALE":
      firminghamRiskScore =
        52.01 * Math.log(patientAge) +
        20.01 * Math.log(totalCholesterol) +
        -0.91 * Math.log(hdlCholesterol) +
        1.31 * Math.log(systolicBloodPressure) +
        0.24 * bloodPressureTreated +
        12.1 * smoker +
        -4.61 * Math.log(patientAge) * Math.log(totalCholesterol) +
        -2.84 * Math.log(patientAge) * smoker +
        -2.93 * Math.log(patientAge) * Math.log(patientAge) -
        172.3;

      deathProbability = 1 - 0.9402 ** firminghamRiskScore;

      return { firminghamRiskScore, deathProbability };

    case "FEMALE":
      firminghamRiskScore =
        31.76 * Math.log(patientAge) +
        22.47 * Math.log(totalCholesterol) +
        -1.19 * Math.log(hdlCholesterol) +
        2.55 * Math.log(systolicBloodPressure) +
        0.42 * bloodPressureTreated +
        13.08 * smoker +
        -5.06 * Math.log(patientAge) * Math.log(totalCholesterol) +
        -3 * Math.log(patientAge) * smoker -
        146.59;

      deathProbability = 1 - 0.98767 ** firminghamRiskScore;

      return { firminghamRiskScore, deathProbability };

    default:
      return { firminghamRiskScore: 0, deathProbability: 0 };
  }
};

export { CalculateFirminghamScore };
