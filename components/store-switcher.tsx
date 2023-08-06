"use client"

import { Store } from "@prisma/client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useStoreModal } from "@/hooks/use-store-modal"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
    const [open, setOpen] = useState(false)

    const storeModal = useStoreModal()
    const params = useParams()
    const router = useRouter()

    const formattedItems = items.map(item => (
        {
            label: item.name,
            value: item.id
        }
    ))

    const currentStore = formattedItems.find(item => item.value === params.storeId)

    const onStoreSelect = (store: { label: string, value: string }) => {
        setOpen(false)
        router.push(`/${store.value}`)
    }

    return (
        <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
                <Button variant={"outline"} size={"sm"} role="combobox" aria-expanded={open} aria-label="Odaberi trgovinu" className={cn('w-[200px] justify-between', className)}>
                    <StoreIcon className="w-4 h-4 mr-2" />
                    {currentStore?.label}
                    <ChevronsUpDown className="w-4 h-4 ml-auto opacity-50 shrink-0" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Pretraži trgovinu..." />
                        <CommandEmpty >Nema trgovina</CommandEmpty>
                        <CommandGroup heading='Trgovine'>
                            {formattedItems.map(store => (
                                <CommandItem key={store.value} onSelect={() => onStoreSelect(store)} className="text-sm">
                                    <StoreIcon className="w-4 h-4 mr-2" />
                                    {store.label}
                                    <Check className={cn('w-4 h-4 ml-auto', currentStore?.value === store.value ? 'opacity-100' : 'opacity-0')} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem onSelect={() => {
                                setOpen(false)
                                storeModal.onOpen()
                            }}>
                                <PlusCircle className="w-5 h-5 mr-2" />
                                Kreiraj trgovinu
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default StoreSwitcher