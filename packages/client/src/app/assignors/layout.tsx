import React from 'react'

export const metadata = {
  title: 'Cedentes',
  description: 'Cedentes'
}

export default function AssignorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <React.Fragment>{children}</React.Fragment>
}
