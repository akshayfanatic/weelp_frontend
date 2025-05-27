import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const ActivityPage = () => {
  return (
    <div>ActivityPage
      <Button asChild><Link className=''  href={'/dashboard/admin/activities/new'}>Create Activity</Link></Button>
    </div>
  )
}

export default ActivityPage