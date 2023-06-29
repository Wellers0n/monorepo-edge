import React, { createContext, useState } from 'react'

type Props = {
  children?: React.ReactNode
}

type SidebarContextProps = {
  open: boolean
  setOpen: (item: boolean) => void | boolean
}

export const SidebarContext = createContext({} as SidebarContextProps)

function SidebarContextProvider({ children }: Props) {
  const [open, setOpen] = useState(true)

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarContextProvider
