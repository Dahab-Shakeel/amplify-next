import { Grid, Pagination, Stack } from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import FullLayout from "../../src/layouts/FullLayout";
import PropTypes from "prop-types";
import { withSSRContext } from "aws-amplify";

const Paginations = ({ authenticated }) => {
  if (!authenticated) {
    return <h1>Not Authenticated</h1>;
  }
  return (
    <FullLayout>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Paginations">
            <Stack spacing={2}>
              <Pagination count={10} />
              <Pagination count={10} color="primary" />
              <Pagination count={10} color="secondary" />
              <Pagination count={10} disabled />
            </Stack>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Outlined Paginations">
            <Stack spacing={2}>
              <Pagination count={10} variant="outlined" />
              <Pagination count={10} variant="outlined" color="primary" />
              <Pagination count={10} variant="outlined" color="secondary" />
              <Pagination count={10} variant="outlined" disabled />
            </Stack>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Squred Paginations">
            <Stack spacing={2}>
              <Pagination count={10} shape="rounded" variant="outlined" />
              <Pagination count={10} shape="rounded" variant="outlined" color="primary" />
              <Pagination count={10} shape="rounded" variant="outlined" color="secondary" />
              <Pagination count={10} shape="rounded" variant="outlined" disabled />
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

Paginations.propTypes = {
  authenticated: PropTypes.bool,
};
export default Paginations;
