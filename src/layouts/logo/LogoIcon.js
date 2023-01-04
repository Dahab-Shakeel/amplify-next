import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import LogoSibel from "../../../assets/images/logos/logo-sibel.png";

const LogoIcon = () => {
  return (
    <Link href="/">
      <Image width={250} height={110} src={LogoSibel} alt={LogoSibel} />
    </Link>
  );
};

export default LogoIcon;
