/* eslint-disable @typescript-eslint/no-unused-vars */
import "@/index.css"

import { Bell, EyeOff, Image, Menu, Search } from "lucide-react"

function Pay() {
  return (
    <main className="bg-neutral-950 flex items-center justify-center pb-20">
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
          <div className="flex flex-col bg-white rounded-t-4xl py-12 px-8 text-black">
            <div className="flex justify-between items-center">
              <span className="text-base">Saldo disponível</span>
              <Search className="cursor-pointer" size={20} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Pay
