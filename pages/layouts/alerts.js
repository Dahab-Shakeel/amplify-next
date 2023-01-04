import { Grid, Alert, Stack, AlertTitle } from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import FullLayout from "../../src/layouts/FullLayout";
import PropTypes from "prop-types";
import { withSSRContext } from "aws-amplify";

const Alerts = ({ authenticated }) => {
  if (!authenticated) {
    return <h1>Not Authenticated</h1>;
  }
  return (
    <FullLayout>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Alerts">
            <Stack spacing={2}>
              <Alert severity="error">This is an error alert — check it out!</Alert>
              <Alert severity="warning">This is a warning alert — check it out!</Alert>
              <Alert severity="info">This is an info alert — check it out!</Alert>
              <Alert severity="success">This is a success alert — check it out!</Alert>
            </Stack>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Alerts Outline">
            <Stack spacing={2}>
              <Alert severity="error" variant="outlined">
                This is an error alert — check it out!
              </Alert>
              <Alert severity="warning" variant="outlined">
                This is a warning alert — check it out!
              </Alert>
              <Alert severity="info" variant="outlined">
                This is an info alert — check it out!
              </Alert>
              <Alert severity="success" variant="outlined">
                This is a success alert — check it out!
              </Alert>
            </Stack>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Alert with Desc">
            <Stack spacing={2}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                This is an error alert — <strong>check it out!</strong>
              </Alert>
              <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                This is a warning alert — <strong>check it out!</strong>
              </Alert>
              <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                This is an info alert — <strong>check it out!</strong>
              </Alert>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                This is a success alert — <strong>check it out!</strong>
              </Alert>
            </Stack>
          </BaseCard>
        </Grid>
      </Grid>
    </FullLayout>
  );
};

export const getServerSideProps = async (context) => {
  const { Auth } = withSSRContext(context);
  try {
    const user = await Auth.currentAuthenticatedUser();
    return {
      props: {
        authenticated: true,
        username: user.username,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        authenticated: false,
      },
    };
  }
};

Alerts.propTypes = {
  authenticated: PropTypes.bool,
};

export default Alerts;
