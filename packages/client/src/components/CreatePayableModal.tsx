import React from "react";
import Modal from "@/components/Modal";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Stack,
  TextField,
  AutocompleteRenderInputParams,
  Autocomplete,
  createFilterOptions,
} from "@mui/material";
import { PatternFormat } from "react-number-format";
import { Assignor } from "@/types";
import useAssignorsData from "@/hooks/useAssignorsData";

type Submit = {
  value: number | null;
  assignor: {
    name: string;
    id: number;
  } | null;
};

type CreateFarmModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void | boolean;
  submit: (submit: Submit) => Promise<void>;
};

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option: FilmOptionType) => option.name,
});
interface FilmOptionType {
  name: string;
  id: number;
}

const CreateFarmModal = (props: CreateFarmModalProps) => {
  const { open, setOpen, submit } = props;
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      value: null,
      assignor: null,
    },
  });

  const { data, isLoading } = useAssignorsData({
    params: {
      limit: 200,
      offset: 0,
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
          name={"value"}
          control={control}
          rules={{
            required: "Valor é obrigatório",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              type="number"
              onChange={onChange}
              value={value}
              error={!!error}
              helperText={error ? error.message : null}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              label={"Valor *"}
            />
          )}
        />
        <Controller
          name={"assignor"}
          control={control}
          rules={{
            required: "Centente é obrigatório",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Autocomplete
              fullWidth
              loading={isLoading}
              id="filter-demo"
              options={data?.assignors || []}
              value={value}
              onChange={(_, value: any) => onChange(value)}
              getOptionLabel={(option) => option.name}
              filterOptions={filterOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={!!error}
                  helperText={error ? error.message : null}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Cendentes *"
                />
              )}
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
