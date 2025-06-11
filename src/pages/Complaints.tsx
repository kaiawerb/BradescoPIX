import "@/index.css"
import axios from "axios"
import { Bell, Image, Menu, Search } from "lucide-react"
import { useEffect, useState } from "react"

function Complaints() {
  type Usuario = {
    id: number
    nome: string
    cpf: string
    image?: string
  }

  type Denuncia = {
    id: number
    valor_roubado: number
    data_denuncia: string
    denunciado: Usuario
  }

  const [user, setUser] = useState<Usuario | null>(null)
  const [denuncias, setDenuncias] = useState<Denuncia[]>([])
  const [loading, setLoading] = useState(true)

  const userId = 1 // usuário logado

  useEffect(() => {
    axios
      .get(`http://localhost:3001/usuarios/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Erro ao buscar usuário:", err))
  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:3001/denuncias?id_denunciante=${userId}`)
      .then((res) => setDenuncias(res.data))
      .catch((err) => console.error("Erro ao buscar denúncias:", err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="bg-neutral-950 flex items-center justify-center">
      <div
        className="flex flex-col bg-gradient-1 text-white 
                    rounded-3xl shadow-xl w-[390px] min-h-[700px]"
      >
        {/* Cabeçalho */}
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
              <span className="text-base">Denúncias</span>
              <Search className="cursor-pointer" size={20} />
            </div>

            {loading && (
              <p className="mt-6 text-center text-gray-500">Carregando...</p>
            )}

            {!loading && denuncias.length === 0 && (
              <p className="mt-6 text-center text-gray-500">
                Nenhuma denúncia registrada.
              </p>
            )}

            {!loading &&
              denuncias.map((denuncia) => {
                const data = new Date(
                  denuncia.data_denuncia
                ).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })

                return (
                  <div key={denuncia.id} className="flex flex-col mt-8">
                    <span className="text-xs text-[#D9D9D9] font-medium">
                      {data.toUpperCase()}
                    </span>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-4">
                        <Image className="p-6 bg-[#D9D9D9] rounded-sm" />
                        <div className="flex flex-col">
                          <h2 className="uppercase text-base">Denúncia</h2>
                          <span className="text-xs text-[#D9D9D9] font-medium">
                            Transação Suspeita
                          </span>
                        </div>
                      </div>
                      <span className="text-base font-medium text-red-400">
                        R${" "}
                        {Number(denuncia.valor_roubado)
                          .toFixed(2)
                          .replace(".", ",")}
                      </span>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Complaints
