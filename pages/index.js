import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Index = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.log("Error: ", error);
        setUser(null);
      });
  }, []);

  const Copyright = (props) => {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {"Copyright © "}
        <Link color="inherit" href="https://www.sibelhealth.com/">
          Sibel Health
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };

  const handleLogin = (event) => {
    event.preventDefault();
    Auth.federatedSignIn({ provider: "Google" });
  };
  const handleLogout = (event) => {
    event.preventDefault();
    Auth.signOut();
  };

  const handleNavigate = (event) => {
    event.preventDefault();
    router.push("/dashboard");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: user ? "primary.main" : "secondary.main",
            height: "75px",
            width: "75px",
          }}
        >
          {!user && <LockOutlinedIcon sx={{ height: "65px", width: "65px" }} />}
          {user && <LockOpenOutlinedIcon sx={{ height: "65px", width: "65px" }} />}
        </Avatar>
        <Typography component="h1" variant="h1">
          Andromeda Admin Portal
        </Typography>

        {user && (
          <Typography sx={{ mt: 2 }} component="h1" variant="h3">
            Hi {user.username}
          </Typography>
        )}
        <Box>
          {!user && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleLogin}
              sx={{ mt: 10, mb: 2 }}
            >
              Sign In with Google
            </Button>
          )}
          {user && (
            <>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleLogout}
                sx={{ mt: 10, mb: 2 }}
              >
                Sign Out
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleNavigate}
                sx={{ mt: 4, mb: 2 }}
              >
                Go to Dashboard
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Index;
