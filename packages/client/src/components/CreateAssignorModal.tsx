import React from 'react'
import Modal from '@/components/Modal'
import { Controller, useForm } from 'react-hook-form'
import { Button, Stack, TextField } from '@mui/material'

type Submit = {
  name: string
  description: string
}

type CreateFarmModalProps = {
  open: boolean
  setOpen: (value: boolean) => void | boolean
  submit: (submit: Submit) => Promise<void>
}

const CreateFarmModal = (props: CreateFarmModalProps) => {
  const { open, setOpen, submit } = props
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: '',
      description: ''
    }
  })

  // const submit = async ({ name, description }: Submit) => {
  //   console.log({ name, description })
  //   // mutate({
  //   //   email,
  //   //   password
  //   // })
  // }

  return (
    <Modal title={'Adicionar cedente'} open={open} setOpen={setOpen}>
      <Stack
        component={'form'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        spacing={2}
        onSubmit={handleSubmit((data) => {
          submit(data)
          reset()
        })}
      >
        <Controller
          name={'name'}
          control={control}
          rules={{
            required: 'Nome é obrigatório'
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              onChange={onChange}
              value={value}
              error={!!error}
              helperText={error ? error.message : null}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              label={'Nome *'}
            />
          )}
        />
        <Controller
          name={'description'}
          control={control}
          rules={
            {
              // required: 'Nome é obrigatório'
            }
          }
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              onChange={onChange}
              value={value}
              error={!!error}
              helperText={error ? error.message : null}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              label={'Descrição'}
            />
          )}
        />
        <Stack
          width={'100%'}
          mt={2}
          direction={'row'}
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
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
  )
}

export default CreateFarmModal
