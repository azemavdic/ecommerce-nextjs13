'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

import { useStoreModal } from '@/hooks/use-store-modal'
import { Modal } from '@/components/ui/modal'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { redirect } from 'next/navigation'

const formSchema = z.object({
  name: z.string().min(1, 'Minimalno 1 slovo potrebno.'),
})

const StoreModal = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { isOpen, onClose, onOpen } = useStoreModal()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      const response = await axios.post('/api/stores', values)
      window.location.assign(`/${response.data.id}`)
    } catch (error) {
      toast.error('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal title='Kreiraj trgovinu' description='Nova trgovina' isOpen={isOpen} onClose={onClose}>
      <div>
        <div className='py-2 pb-4 space-y-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Naziv</FormLabel>
                    <FormControl>
                      <Input placeholder='Ecommerce' disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex items-center justify-end w-full pt-6 space-x-2'>
                <Button variant={'outline'} onClick={onClose} disabled={isLoading}>
                  Odustani
                </Button>
                <Button type='submit' disabled={isLoading}>
                  Nastavi
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  )
}

export default StoreModal
