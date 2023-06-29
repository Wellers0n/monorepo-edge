"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
// import FarmCard from '@/components/FarmCard'
import AddIcon from "@mui/icons-material/Add";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CreateAssignorModal from "@/components/CreateAssignorModal";
// import useInfiniteFarmsData from "@/hooks/useInfiniteFarmsData";
// import useCreateFarmMutation from "@/hooks/useCreateFarmMutation";
// import { useInView } from "react-intersection-observer";

type Submit = {
  name: string;
  description: string;
};

const Dashboard = () => {
  // const { ref, inView } = useInView();

  const [open, setOpen] = useState(false);

  const submit = async ({ name, description }: Submit) => {
    // mutate({ name, description })

    console.log({ name, description });

    setOpen(false);
  };

  return (
    <Stack>
      <Stack alignItems={{ sm: "flex-start" }} mb={3}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Adicionar
        </Button>
        <CreateAssignorModal submit={submit} open={open} setOpen={setOpen} />
      </Stack>
    </Stack>
  );
};

export default Dashboard;
