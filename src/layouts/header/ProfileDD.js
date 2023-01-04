import React from "react";
import { Auth } from "aws-amplify";
import { Box, Link, Button } from "@mui/material";
const ProfileDD = () => {
  const handleLogout = (event) => {
    event.preventDefault();
    Auth.signOut();
  };
  return (
    <>
      <Box>
        <Box p={2}>
          <Link to="/">
            <Button fullWidth variant="contained" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default ProfileDD;
