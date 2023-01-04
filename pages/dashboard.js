import { Grid } from "@mui/material";
import { withSSRContext } from "aws-amplify";
import BlogCard from "../src/components/dashboard/BlogCard";
import SalesOverview from "../src/components/dashboard/SalesOverview";
import DailyActivity from "../src/components/dashboard/DailyActivity";
import ProductPerfomance from "../src/components/dashboard/ProductPerfomance";
import FullLayout from "../src/layouts/FullLayout";
import PropTypes from "prop-types";

const Dashboard = ({ authenticated }) => {
  if (!authenticated) {
    return <h1>Not Authenticated</h1>;
  }
  return (
    <FullLayout>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <SalesOverview />
        </Grid>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={4}>
          <DailyActivity />
        </Grid>
        <Grid item xs={12} lg={8}>
          <ProductPerfomance />
        </Grid>
        <Grid item xs={12} lg={12}>
          <BlogCard />
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

Dashboard.propTypes = {
  authenticated: PropTypes.bool,
};
export default Dashboard;
