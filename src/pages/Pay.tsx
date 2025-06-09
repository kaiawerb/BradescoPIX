/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button"
import "@/index.css"

import {
  BanknoteArrowUp,
  Bell,
  EyeOff,
  Image,
  Menu,
  Search,
} from "lucide-react"

function Pay() {
  const users = [
    {
      id: 1,
      name: "Carlos Andrade",
      cpf: "000.158.000-87",
    },
    {
      id: 2,
      name: "Sofia Martins",
      cpf: "123.456.789-00",
    },
    {
      id: 3,
      name: "Willian Souza",
      cpf: "987.654.321-22",
    },
    {
      id: 4,
      name: "Kaiã Oliveira",
      cpf: "456.789.123-44",
    },
    {
      id: 5,
      name: "Eric Kenji",
      cpf: "321.987.654-55",
    },
  ]

  return (
    <main className="bg-neutral-950 flex items-center justify-center">
      <div
        className="flex flex-col bg-gradient-1 text-white 
                    rounded-3xl shadow-xl w-[390px] min-h-[700px]"
      >
        {/* Simula barra de app */}
        <header className="flex items-center py-10 px-8 justify-between">
          <div className="flex items-center gap-2 p-0 m-0">
            <span className="text-base">Olá, Sophia</span>
          </div>
          <div className="flex gap-4">
            <Bell className="cursor-pointer" />
            <Menu className="cursor-pointer" />
          </div>
        </header>

        {/* Restante do conteúdo */}
        <div className="flex flex-col bg-gradient-1 rounded-t-4xl ">
          <div className="flex flex-col bg-white rounded-t-4xl py-12 px-8 text-black h-dvh">
            <div className="flex justify-between items-center">
              <span className="text-base">Meus contatos</span>
              <Search className="cursor-pointer" size={20} />
            </div>
            <div className="flex flex-col mt-3">
              {users.map((user) => (
                <div key={user.id} className="flex flex-col mt-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Image className="p-5 bg-[#D9D9D9] rounded-full" />
                      <div className="flex flex-col">
                        <h2 className="uppercase text-base">{user.name}</h2>
                        <span className="text-xs text-[#d9d9d9] font-medium">
                          CPF: {user.cpf}
                        </span>
                      </div>
                    </div>
                    <BanknoteArrowUp color="#32a852" size={28} />
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
