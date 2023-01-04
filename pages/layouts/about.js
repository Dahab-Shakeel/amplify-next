import * as React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import FullLayout from "../../src/layouts/FullLayout";
import PropTypes from "prop-types";
import { withSSRContext } from "aws-amplify";

const About = ({ authenticated }) => {
  if (!authenticated) {
    return <h1>Not Authenticated</h1>;
  }
  return (
    <FullLayout>
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <Card>
            <CardContent>
              <Typography variant="h4">About Card</Typography>
              <Typography variant="body1">
                This impressive paella is a perfect party dish and a fun meal to cook together with
                your guests. Add 1 cup of frozen peas along with the mussels, if you like.
              </Typography>
            </CardContent>
          </Card>
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

About.propTypes = {
  authenticated: PropTypes.bool,
};

export default About;
