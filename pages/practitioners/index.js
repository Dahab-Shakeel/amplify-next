import * as React from "react";
import { Grid } from "@mui/material";
import PractitionerList from "../../src/components/users/List";
import FullLayout from "../../src/layouts/FullLayout";
import PropTypes from "prop-types";
import { withSSRContext } from "aws-amplify";
import { getAllPractitioner } from "../../helper/api-util";

const Practitioners = ({ authenticated, data }) => {
  if (!authenticated) {
    return <h1>Not Authenticated</h1>;
  }
  return (
    <FullLayout>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <PractitionerList mode="Practitioner" users={data} />
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
  const list = await getAllPractitioner(user.signInUserSession.idToken.jwtToken);
  if (list.status === 200) {
    const practitioners = await list.json();
    return {
      props: {
        authenticated: true,
        username: user.username,
        data: practitioners.entry.map((p) => p.resource.value) || [],
      },
    };
  } else {
    return res;
  }
};

Practitioners.propTypes = {
  authenticated: PropTypes.bool,
  data: PropTypes.array,
};

export default Practitioners;
