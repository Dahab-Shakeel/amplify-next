import PropTypes from "prop-types";
import { withSSRContext } from "aws-amplify";

const LayoutParts = ({ authenticated }) => {
  if (!authenticated) {
    return <h1>Not Authenticated</h1>;
  }
  return <div>Layout</div>;
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

LayoutParts.propTypes = {
  authenticated: PropTypes.bool,
};

export default LayoutParts;
