/* eslint-disable @typescript-eslint/no-unused-vars */
import EditableAmount from "@/components/EditableAmount"
import { Button } from "@/components/ui/button"
import "@/index.css"

import {
  BanknoteArrowUp,
  Bell,
  EyeOff,
  Image,
  Menu,
  Pencil,
  Search,
} from "lucide-react"

function NewPay() {
  return (
    <main className="bg-neutral-950 flex items-center justify-center pb-2">
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
        <div className="flex flex-col bg-gradient-1 rounded-t-4xl">
          <div className="flex flex-col bg-white rounded-t-4xl py-12 px-8 text-black">
            <div className="flex justify-between items-center">
              <span className="text-base">
                Saldo disponível: <strong>R$ 345.756,87</strong>
              </span>
              <EyeOff className="cursor-pointer" size={20} />
            </div>
            <div className="flex flex-col mt-16 justify-center items-center text-center">
              <div className="flex items-center gap-2 mb-4">
                <EditableAmount />
                <Pencil size={16} />
              </div>
              <p>Transferindo para</p>
              <span className="uppercase font-bold">
                MIGUEL PIRES DOS SANTOS
              </span>
              <div className="flex flex-col justify-center items-center text-center mt-20">
                <p>
                  Alerta! Destinatário sem histórico confíavel. Deseja continuar
                  com a transfêrencia?
                </p>

                <Button className="bg-gradient-1 mt-8 w-1/2 cursor-pointer">
                  Transferir agora
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
