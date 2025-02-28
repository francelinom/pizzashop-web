import { Link, useRouteError } from 'react-router-dom'
export function Error() {
    const erro = useRouteError() as Error

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-2">
            <h1 className="text-4xl font-bold">Whoops, algo aconteceu...</h1>
            <p className="text-accent-foreground">
                um erro aconteceu na aplicação, abaixo você pode ver o detalhe do erro:
            </p>
            <pre>{erro.message || JSON.stringify(erro)}</pre>
            <p className="text-accent-foreground">
                Voltar para o{' '}
                <Link to="/" className="text-sky-600 dark:text-sky-400">
                    Dashboard
                </Link>
            </p>
        </div>
    )
}