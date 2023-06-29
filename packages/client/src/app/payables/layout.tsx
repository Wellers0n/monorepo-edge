import React from 'react'

export const metadata = {
  title: 'Payables',
  description: 'Payables'
}

export default function PayableLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <React.Fragment>{children}</React.Fragment>
}
