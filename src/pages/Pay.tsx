import "@/index.css"
import { useEffect, useState } from "react"
import axios from "axios"

import { BanknoteArrowUp, Bell, Menu, Search } from "lucide-react"
import { Link } from "react-router-dom"

function Pay() {
  type Usuario = {
    id: number
    nome: string
    cpf: string
    image?: string
  }

  const [users, setUsers] = useState<Usuario[]>([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/usuarios")
      .then((res) => {
        const filtrados = res.data.filter((user: Usuario) => user.id !== 1)
        setUsers(filtrados)
      })
      .catch((err) => console.error("Erro ao buscar usuários:", err))
  }, [])

  return (
    <main className="bg-neutral-950 flex items-center justify-center">
      <div className="flex flex-col bg-gradient-1 text-white rounded-3xl shadow-xl w-[390px] min-h-[700px]">
        <header className="flex items-center py-10 px-8 justify-between">
          <div className="flex items-center gap-2 p-0 m-0">
            <span className="text-base">Olá!</span>
          </div>
          <div className="flex gap-4">
            <Bell className="cursor-pointer" />
            <Menu className="cursor-pointer" />
          </div>
        </header>

        <div className="flex flex-col bg-gradient-1 rounded-t-4xl ">
          <div className="flex flex-col bg-white rounded-t-4xl py-12 px-8 text-black h-dvh">
            <div className="flex justify-between items-center">
              <span className="text-base">Meus contatos</span>
              <Search className="cursor-pointer" size={20} />
            </div>

            <div className="flex flex-col mt-4">
              {users.map((user) => (
                <div key={user.id} className="flex flex-col mt-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={user.image || "/profileUrlPlaceHolder.png"}
                        alt={user.nome}
                        className="w-12 h-12 object-cover bg-[#D9D9D9] rounded-full"
                      />
                      <div className="flex flex-col">
                        <h2 className="uppercase text-base">{user.nome}</h2>
                        <span className="text-xs text-[#d9d9d9] font-medium">
                          CPF: {user.cpf}
                        </span>
                      </div>
                    </div>
                    <Link to={`/pay/new/${user.id}`}>
                      <BanknoteArrowUp color="#32a852" size={28} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Pay
