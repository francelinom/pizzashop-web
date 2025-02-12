import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { signIn } from '@/api/sign-in'

const signInForm = z.object({
    email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
    const { register, handleSubmit, formState } = useForm<SignInForm>()

    const { mutateAsync: authenticate } = useMutation({
        mutationFn: signIn
    })

    async function handleSingnIn(data: SignInForm) {
        try {
            await authenticate({ email: data.email })

            toast.success('Enviamos um e-mail para seu e-mail.', {
                action: {
                    label: 'Reenviar',
                    onClick: () => handleSingnIn(data)
                }
            })
        } catch (error) {
            toast.error('Ops! Algo deu errado.')
        }

    }

    return (
        <>
            <Helmet title="Login" />

            <div className="p-8">

                <Button variant="outline" asChild className="absolute top-8 right-8">
                    <Link to="/sign-up">
                        Novo Estabelecimento
                    </Link>
                </Button>

                <div className="flex w-[350px] flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Acessar painel
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Acompanhe suas vendas pelo painel do parceiro!
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit(handleSingnIn)}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input id="email" type="email" {...register('email')} />
                        </div>

                        <Button className="w-full" type="submit" disabled={formState.isSubmitting}>
                            Acessar painel
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}