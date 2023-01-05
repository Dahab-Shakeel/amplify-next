const awsExports = {
  Auth: {
    region: "us-east-2",
    userPoolId: "us-east-2_UKKKciNIc",
    userPoolWebClientId: "1o47ur1prrfjefsi9oo6m9h8vm",
    oauth: {
      domain: "auth.admin.dev.andromeda.sibel.health",
      scope: ["email", "openid"],
      redirectSignIn: process.env.NEXT_PUBLIC_API_URL,
      redirectSignOut: process.env.NEXT_PUBLIC_API_URL,
      responseType: "token",
    },
    federationTarget: "COGNITO_USER_POOLS",
  },
};

export default awsExports;
