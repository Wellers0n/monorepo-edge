import React from "react";
import Modal from "@/components/Modal";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Stack,
  TextField,
  AutocompleteRenderInputParams,
} from "@mui/material";
import { PatternFormat } from "react-number-format";

type Submit = {
  name: string;
  document: string;
  phone: string;
  email: string;
};

type CreateFarmModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void | boolean;
  submit: (submit: Submit) => Promise<void>;
};

const CreateFarmModal = (props: CreateFarmModalProps) => {
  const { open, setOpen, submit } = props;
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      document: "",
      email: "",
      phone: "",
    },
  });

  return (
    <Modal title={"Adicionar cedente"} open={open} setOpen={setOpen}>
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
              error={!!error}
              helperText={error ? error.message : null}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
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
              label={"Email"}
            />
          )}
        />
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
              label={"Documento"}
              value={value}
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
              label={"Telefone"}
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
        <Stack
          width={"100%"}
          mt={2}
          direction={"row"}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Button
            variant="outlined"
            color="error"
            sx={{ height: { md: 40 }, width: { md: 160, xs: 135 } }}
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            sx={{ height: { md: 40 }, width: { md: 160, xs: 125 } }}
            variant="contained"
            type="submit"
          >
            Adicionar
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default CreateFarmModal;
