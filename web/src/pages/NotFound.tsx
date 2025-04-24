import { Card, Icon404, Info } from '@/components'

export const NotFound = () => {
  return (
    <Card>
      <Info
        icon={<Icon404 />}
        title="Link não encontrado"
        description="O link que você está tentando acessar não existe, foi removido ou 
        é uma URL inválida. Saiba mais em"
        actionText="brev.ly"
        actionHref="/"
      />
    </Card>
  )
}
