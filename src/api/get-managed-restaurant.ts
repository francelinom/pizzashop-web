import { api } from "@/lib/axios";

interface GetManagedResponse {
    id: string
    name: string
    createdAt: Date | null
    updatedAt: Date | null
    description: string
    managedId: string
}

export async function getManagedRestaurant() {
    const response = await api.get<GetManagedResponse>('/managed-restaurant')

    return response.data
}