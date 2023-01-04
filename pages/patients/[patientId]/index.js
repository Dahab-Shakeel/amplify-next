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
} from "@mui/material";
import FullLayout from "../../../src/layouts/FullLayout";
import BaseCard from "../../../src/components/baseCard/BaseCard";
import PropTypes from "prop-types";
import { withSSRContext } from "aws-amplify";
import { getPatientById, editPatientInfo } from "../../../helper/api-util";
import { useRouter } from "next/router";

const PatientEdit = ({ authenticated, patient, token }) => {
  const router = useRouter();
  const [givenName, setGivenName] = useState(patient ? patient.name.given : null);
  const [familyName, setFamilyName] = useState(patient ? patient.name.family : null);
  const [gender, setGender] = useState(patient ? patient.gender : null);
  const [active, setActive] = useState(patient ? patient.active : null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGivenName = (event) => {
    // TODO Validation
    setGivenName(event.target.value);
  };

  const handleFamilyName = (event) => {
    // TODO Validation
    setFamilyName(event.target.value);
  };

  const onSubmitHandler = async () => {
    setIsSubmitting(true);
    const patient = {
      identifier: [{ value: router.query.patientId }],
      active,
      gender: gender,
      name: { given: givenName, family: familyName },
    };
    const res = await editPatientInfo(token, patient);
    if (res.status === 200) {
      router.push("/patients");
    } else {
      setIsSubmitting(false);
    }
  };
  if (!authenticated) {
    return <h1>Not Authenticated</h1>;
  }
  if (!patient) {
    return <h1>user not exist</h1>;
  }
  return (
    <FullLayout>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Edit Patient Info">
            <Stack spacing={3}>
              <TextField
                error={givenName === ""}
                id="given-name-basic"
                label="Given Name"
                variant="outlined"
                defaultValue={givenName}
                onChange={handleGivenName}
              />
              <TextField
                error={familyName === ""}
                id="family-name-basic"
                label="Family Name"
                variant="outlined"
                defaultValue={familyName}
                onChange={handleFamilyName}
              />
              <Grid container spacing={0}>
                <Grid item xs={6} lg={6}>
                  <FormControl>
                    <FormLabel id="gender-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                      aria-labelledby="gender-radio-buttons-group-label"
                      defaultValue={gender}
                      name="gender-radio-buttons-group"
                      onChange={(event) => setGender(event.target.value)}
                    >
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={6} lg={6}>
                  <FormControl>
                    <FormLabel id="active-radio-buttons-group-label">Active</FormLabel>
                    <RadioGroup
                      aria-labelledby="active-radio-buttons-group-label"
                      defaultValue={active}
                      name="active-radio-buttons-group"
                      onChange={(event) => setActive(event.target.value)}
                    >
                      <FormControlLabel value="true" control={<Radio />} label="True" />
                      <FormControlLabel value="false" control={<Radio />} label="False" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Stack>
            <br />
            <Link href="/patients">
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
              disabled={isSubmitting || givenName === "" || familyName === ""}
              onClick={onSubmitHandler}
              variant="contained"
              mt={2}
            >
              Submit
            </Button>
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
  const patient = await getPatientById(
    user.signInUserSession.idToken.jwtToken,
    context.params.patientId
  );

  if (patient.status === 200) {
    return {
      props: {
        authenticated: true,
        username: user.username,
        patient: await patient.json(),
        token: user.signInUserSession.idToken.jwtToken,
      },
    };
  } else {
    return res;
  }
};

PatientEdit.propTypes = {
  authenticated: PropTypes.bool,
  patient: PropTypes.object,
  token: PropTypes.string,
};

export default PatientEdit;
