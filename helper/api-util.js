const setOption = (token, method) => {
  return {
    method: method.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllPatient = async (token) => {
  const res = await fetch(`http://localhost:3000/api/fhir/patient`, setOption(token, "get"));
  return res;
};

export const getAllPractitioner = async (token) => {
  const res = await fetch(`http://localhost:3000/api/fhir/practitioner`, setOption(token, "get"));
  return res;
};

export const getPatientById = async (token, patientId) => {
  const res = await fetch(
    `http://localhost:3000/api/fhir/patient/${patientId}`,
    setOption(token, "get")
  );
  return res;
};

export const getPractitionerById = async (token, practitionerId) => {
  const res = await fetch(
    `http://localhost:3000/api/fhir/practitioner/${practitionerId}`,
    setOption(token, "get")
  );
  return res;
};

export const editPatientInfo = async (token, data) => {
  const res = await fetch(`http://localhost:3000/api/fhir/patient`, {
    ...setOption(token, "put"),
    body: JSON.stringify(data),
  });
  return res;
};

export const editPractitionerInfo = async (token, data) => {
  const res = await fetch(`http://localhost:3000/api/fhir/practitioner`, {
    ...setOption(token, "put"),
    body: JSON.stringify(data),
  });
  return res;
};

export const addPatient = async (token, data) => {
  const res = await fetch(`http://localhost:3000/api/fhir/patient`, {
    ...setOption(token, "put"),
    body: JSON.stringify(data),
  });
  return res;
};

export const addPractitioner = async (token, data) => {
  const res = await fetch(`http://localhost:3000/api/fhir/practitioner`, {
    ...setOption(token, "put"),
    body: JSON.stringify(data),
  });
  return res;
};
