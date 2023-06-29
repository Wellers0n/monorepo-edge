import React from 'react'
import Sidebar from '@/components/Sidebar'

export default function Template({ children }: { children: React.ReactNode }) {
  return <Sidebar title={'Payables'}>{children}</Sidebar>
}
