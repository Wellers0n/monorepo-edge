"use client";
import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreatePayableModal from "@/components/CreatePayableModal";
import usePayablesData from "@/hooks/usePayablesData";
import useCreatePaybleMutation from "@/hooks/useCreatePaybleMutation";
import { useSearchParams } from "next/navigation";
import PayableTable from "@/components/PayableTable";

type Submit = {
  value: number | null;
  assignor: {
    name: string;
    id: number;
  } | null;
};

const Dashboard = () => {
  const searchParams = useSearchParams();
  const offset = searchParams.get("offset");

  const [open, setOpen] = useState(false);
  const { data, isLoading } = usePayablesData({
    params: {
      limit: 5,
      offset: Number(offset) || 0,
    },
  });

  const { mutate } = useCreatePaybleMutation();

  const submit = async ({ value, assignor }: Submit) => {
    if (!value || !assignor) return;

    mutate({ value: Number(value), assignorId: assignor?.id });

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
        <CreatePayableModal submit={submit} open={open} setOpen={setOpen} />
        <PayableTable
          rows={data?.payables || []}
          totalPages={data?.totalPages || 0}
          loading={isLoading}
        />
      </Stack>
    </Stack>
  );
};

export default Dashboard;
