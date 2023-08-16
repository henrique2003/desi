import { RealtorContainer } from '@/components'

const RealtorHome: React.FC = () => {
  return (
    <RealtorContainer>
      <div className="w-full p-5 flex flex-col items-start justify-center bg-blue-500">
        <h2 className="text-2xl font-semibold text-white">Boa tarde, Lauriano Dias Flauzino</h2>
        <p className="text-lg mt-1 font-normal text-white">Hoje estamos com milhares de empreendimentos com ótimas comissões</p>
        <div className="flex gap-3">
          <input type="text" className="w-full rounded-[8px] outline-none bg-white px-3 border border-gray-500 h-[35px]" />
          <button type="button">Busca</button>
        </div>
      </div>
    </RealtorContainer>
  )
}

export default RealtorHome
