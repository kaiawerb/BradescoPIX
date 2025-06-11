import { useLocation } from "react-router-dom"
import { Bell, Menu } from "lucide-react"

function PayReceipt() {
  const location = useLocation()
  const { remetente, destinatario, valor } = location.state || {}

  if (!remetente || !destinatario || !valor) {
    return (
      <main className="bg-neutral-950 flex items-center justify-center h-screen">
        <p className="text-white text-lg">
          Erro: dados do recibo não encontrados.
        </p>
      </main>
    )
  }

  function formatCPF(cpf: string): string {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
  }

  function formatCurrency(valor: number): string {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return (
    <main className="bg-neutral-950 flex items-center justify-center">
      <div className="flex flex-col bg-gradient-1 text-white rounded-3xl shadow-xl w-[390px] min-h-[700px]">
        <header className="flex items-center py-10 px-8 justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-medium">Comprovante</span>
          </div>
          <div className="flex gap-4">
            <Bell className="cursor-pointer" />
            <Menu className="cursor-pointer" />
          </div>
        </header>

        <div className="flex flex-col bg-gradient-1 rounded-t-4xl">
          <div className="flex flex-col bg-white rounded-t-4xl py-12 px-8 text-black h-screen">
            <div className="flex flex-col mt-9 justify-center items-center text-center">
              <div className="flex flex-col items-center gap-2 mb-10">
                <h5 className="text-2xl font-medium">Pix Enviado!</h5>
                <h4 className="text-3xl font-semibold">
                  {formatCurrency(Number(valor))}
                </h4>
              </div>

              <div className="flex flex-col items-center text-center mt-8">
                <span className="text-base font-medium mb-1">Origem</span>
                <p className="text-base">{remetente.nome}</p>
                <p className="text-base text-gray-600">
                  CPF: {formatCPF(remetente.cpf)}
                </p>
              </div>

              <div className="flex flex-col items-center text-center mt-12">
                <span className="text-base font-medium mb-1">Destino</span>
                <p className="text-base">{destinatario.nome}</p>
                <p className="text-base text-gray-600">
                  CPF: {formatCPF(destinatario.cpf)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PayReceipt
