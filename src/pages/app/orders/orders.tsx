import { Helmet } from 'react-helmet-async'
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { OrderTableRow } from './order-table-row'
import { OrderTableFilters } from './order-table-filters'
import { Pagination } from '@/components/pagination'
import { get } from 'http'
import { getOrders } from '@/api/get-orders'
import { useQuery } from '@tanstack/react-query'

export function Orders() {
    const { data: results } = useQuery({
        queryKey: ['orders'],
        queryFn: getOrders,
    })

    return (
        <>
            <Helmet title="Pedidos" />
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
            </div>
            <div className="space-y-2.5">
                <OrderTableFilters />
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[64px]"></TableHead>
                                <TableHead className="w-[140px]">Identificador</TableHead>
                                <TableHead className="w-[180px]">Realizado há</TableHead>
                                <TableHead className="w-[140px]">Status</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead className="w-[140px]">Total do pedido</TableHead>
                                <TableHead className="w-[164px]"></TableHead>
                                <TableHead className="w-[132px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {results && results.orders.map((order) => (
                                <OrderTableRow key={order.orderId} order={order} />
                            ))}
                        </TableBody>
                    </Table>
                    <Pagination pageIndex={0} totalCount={105} perPage={10} />
                </div>
            </div>
        </>
    )
}