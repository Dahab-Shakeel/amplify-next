import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";

const List = ({ mode, users }) => {
  return (
    <BaseCard title={mode + " List"}>
      <Box textAlign={"right"}>
        <Link href={mode === "Patient" ? `/patients/add` : `/practitioners/add`}>
          <Button variant="contained" color={"success"} mt={2}>
            Add {mode}
          </Button>
        </Link>
      </Box>
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Gender
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Status
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6"></Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.identifier[0].value}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {user.identifier[0].value}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {`${user.name.given} ${user.name.family}`}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {user.gender}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: user.active ? "success.main" : "error.main",
                    color: "#fff",
                  }}
                  size="small"
                  label={user.active ? "Active" : "Inactive"}
                ></Chip>
              </TableCell>
              <TableCell align="right">
                <Link
                  href={
                    mode === "Patient"
                      ? `/patients/${user.identifier[0].value}`
                      : `/practitioners/${user.identifier[0].value}`
                  }
                >
                  <Button variant="outlined" color="success">
                    Edit
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

List.propTypes = {
  users: PropTypes.array,
  mode: PropTypes.string,
};

export default List;
