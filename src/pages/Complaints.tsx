/* eslint-disable @typescript-eslint/no-unused-vars */
import "@/index.css"

import { Bell, EyeOff, Image, Menu, Search } from "lucide-react"

function Complaints() {
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
              <span className="text-base">Denúncias</span>
              <Search className="cursor-pointer" size={20} />
            </div>
            <div key="teste" className="flex flex-col mt-8">
              <span className="text-xs text-[#D9D9D9] font-medium">
                04 DE JUNHO DE 2025
              </span>
              <div key="vazio" className="flex flex-col mt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image className="p-6 bg-[#D9D9D9] rounded-sm" />
                    <div className="flex flex-col">
                      <h2 className="uppercase text-base">Carlos Andrade</h2>
                      <span className="text-xs text-[#D9D9D9] font-medium">
                        Transação Suspeita
                      </span>
                    </div>
                  </div>
                  <span className="text-base font-medium text-red-400">
                    R$4870,35
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Complaints
