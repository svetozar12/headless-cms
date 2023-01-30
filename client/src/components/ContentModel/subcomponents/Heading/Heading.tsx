import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { FaBoxes } from "react-icons/fa";
import { MODEL_LIST } from "../../../../constants/routes";
import Heading from "../../../Heading";
import PageHeader from "../../../PageHeader";

interface IModelHeading {
  title: string;
  ActionButtons: JSX.Element;
}

const ModelHeading: FC<IModelHeading> = ({ title, ActionButtons }) => {
  const router = useRouter();
  return (
    <PageHeader extraProps={{ className: "justify-between" }}>
      <div className="flex">
        <FaBoxes className="mr-4 h-8 w-8" />
        <Breadcrumbs className="text-white" aria-label="breadcrumb">
          <Link
            underline="hover"
            className="cursor-pointer text-cms_blue-100 text-2xl font-bold"
            onClick={() => router.push(MODEL_LIST)}
          >
            Model
          </Link>
          <p className="text-2xl font-bold">{title}</p>
        </Breadcrumbs>
      </div>
      {ActionButtons}
    </PageHeader>
  );
};

export default ModelHeading;
