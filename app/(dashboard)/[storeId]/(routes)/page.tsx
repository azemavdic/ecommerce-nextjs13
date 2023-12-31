import prismadb from '@/lib/prismadb'
import React from 'react'

const Dashboard = async({ params }: { params: { storeId: string } }) => {

  const store=await prismadb.store.findFirst({
    where:{
      id:params.storeId
    }
  })

  return <div>Naziv trgovine: {store?.name}</div>
}

export default Dashboard
