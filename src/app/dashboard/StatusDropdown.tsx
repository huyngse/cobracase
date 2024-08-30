"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { OrderStatus } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import React from 'react'
import { changeOrderStatus } from './actions'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'

const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
    awaiting_shipment: "Awaiting shipment",
    fulfilled: "Fulfilled",
    shipped: "Shipped"
}

const StatusDropdown = ({ orderId, status }: { orderId: string, status: OrderStatus }) => {
    const router = useRouter();
    const { mutate } = useMutation({
        mutationKey: ["change-order-status"],
        mutationFn: changeOrderStatus,
        onSuccess: () => {
            router.refresh();
        },
        onError: () => {
            toast({
                title: "Something went wrong",
                description: "Failed to update order status",
                variant: "destructive"
            })
        }
    });
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={'outline'}
                    className='w-52 flex justify-between items-center'
                >
                    {LABEL_MAP[status]}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-0'>
                {
                    Object.keys(OrderStatus).map(s => (
                        <DropdownMenuItem
                            key={s}
                            className={cn("flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100", {
                                "bg-zinc-100": s === status
                            })}
                            onClick={() => mutate({ orderId, newStatus: s as OrderStatus })}
                        >
                            <Check className={cn('mr-2 h-4 w-4 text-primary', status === s ? "opacity-100" : "opacity-0")} />
                            {LABEL_MAP[s as OrderStatus]}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default StatusDropdown