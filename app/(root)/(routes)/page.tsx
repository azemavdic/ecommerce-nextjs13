'use client'

import { useState, useEffect } from 'react'
import { UserButton } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { useStoreModal } from '@/hooks/use-store-modal'

export default function SetupPage() {
  const isOpen = useStoreModal((state) => state.isOpen)
  const onOpen = useStoreModal((state) => state.onOpen)

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return null
}
