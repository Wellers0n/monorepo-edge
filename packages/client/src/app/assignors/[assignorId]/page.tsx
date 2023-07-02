"use client";
import React, { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import CreateAssignorModal from "@/components/CreateAssignorModal";
import usePayablesData from "@/hooks/usePayablesData";
import { useSearchParams } from "next/navigation";
import PayableTable from "@/components/PayableTable";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import useAssignorData from "@/hooks/useAssignorData";

type Submit = {
  name?: string | undefined;
  document: string | undefined;
  phone: string | undefined;
  email: string | undefined;
};

type Props = {
  params: {
    assignorId: string;
  };
};

const Dashboard = ({ params }: Props) => {
  const searchParams = useSearchParams();
  const offset = searchParams.get("offset");

  const [open, setOpen] = useState(false);

  const { data } = usePayablesData({
    params: {
      limit: 5,
      offset: Number(offset) || 0,
      assignorId: Number(params.assignorId),
    },
  });

  const { data: assignor } = useAssignorData({
    id: Number(params.assignorId),
  });

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      document: "",
      email: "",
      phone: "",
    },
    values: {
      name: assignor?.name,
      document: assignor?.document,
      phone: assignor?.phone,
      email: assignor?.email,
    },
  });

  const submit = async ({ name, document, email, phone }: Submit) => {
    console.log({ name, document, email, phone });
    // mutate({ name, document, phone, email });
    // setOpen(false);
  };

  return (
    <Stack>
      <Stack
        component={"form"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
        onSubmit={handleSubmit((data) => {
          submit(data);
          reset();
        })}
      >
        <Stack
          width={"100%"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Controller
            name={"name"}
            control={control}
            rules={{
              required: "Nome é obrigatório",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                onChange={onChange}
                value={value}
                fullWidth
                sx={{ mr: 3 }}
                error={!!error}
                helperText={error ? error.message : null}
                InputLabelProps={{
                  shrink: true,
                }}
                label={"Nome *"}
              />
            )}
          />
          <Controller
            name={"email"}
            control={control}
            rules={{
              required: "Email é obrigatório",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Digite um email válido",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                onChange={onChange}
                value={value}
                error={!!error}
                helperText={error ? error.message : null}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                label={"Email *"}
              />
            )}
          />
        </Stack>
        <Stack
          width={"100%"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Controller
            name={"document"}
            control={control}
            rules={{
              required: "Documento é obrigatório",
              minLength: {
                value: 11,
                message: "Digite um documento válido",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <PatternFormat
                label={"Documento *"}
                value={value}
                sx={{ mr: 3 }}
                customInput={TextField}
                format="###.###.###-##"
                fullWidth
                error={!!error}
                helperText={error ? error.message : null}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(value) => onChange(value)}
              />
            )}
          />
          <Controller
            name={"phone"}
            control={control}
            rules={{
              required: "Telefone é obrigatório",
              minLength: {
                value: 11,
                message: "Digite um telefone válido",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <PatternFormat
                label={"Telefone *"}
                value={value}
                customInput={TextField}
                format="(##) # ####-####"
                fullWidth
                error={!!error}
                helperText={error ? error.message : null}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(value) => onChange(value)}
              />
            )}
          />
        </Stack>
        <Stack
          width={"100%"}
          mt={2}
          direction={"row"}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Button
            sx={{ height: { md: 40 }, width: { md: 160, xs: 125 } }}
            variant="contained"
            type="submit"
          >
            Editar
          </Button>
        </Stack>
      </Stack>
      <Stack alignItems={{ sm: "flex-end" }} mb={3} mt={5}>
        <CreateAssignorModal submit={submit} open={open} setOpen={setOpen} />
        <PayableTable
          rows={data?.payables || []}
          totalPages={data?.totalPages || 0}
        />
      </Stack>
    </Stack>
  );
};

export default Dashboard;
