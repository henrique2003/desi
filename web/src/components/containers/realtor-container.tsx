import { SideNavigation } from '../index'

interface IProps {
  children: JSX.Element
}

const RealtorContainer: React.FC<IProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-slate-100 flex">
      <SideNavigation />
      <main className="px-10 w-full max-sm:px-5">
        {children}
      </main>
    </div>
  )
}

export default RealtorContainer
