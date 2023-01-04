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
import { getPractitionerById, editPractitionerInfo } from "../../../helper/api-util";
import { useRouter } from "next/router";

const PractitionerEdit = ({ authenticated, practitioner, token }) => {
  const router = useRouter();
  const [givenName, setGivenName] = useState(practitioner ? practitioner.name.given : null);
  const [familyName, setFamilyName] = useState(practitioner ? practitioner.name.family : null);
  const [email, setEmail] = useState(practitioner ? practitioner.telecom[0].value : null);
  const [gender, setGender] = useState(practitioner ? practitioner.gender : null);
  const [active, setActive] = useState(practitioner ? practitioner.active : null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const onSubmitHandler = async () => {
    setIsSubmitting(true);
    const practitioner = {
      identifier: [{ value: router.query.practitionerId }],
      active,
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
    const res = await editPractitionerInfo(token, practitioner);
    if (res.status === 200) {
      router.push("/practitioners");
    } else {
      setIsSubmitting(false);
    }
  };
  if (!authenticated) {
    return <h1>Not Authenticated</h1>;
  }
  if (!practitioner) {
    return <h1>user not exist</h1>;
  }
  return (
    <FullLayout>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Edit Practitioner Info">
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
              <TextField
                error={email === ""}
                id="email-basic"
                label="Email"
                variant="outlined"
                defaultValue={email}
                onChange={handleEmail}
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
              disabled={isSubmitting || givenName === "" || familyName === "" || email === ""}
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
  const practitioner = await getPractitionerById(
    user.signInUserSession.idToken.jwtToken,
    context.params.practitionerId
  );

  if (practitioner.status === 200) {
    return {
      props: {
        authenticated: true,
        username: user.username,
        practitioner: await practitioner.json(),
        token: user.signInUserSession.idToken.jwtToken,
      },
    };
  } else {
    return res;
  }
};

PractitionerEdit.propTypes = {
  authenticated: PropTypes.bool,
  practitioner: PropTypes.object,
  token: PropTypes.string,
};

export default PractitionerEdit;
