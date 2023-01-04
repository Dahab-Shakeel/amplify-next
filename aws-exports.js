const awsExports = {
  Auth: {
    region: "us-east-2",
    userPoolId: "us-east-2_UKKKciNIc",
    userPoolWebClientId: "1o47ur1prrfjefsi9oo6m9h8vm",
    oauth: {
      domain: "auth.admin.dev.andromeda.sibel.health",
      scope: ["email", "openid"],
      redirectSignIn: "https://main.d20k9trxfapyd1.amplifyapp.com/",
      redirectSignOut: "https://main.d20k9trxfapyd1.amplifyapp.com/",
      responseType: "token",
    },
    federationTarget: "COGNITO_USER_POOLS",
  },
};

export default awsExports;
