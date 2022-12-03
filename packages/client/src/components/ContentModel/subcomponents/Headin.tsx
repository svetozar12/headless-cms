import { useRouter } from "next/router";
import React, { FC } from "react";
import { FaBoxes } from "react-icons/fa";
import { CONTENT_MODELS } from "../../../constants/routes";
import useDeleteContentModel from "../../../hooks/useDeleteContentModel";
import Button from "../../Button";
import Heading from "../../Heading";
import PageHeader from "../../PageHeader/PageHeader";

interface IModelHeading {
  title: string;
}

const ModelHeading: FC<IModelHeading> = (props) => {
  const { title } = props;
  const { mutateAsync } = useDeleteContentModel();
  const router = useRouter();
  const { id } = router.query;
  return (
    <PageHeader extraProps={{ className: "justify-between" }}>
      <div className="flex">
        <FaBoxes className="mr-4 h-8 w-8" />
        <Heading type="h1" text={title} />
      </div>
      <Button
        onClick={() =>
          mutateAsync(id as unknown as number).then(() =>
            router.push(CONTENT_MODELS)
          )
        }
        type="button"
        text="Delete Content type"
      />
    </PageHeader>
  );
};

export default ModelHeading;
