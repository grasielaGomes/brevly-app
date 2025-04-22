import { Card } from '@/components'

export const NotFound = () => {
  return (
    <Card>
      <h1 className="text-6xl font-extrabold text-danger mb-4">404</h1>
      <h2 className="text-xl font-semibold mb-2">Link não encontrado</h2>
      <p className="text-gray-700">
        O link que você está tentando acessar não existe, foi removido ou é uma
        URL inválida.{' '}
        <a
          href="https://brev.ly"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Saiba mais em brev.ly.
        </a>
      </p>
    </Card>
  )
}
