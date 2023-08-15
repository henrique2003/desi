import { PDFViewer } from '@react-pdf/renderer'
import Pdf from '@/assets/pdfs/termos_de_uso.pdf'

const UserTerms: React.FC = () => {
  return (
    <PDFViewer>
      <Pdf />
    </PDFViewer>
  )
}

export default UserTerms
