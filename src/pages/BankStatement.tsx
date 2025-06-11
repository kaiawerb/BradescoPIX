import "@/index.css"
import axios from "axios"

import { BadgeX, Bell, Image, Menu, Search } from "lucide-react"
import { useEffect, useState, type JSX } from "react"
import { SiAmazon, SiNetflix, SiIfood, SiSteam, SiUber } from "react-icons/si"

type Usuario = {
  id: number
  nome: string
  cpf: string
  image?: string
}

type Transacao = {
  id: number
  valor: number
  data_transacao: string
  descricao: string
  origem: Usuario
  destino: Usuario
}

function BankStatement() {
  const userId = 1 // usuário logado fixo

  const [user, setUser] = useState<Usuario | null>(null)
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Busca usuário logado
    axios
      .get(`http://localhost:3001/usuarios/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Erro ao buscar usuário:", err))
  }, [userId])

  useEffect(() => {
    setLoading(true)
    // Busca transações que envolvam o usuário (como origem ou destino)
    axios
      .get(`http://localhost:3001/transacoes?usuarioId=${userId}`)
      .then((res) => setTransacoes(res.data))
      .catch((err) => console.error("Erro ao buscar transações:", err))
      .finally(() => setLoading(false))
  }, [userId])

  // Agrupa transações por data formatada (ex: "04 DE JUNHO DE 2025")
  function agruparPorData(transacoes: Transacao[]) {
    const grupos: { [key: string]: Transacao[] } = {}

    transacoes.forEach((t) => {
      const data = new Date(t.data_transacao)
      const dataFormatada = data
        .toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
        .toUpperCase()

      if (!grupos[dataFormatada]) grupos[dataFormatada] = []
      grupos[dataFormatada].push(t)
    })

    return grupos
  }

  const transacoesPorData = agruparPorData(transacoes)

  // Ícones por descrição, para mostrar na listagem
  const iconesPorDescricao: Record<string, JSX.Element> = {
    Uber: <SiUber size={24} />,
    Netflix: <SiNetflix size={24} />,
    Ifood: <SiIfood size={24} />,
    Steam: <SiSteam size={24} />,
    Amazon: <SiAmazon size={24} />,
  }

  return (
    <main className="bg-neutral-950 flex items-center justify-center">
      <div
        className="flex flex-col bg-gradient-1 text-white 
                    rounded-3xl shadow-xl w-[390px] min-h-[700px]"
      >
        {/* Barra de app */}
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

        {/* Conteúdo */}
        <div className="flex flex-col bg-gradient-1 rounded-t-4xl ">
          <div className="flex flex-col bg-white rounded-t-4xl py-12 px-8 text-black h-screen">
            <div className="flex justify-between items-center">
              <span className="text-base">Transações</span>
              <Search className="cursor-pointer" size={20} />
            </div>

            {loading && <p>Carregando transações...</p>}

            {!loading && Object.keys(transacoesPorData).length === 0 && (
              <p className="mt-4 text-center text-gray-600">
                Nenhuma transação encontrada.
              </p>
            )}

            {!loading &&
              Object.entries(transacoesPorData).map(([data, items]) => (
                <div key={data} className="flex flex-col mt-8">
                  <span className="text-xs text-[#D9D9D9] font-medium">
                    {data}
                  </span>

                  {items.map((item) => {
                    const isSaida = item.origem.id === userId
                    const valorFormatado = `R$ ${Number(item.valor)
                      .toFixed(2)
                      .replace(".", ",")}`
                    const icone = iconesPorDescricao[item.descricao] || (
                      <Image />
                    )

                    return (
                      <div key={item.id} className="flex flex-col mt-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {isSaida ? (
                              <button
                                onClick={() =>
                                  axios
                                    .post("http://localhost:3001/denuncias", {
                                      id_denunciante: userId,
                                      id_denunciado: item.destino.id,
                                      valor_roubado: item.valor,
                                    })
                                    .then(() =>
                                      alert("Denúncia enviada com sucesso!")
                                    )
                                    .catch((err) => {
                                      console.error(
                                        "Erro ao enviar denúncia:",
                                        err
                                      )
                                      alert("Erro ao enviar denúncia.")
                                    })
                                }
                                className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded cursor-pointer"
                              >
                                <BadgeX />
                              </button>
                            ) : (
                              <div className="p-2 rounded-sm">{icone}</div>
                            )}

                            <div className="flex flex-col">
                              <h2 className="uppercase text-base">
                                {item.descricao || "Não informado"}
                              </h2>
                              <span className="text-xs text-[#D9D9D9] font-medium">
                                {new Date(
                                  item.data_transacao
                                ).toLocaleTimeString("pt-BR", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                                {" - "}
                                {isSaida
                                  ? `Para: ${item.destino.nome}`
                                  : `De: ${item.origem.nome}`}
                              </span>
                            </div>
                          </div>
                          <span
                            className={`text-base font-medium ${
                              isSaida ? "text-red-400" : "text-green-600"
                            }`}
                          >
                            {isSaida ? "-" : "+"}
                            {valorFormatado}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default BankStatement
