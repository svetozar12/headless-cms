import React, { FC, useRef, useState } from "react";
import { FaBoxes } from "react-icons/fa";
import Heading from "../../Heading";
import PageHeader from "../../PageHeader";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
  SelectProps,
} from "@mui/material";
import { api } from "../../../utils/api";
import { MdOutlineClear } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CONTENT } from "../../../constants/routes";
interface IContentHeader {
  toggleModal: (value: boolean) => void;
}

const ContentHeader: FC<IContentHeader> = ({ toggleModal }) => {
  const router = useRouter();
  const { query } = router;
  const { data } = api.contentModel.getAll.useQuery({
    limit: 10,
    offSet: parseInt(query.page as string) || 1,
  });
  const { data: modelData } = data || {};
  const { mutate } = api.content.create.useMutation({
    onSuccess(modelData) {
      const { id } = modelData;
      router.push(CONTENT(id));
    },
  });
  const [model, setModel] = useState("");
  const { data: session } = useSession();

  function handleClearClick() {
    setModel("");
  }

  function handleModelClick(modelId: number, name: string) {
    const { id } = session?.user || {};
    if (!id) return;
    mutate({ modelId, name: "untitled", userId: id });
  }

  return (
    <PageHeader extraProps={{ className: "justify-between" }}>
      <div className="flex">
        <FaBoxes className="mr-4 h-8 w-8" />
        <Heading type="h1" text="Content" />
      </div>
      <div className="flex">
        <FormControl className="w-full !bg-inputBlack bg-transparent !my-2 !rounded-md">
          {model ? <InputLabel id="custom-select-label">Model</InputLabel> : ""}
          {data && (
            <Select
              displayEmpty
              sx={{
                "& .MuiSelect-iconOutlined": { display: model ? "none" : "" },
                "&.Mui-focused .MuiIconButton-root": { color: "primary.main" },
              }}
              renderValue={(value) => (value ? value : <em>Select model</em>)}
              endAdornment={
                <IconButton
                  sx={{ visibility: model ? "visible" : "hidden" }}
                  onClick={handleClearClick}
                >
                  <MdOutlineClear className="text-white rounded-full hover:bg-black w-6 h-6" />
                </IconButton>
              }
              className="!px-2 bg-transparent !text-white autofill:bg-transparent active:border-0"
              label="Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              {modelData?.map(({ name, id }) => {
                return (
                  <MenuItem
                    key={name}
                    onClick={() => handleModelClick(id, name)}
                    value={name}
                  >
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        </FormControl>
      </div>
    </PageHeader>
  );
};

export default ContentHeader;
