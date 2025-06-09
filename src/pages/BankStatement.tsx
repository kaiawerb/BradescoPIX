/* eslint-disable @typescript-eslint/no-unused-vars */
import "@/index.css"

import { Bell, EyeOff, Image, Menu, Search } from "lucide-react"

function BankStatement() {
  function randomDate(start: Date, end: Date) {
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )
    return (
      date.toLocaleDateString("pt-BR") +
      " " +
      date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    )
  }

  function randomAmount() {
    return "R$ " + (Math.random() * 500).toFixed(2)
  }

  function randomTitle() {
    const titles = [
      "Posto Gasolina",
      "Steam Carteira",
      "Uber",
      "Ifood",
      "Supermercado",
      "Netflix",
      "Amazon",
      "Academia",
      "Farmácia",
      "Padaria",
    ]
    return titles[Math.floor(Math.random() * titles.length)]
  }

  const transactions = [
    {
      date: "04 DE JUNHO DE 2025",
      items: Array.from({ length: 4 }, () => ({
        title: randomTitle(),
        datetime: randomDate(new Date(2025, 5, 1), new Date(2025, 5, 4)),
        amount: randomAmount(),
      })),
    },
    {
      date: "03 DE JUNHO DE 2025",
      items: Array.from({ length: 3 }, () => ({
        title: randomTitle(),
        datetime: randomDate(new Date(2025, 5, 1), new Date(2025, 5, 3)),
        amount: randomAmount(),
      })),
    },
  ]

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
              <span className="text-base">Transações</span>
              <Search className="cursor-pointer" size={20} />
            </div>

            {transactions.map((section) => (
              <div key={section.date} className="flex flex-col mt-8">
                <span className="text-xs text-[#D9D9D9] font-medium">
                  {section.date}
                </span>

                {section.items.map((item, index) => (
                  <div key={index} className="flex flex-col mt-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Image className="p-6 bg-[#D9D9D9] rounded-sm" />
                        <div className="flex flex-col">
                          <h2 className="uppercase text-base">{item.title}</h2>
                          <span className="text-xs text-[#D9D9D9] font-medium">
                            {item.datetime}
                          </span>
                        </div>
                      </div>
                      <span className="text-base font-medium">
                        {item.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default BankStatement
