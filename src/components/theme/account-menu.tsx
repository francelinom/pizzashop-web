import { Building, ChevronDown, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { Skeleton } from "../ui/skeleton";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { StoreProfileDialog } from "../store-profile-dialog";
import { signOut } from "@/api/sign-out";
import { replace, useNavigate } from "react-router-dom";

export function AccountMenu() {
    const natigate = useNavigate()
    const { data: profile, isLoading: isLoadingProfile } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        staleTime: Infinity
    })

    const { data: managedRestaurant, isLoading: isLoadingRestaurantManaged } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant,
        staleTime: Infinity
    })

    const { mutateAsync: signOutFn, isPeding: isSigningOut } = useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            natigate('/sign-in', { replace: true })
        }
    })

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 select-none">
                        {isLoadingRestaurantManaged ? (<Skeleton className="h-8 w-48" />) : (managedRestaurant?.name)}
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex flex-col">
                        {
                            isLoadingProfile ? (
                                <div className="space-y-1.5">
                                    <Skeleton className="h-8 w-32" />
                                    <Skeleton className="h-8 w-32" />
                                </div>
                            ) : (
                                <>
                                    <span>{profile?.name}</span>
                                    <span className="text-xs font-normal text-muted-foreground">{profile?.email}</span>
                                </>
                            )
                        }
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DialogTrigger asChild>
                        <DropdownMenuItem >
                            <Building className="w-4 h-4 mr-2" />
                            <span>Perfil da loja</span>
                        </DropdownMenuItem>
                    </DialogTrigger>

                    <DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400" disabled={isSigningOut} onClick={() => signOutFn()}>
                        <button onClick={() => signOutFn()} className="w-full">
                            <LogOut className="w-4 h-4 mr-2" />
                            <span>Sair</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <StoreProfileDialog />
        </Dialog>
    )
}