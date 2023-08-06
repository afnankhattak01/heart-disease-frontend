const CalcualteGraceRiskFunc = (data) => {
  let GraceRiskScore = 0;

  let {
    Killip,
    abnormalCardiac,
    cardiacArrest,
    stSegment,
    heartRate,
    Creatinine,
    systolicBloodPressure,
    patientAge,
  } = data;

  if (patientAge < 35) {
    GraceRiskScore += 0;
  } else if (patientAge >= 45 && patientAge <= 55) {
    GraceRiskScore += (patientAge - 35) * 1.8;
  } else if (patientAge >= 35 && patientAge <= 45) {
    GraceRiskScore += 18 + (patientAge - 45) * 1.8;
  } else if (patientAge >= 45 && patientAge <= 55) {
    GraceRiskScore += 18 + (patientAge - 45) * 1.8;
  } else if (patientAge >= 55 && patientAge <= 65) {
    GraceRiskScore += 36 + (patientAge - 55) * 1.8;
  } else if (patientAge >= 65 && patientAge <= 75) {
    GraceRiskScore += 54 + (patientAge - 65) * 1.9;
  } else if (patientAge >= 75 && patientAge <= 85) {
    GraceRiskScore += 73 + (patientAge - 75) * 1.8;
  } else if (patientAge >= 85 && patientAge <= 95) {
    GraceRiskScore += 91 + (patientAge - 85) * 1.8;
  } else {
    GraceRiskScore += 100;
  }

  if (heartRate < 50) {
    GraceRiskScore += 0;
  } else if (heartRate >= 50 && heartRate <= 60) {
    GraceRiskScore += (heartRate - 50) * (3 / 10);
  } else if (heartRate >= 60 && heartRate <= 70) {
    GraceRiskScore += 3 + (heartRate - 60) * (3 / 10);
  } else if (heartRate >= 70 && heartRate <= 80) {
    GraceRiskScore += 6 + (heartRate - 70) * (3 / 10);
  } else if (heartRate >= 80 && heartRate <= 90) {
    GraceRiskScore += 9 + (heartRate - 80) * (3 / 10);
  } else if (heartRate >= 90 && heartRate <= 100) {
    GraceRiskScore += 12 + (heartRate - 90) * (3 / 10);
  } else if (heartRate >= 100 && heartRate <= 110) {
    GraceRiskScore += 15 + (heartRate - 100) * (3 / 10);
  } else if (heartRate >= 110 && heartRate <= 150) {
    GraceRiskScore += 18 + (heartRate - 110) * (12 / 40);
  } else if (heartRate >= 150 && heartRate <= 200) {
    GraceRiskScore += 30 + (heartRate - 150) * (16 / 50);
  } else {
    GraceRiskScore += 46;
  }

  if (systolicBloodPressure < 80) {
    GraceRiskScore += 58;
  } else if (systolicBloodPressure >= 80 && systolicBloodPressure <= 100) {
    GraceRiskScore += 58 - (systolicBloodPressure - 80) * (10 / 20);
  } else if (systolicBloodPressure >= 100 && systolicBloodPressure <= 110) {
    GraceRiskScore += 48 - (systolicBloodPressure - 100) * (5 / 10);
  } else if (systolicBloodPressure >= 110 && systolicBloodPressure <= 120) {
    GraceRiskScore += 43 - (systolicBloodPressure - 110) * (4 / 10);
  } else if (systolicBloodPressure >= 120 && systolicBloodPressure <= 130) {
    GraceRiskScore += 39 - (systolicBloodPressure - 120) * (5 / 10);
  } else if (systolicBloodPressure >= 130 && systolicBloodPressure <= 140) {
    GraceRiskScore += 34 - (systolicBloodPressure - 130) * (5 / 10);
  } else if (systolicBloodPressure >= 140 && systolicBloodPressure <= 150) {
    GraceRiskScore += 29 - (systolicBloodPressure - 140) * (5 / 10);
  } else if (systolicBloodPressure >= 150 && systolicBloodPressure <= 160) {
    GraceRiskScore += 24 - (systolicBloodPressure - 150) * (5 / 10);
  } else if (systolicBloodPressure >= 160 && systolicBloodPressure <= 180) {
    GraceRiskScore += 19 - (systolicBloodPressure - 160) * (9 / 20);
  } else if (systolicBloodPressure >= 180 && systolicBloodPressure <= 200) {
    GraceRiskScore += 10 - (systolicBloodPressure - 180) * (10 / 20);
  } else {
    GraceRiskScore += 0;
  }

  if (Creatinine < 0.2) {
    GraceRiskScore += (Creatinine - 0) * (1 / 0.2);
  } else if (Creatinine >= 0.2 && Creatinine <= 0.4) {
    GraceRiskScore += 1 + (Creatinine - 0.2) * (2 / 0.2);
  } else if (Creatinine >= 0.4 && Creatinine <= 0.6) {
    GraceRiskScore += 3 + (Creatinine - 0.4) * (1 / 0.2);
  } else if (Creatinine >= 0.6 && Creatinine <= 0.8) {
    GraceRiskScore += 4 + (Creatinine - 0.6) * (2 / 0.2);
  } else if (Creatinine >= 0.8 && Creatinine <= 1.0) {
    GraceRiskScore += 6 + (Creatinine - 0.8) * (1 / 0.2);
  } else if (Creatinine >= 1.0 && Creatinine <= 1.2) {
    GraceRiskScore += 7 + (Creatinine - 1.0) * (1 / 0.2);
  } else if (Creatinine >= 1.2 && Creatinine <= 1.4) {
    GraceRiskScore += 8 + (Creatinine - 1.2) * (2 / 0.2);
  } else if (Creatinine >= 1.4 && Creatinine <= 1.6) {
    GraceRiskScore += 10 + (Creatinine - 1.4) * (1 / 0.2);
  } else if (Creatinine >= 1.6 && Creatinine <= 1.8) {
    GraceRiskScore += 11 + (Creatinine - 1.6) * (2 / 0.2);
  } else if (Creatinine >= 1.8 && Creatinine <= 2.0) {
    GraceRiskScore += 13 + (Creatinine - 1.8) * (1 / 0.2);
  } else if (Creatinine >= 2.0 && Creatinine <= 3.0) {
    GraceRiskScore += 14 + (Creatinine - 2.0) * (7 / 1);
  } else if (Creatinine >= 3.0 && Creatinine <= 4.0) {
    GraceRiskScore += 21 + (Creatinine - 3.0) * (7 / 1);
  } else if (Creatinine >= 4.0) {
    GraceRiskScore += 28;
  }

  if (Killip === "No CHF") {
    GraceRiskScore += 0;
  } else if (Killip === "Pulmonary edema") {
    GraceRiskScore += 39;
  } else if (Killip === "Cardiogenic shock") {
    GraceRiskScore += 59;
  } else if (Killip === "Rales") {
    GraceRiskScore += 20;
  }

  if (stSegment) {
    GraceRiskScore += 1;
  } else {
    GraceRiskScore += 0;
  }

  if (cardiacArrest) {
    GraceRiskScore += 1;
  } else {
    GraceRiskScore += 0;
  }

  if (abnormalCardiac) {
    GraceRiskScore += 1;
  } else {
    GraceRiskScore += 0;
  }


  return GraceRiskScore
};

export { CalcualteGraceRiskFunc };
