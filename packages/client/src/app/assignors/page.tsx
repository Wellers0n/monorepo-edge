"use client";
import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateAssignorModal from "@/components/CreateAssignorModal";
import AssignorTable from "@/components/AssignorTable";
import useAssignorsData from "@/hooks/useAssignorsData";
import useCreateAssignorMutation from "@/hooks/useCreateAssignorMutation";
import { useRouter, useSearchParams } from "next/navigation";

type Submit = {
  name: string;
  document: string;
  phone: string;
  email: string;
};

const Dashboard = () => {
  const searchParams = useSearchParams();
  const router = useRouter()
  const offset = searchParams.get("offset");

  const [open, setOpen] = useState(false);
  const { data, isLoading } = useAssignorsData({
    params: {
      limit: 5,
      offset: Number(offset) || 0,
    },
  });

  const { mutate } = useCreateAssignorMutation();

  const submit = async ({ name, document, email, phone }: Submit) => {
    mutate({ name, document, phone, email });

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
        <AssignorTable
          rows={data?.assignors || []}
          totalPages={data?.totalPages || 0}
          // loading={isLoading}
          onEdit={(id) => router.push(`assignors/${id}`)}
        />
      </Stack>
    </Stack>
  );
};

export default Dashboard;
