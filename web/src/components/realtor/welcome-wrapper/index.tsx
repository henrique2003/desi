import './styles.css'

const WelcomeWrapper: React.FC = () => {
  return (
    <div className="w-full py-[50px] px-10 flex flex-col items-start justify-center bg-blue-500 rounded-br-[300px] max-lg:rounded-none overflow-hidden realtor-welcome-bg bg-no-repeat max-sm:px-5">
      <div className='flex flex-col items-start justify-center h-full'>
        <h2 className="text-5xl font-semibold text-white mt-5 max-md:text-4xl">Boa tarde, Lauriano Dias Flauzino</h2>
        <p className="text-xl mt-3 font-normal text-white text-opacity-2 max-md:text-lg">Hoje estamos com milhares de empreendimentos com ótimas comissões</p>
        <div className="flex gap-5 mt-10 w-full max-sm:flex-col">
          <input type="text" className="rounded-[8px] outline-none bg-white px-5 border border-gray-500 h-[45px] max-w-[450px] w-full text-md text-gray-500 placeholder:text-gray-500 max-sm:max-w-full" placeholder='Procure pelo nome ou referencia do Imóveil' />
          <button type="button" className='max-w-[170px] w-full rounded-[8px] bg-blue-700 bg-opacity-[0.6] hover:bg-opacity-[0.7] ease duration-200 text-sm font-semibold max-md:max-w-[145px] h-[45px] max-sm:h-[40px] max-sm:max-w-full'>Busca avançada</button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeWrapper
