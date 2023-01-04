import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import {
  Grid,
  Stack,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import FullLayout from "../../src/layouts/FullLayout";
import BaseCard from "../../src/components/baseCard/BaseCard";
import PropTypes from "prop-types";
import { withSSRContext } from "aws-amplify";
import { addPractitioner, getPractitionerById } from "../../helper/api-util";
import { useRouter } from "next/router";

const PractitionerAdd = ({ authenticated, token }) => {
  const router = useRouter();
  const [identifier, setIdentifier] = useState();
  const [givenName, setGivenName] = useState();
  const [familyName, setFamilyName] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleIdentifier = (event) => {
    // TODO Validation
    setIdentifier(event.target.value);
  };

  const handleGivenName = (event) => {
    // TODO Validation
    setGivenName(event.target.value);
  };

  const handleFamilyName = (event) => {
    // TODO Validation
    setFamilyName(event.target.value);
  };

  const handleEmail = (event) => {
    // TODO Validation
    setEmail(event.target.value);
  };

  const isAllPractitionerInfoReady = () => {
    if (identifier === "" || identifier === undefined) return false;
    if (givenName === "" || givenName === undefined) return false;
    if (familyName === "" || familyName === undefined) return false;
    if (email === "" || email === undefined) return false;
    if (gender === undefined) return false;

    return true;
  };

  const onSubmitHandler = async () => {
    if (isAllPractitionerInfoReady()) {
      setIsSubmitting(true);
      const practitioner = {
        identifier: [{ value: identifier }],
        active: true,
        gender: gender,
        name: { given: givenName, family: familyName },
        telecom: [
          {
            system: "email",
            value: email,
            use: "home",
          },
        ],
      };

      const isPractitionerExist = await (await getPractitionerById(token, identifier)).json();

      if (isPractitionerExist === null) {
        const res = await addPractitioner(token, practitioner);
        if (res.status === 200) {
          router.push("/practitioners");
        }
      } else {
        setOpen(true);
        setIdentifier("");
        setIsSubmitting(false);
      }
    }
  };

  if (!authenticated) {
    return <h1>Not Authenticated</h1>;
  }

  return (
    <FullLayout>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Add a Practitioner Info">
            <Stack spacing={3}>
              <TextField
                error={identifier === ""}
                id="identifier-basic"
                label="identifier"
                variant="outlined"
                value={identifier || ""}
                onChange={handleIdentifier}
              />
              <TextField
                error={givenName === ""}
                id="given-name-basic"
                label="Given Name"
                variant="outlined"
                value={givenName || ""}
                onChange={handleGivenName}
              />
              <TextField
                error={familyName === ""}
                id="family-name-basic"
                label="Family Name"
                variant="outlined"
                value={familyName || ""}
                onChange={handleFamilyName}
              />
              <TextField
                error={email === ""}
                id="email-basic"
                label="Email"
                variant="outlined"
                value={email || ""}
                onChange={handleEmail}
              />
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={gender || ""}
                  onChange={(event) => setGender(event.target.value)}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
              </FormControl>
            </Stack>
            <br />
            <Link href="/practitioners">
              <Button
                variant="contained"
                color="error"
                mt={2}
                sx={{ display: "inline-block", marginRight: 2 }}
              >
                Cancel
              </Button>
            </Link>
            <Button
              disabled={isSubmitting || !isAllPractitionerInfoReady()}
              onClick={onSubmitHandler}
              variant="contained"
              mt={2}
            >
              Add
            </Button>

            <Snackbar
              open={open}
              autoHideDuration={6000}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              onClose={() => setOpen(false)}
              sx={{ width: "50%" }}
            >
              <Alert severity="error">Identifier is being in use.</Alert>
            </Snackbar>
          </BaseCard>
        </Grid>
      </Grid>
    </FullLayout>
  );
};

export const getServerSideProps = async (context) => {
  const { Auth } = withSSRContext(context);
  let user,
    res = { props: { authenticated: false } };

  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (err) {
    err;
  }

  if (!user) return res;
  return {
    props: {
      authenticated: true,
      username: user.username,
      token: user.signInUserSession.idToken.jwtToken,
    },
  };
};

PractitionerAdd.propTypes = {
  authenticated: PropTypes.bool,
  token: PropTypes.string,
};

export default PractitionerAdd;
