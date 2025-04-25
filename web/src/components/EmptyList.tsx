import { FC } from 'react'
import { Link } from '@phosphor-icons/react'

export const EmptyList: FC = () => {
  return (
    <div className="h-50 flex flex-col items-center justify-center gap-4">
      <div className="flex justify-center">
        {<Link size={32} className="text-gray-400" />}
      </div>

      <p className="text-[10px] text-gray-400 uppercase">
        ainda não existem links cadastrados
      </p>
    </div>
  )
}
