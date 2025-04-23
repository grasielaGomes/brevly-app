import { Card, Info, LogoIcon } from '@/components'

export const Redirect = () => {
  return (
    <Card>
      <Info
        icon={<LogoIcon />}
        title="Redirecionando..."
        description="O link será aberto automaticamente em alguns instantes.
        Não foi redirecionado?"
        actionText="Acesse aqui"
        actionHref="https://brev.ly"
      />
    </Card>
  )
}
