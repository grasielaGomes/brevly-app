import { Button } from '@/components'

export const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p className="font-primary">Welcome to the home page!</p>
      <Button variant="primary">Salvar</Button>
      <Button variant="secondary">Excluir</Button>
    </div>
  )
}
