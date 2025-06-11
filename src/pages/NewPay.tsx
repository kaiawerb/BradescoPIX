import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import EditableAmount from "@/components/EditableAmount"
import { Bell, EyeOff, Menu, Pencil } from "lucide-react"
import { useNavigate } from "react-router-dom"

function NewPay() {
  type Usuario = {
    saldo: number
    id: number
    nome: string
    denunciasCount: number
    recebeu_denuncia?: number
    cpf: string
    image?: string
  }

  const { id } = useParams()
  const [user, setUser] = useState<Usuario | null>(null) // destinatário
  const [remetente, setRemetente] = useState<Usuario | null>(null) // remetente
  const [amount, setAmount] = useState("R$ 0,00")
  const [loading, setLoading] = useState(false)
  const remetenteId = 1 // ID fixo ou pegue de onde preferir

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/usuarios/${id}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Erro ao buscar usuário:", err))
    }
    axios
      .get(`http://localhost:3001/usuarios/${remetenteId}`)
      .then((res) => setRemetente(res.data))
      .catch((err) => console.error("Erro ao buscar remetente:", err))
  }, [id])

  function parseCurrency(value: string): number {
    if (!value) return 0
    const cleaned = value.replace(/[^\d,]/g, "").replace(",", ".")
    const numberValue = parseFloat(cleaned)
    return isNaN(numberValue) ? 0 : numberValue
  }

  // Dentro do componente:
  const navigate = useNavigate()

  async function handleTransfer() {
    if (!user || !remetente) return

    const valor = parseCurrency(amount)

    if (valor <= 0) {
      alert("Informe um valor válido para transferência.")
      return
    }

    if (valor > remetente.saldo) {
      alert("Saldo insuficiente.")
      return
    }

    setLoading(true)
    try {
      // 1. Realiza o Pix (atualiza saldos)
      const response = await axios.post("http://localhost:3001/pix", {
        remetenteId,
        destinatarioId: user.id,
        valor,
      })

      const {
        remetente: remetenteAtualizado,
        destinatario: destinatarioAtualizado,
      } = response.data

      // 2. Cria a transação no banco
      await axios.post("http://localhost:3001/transacoes", {
        valor,
        origem_id: remetenteId,
        destino_id: user.id,
        descricao: "Pix realizado",
      })

      setUser(destinatarioAtualizado)
      setRemetente(remetenteAtualizado)
      setAmount("R$ 0,00")

      // 3. Redireciona com dados
      navigate(`/pay/new/${user.id}/receipt`, {
        state: {
          remetente: remetenteAtualizado,
          destinatario: destinatarioAtualizado,
          valor,
        },
      })
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ erro: string }>
      const mensagemErro =
        axiosError?.response?.data?.erro ||
        "Erro desconhecido. Tente novamente."
      alert("Erro ao realizar transferência: " + mensagemErro)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-neutral-950 flex items-center justify-center">
      <div className="flex flex-col bg-gradient-1 text-white rounded-3xl shadow-xl max-w-[390px] min-h-[700px]">
        <header className="flex items-center py-10 px-8 justify-between">
          <div className="flex items-center gap-2 p-0 m-0">
            {user ? (
              <span className="text-base">Olá, {user.nome}</span>
            ) : (
              <span className="text-base text-gray-400">Carregando...</span>
            )}
          </div>
          <div className="flex gap-4">
            <Bell className="cursor-pointer" />
            <Menu className="cursor-pointer" />
          </div>
        </header>

        <div className="flex flex-col bg-gradient-1 rounded-t-4xl">
          <div className="flex flex-col bg-white rounded-t-4xl py-12 px-8 text-black h-screen">
            <div className="flex justify-between items-center">
              <span className="text-base">
                Saldo disponível:{" "}
                <strong>
                  {remetente && remetente.saldo != null
                    ? Number(remetente.saldo).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                    : "carregando..."}
                </strong>
              </span>
              <EyeOff className="cursor-pointer" size={20} />
            </div>
            <div className="flex flex-col mt-16 justify-center items-center text-center">
              <div className="flex items-center gap-2 mb-4">
                <EditableAmount value={amount} onChange={setAmount} />
                <Pencil size={16} />
              </div>
              <p>Transferindo para</p>
              {user ? (
                <span className="uppercase font-bold">{user.nome}</span>
              ) : (
                <span className="uppercase font-bold">Carregando...</span>
              )}

              <div className="flex flex-col justify-center items-center text-center mt-20">
                {user?.recebeu_denuncia && user.recebeu_denuncia >= 1 ? (
                  <p className="text-red-400">
                    Atenção! O destinatário possui {user.denunciasCount}{" "}
                    denúncias registradas.{" "}
                    <span className="font-medium">
                      Deseja continuar com a transferência?
                    </span>
                  </p>
                ) : (
                  <p className="text-green-700">
                    Usuário verificado. Você pode continuar com a transferência.
                  </p>
                )}

                <Button
                  className="bg-gradient-1 mt-8 w-1/2 cursor-pointer"
                  onClick={handleTransfer}
                  disabled={loading}
                >
                  {loading ? "Transferindo..." : "Transferir agora"}
                </Button>
                <Button
                  variant={"outline"}
                  className="mt-4 w-1/2 cursor-pointer"
                >
                  Agendar transferência
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default NewPay
