import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

type Props = {
  open: boolean
  setOpen: (value: boolean) => void | boolean
  children: React.ReactNode
  title: string
}

const ModalComponent = (props: Props) => {
  const { open, setOpen, title, children } = props

  const handleClose = () => setOpen(false)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Box mt={2}>{children}</Box>
      </Box>
    </Modal>
  )
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', sm: 400, md: 500 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

export default ModalComponent
