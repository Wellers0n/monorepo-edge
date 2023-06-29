"use client";
import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateAssignorModal from "@/components/CreateAssignorModal";
import AssignorTable from "@/components/AssignorTable";

type Submit = {
  name: string;
  document: string;
  phone: string;
  email: string;
};

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const submit = async ({ name, document, email, phone }: Submit) => {
    // mutate({ name, description })

    console.log({ name, document, phone, email });

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
        <AssignorTable rows={[]} totalPages={10} />
      </Stack>
    </Stack>
  );
};

export default Dashboard;
