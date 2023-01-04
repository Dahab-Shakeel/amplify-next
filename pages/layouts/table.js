import { Grid } from "@mui/material";
import ProductPerfomance from "../../src/components/dashboard/ProductPerfomance";
import FullLayout from "../../src/layouts/FullLayout";
import PropTypes from "prop-types";
import { withSSRContext } from "aws-amplify";

const Tables = ({ authenticated }) => {
  if (!authenticated) {
    return <h1>Not Authenticated</h1>;
  }
  return (
    <FullLayout>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <ProductPerfomance />
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

Tables.propTypes = {
  authenticated: PropTypes.bool,
};
export default Tables;
