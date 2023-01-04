import * as React from "react";
import { Grid } from "@mui/material";
import PatientList from "../../src/components/users/List";
import FullLayout from "../../src/layouts/FullLayout";
import PropTypes from "prop-types";
import { withSSRContext } from "aws-amplify";
import { getAllPatient } from "../../helper/api-util";

const Patients = ({ authenticated, data }) => {
  if (!authenticated) {
    return <h1>Not Authenticated</h1>;
  }
  return (
    <FullLayout>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <PatientList mode="Patient" users={data} />
        </Grid>
      </Grid>
    </FullLayout>
  );
};

export const getServerSideProps = async (context) => {
  const { Auth } = withSSRContext(context);
  let user,
    res = { props: { authenticated: false } };
  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (err) {
    err;
  }

  if (!user) return res;
  const list = await getAllPatient(user.signInUserSession.idToken.jwtToken);
  if (list.status === 200) {
    const patients = await list.json();
    return {
      props: {
        authenticated: true,
        username: user.username,
        data: patients.entry.map((p) => p.resource.value) || [],
      },
    };
  } else {
    return res;
  }
};

Patients.propTypes = {
  authenticated: PropTypes.bool,
  data: PropTypes.array,
};

export default Patients;
