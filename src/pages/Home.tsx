/* eslint-disable @typescript-eslint/no-unused-vars */
import "@/index.css"
import { Button } from "@/components/ui/button"

import {
  Banknote,
  Bell,
  ChevronRight,
  CreditCard,
  EyeOff,
  Menu,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Bar, BarChart, XAxis } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import TabIcon from "@/components/TabIcon"
import { Link } from "react-router-dom"

function Home() {
  const actions = [
    { label: "PIX", icon: Banknote, to: "/pay" },
    { label: "Extrato", icon: Banknote, to: "/complaints" },
    { label: "Transf.", icon: Banknote, to: "/404" },
    { label: "CRÉDITO", icon: CreditCard, to: "/404" },
  ]

  const chartData = [
    { month: "JANEIRO", desktop: 186 },
    { month: "FEVEREIRO", desktop: 305 },
    { month: "MARÇO", desktop: 237 },
    { month: "ABRIL", desktop: 73 },
    { month: "MAIO", desktop: 209 },
    { month: "JUNHO", desktop: 214 },
  ]
  const chartConfig = {
    desktop: {
      label: "Rendeu",
      color: "#CA0A36",
    },
  } satisfies ChartConfig

  return (
    <main className="bg-neutral-950 flex items-center justify-center pb-20">
      <div
        className="flex flex-col bg-gradient-3 text-white 
                    rounded-3xl shadow-xl w-[390px] min-h-[700px]"
      >
        {/* Simula barra de app */}
        <header className="flex items-center py-10 px-8 justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-base">Olá, Sophia</span>
          </div>
          <div className="flex gap-4">
            <Bell className="cursor-pointer" />
            <EyeOff className="cursor-pointer" />
            <Menu className="cursor-pointer" />
          </div>
        </header>

        {/* Restante do conteúdo */}
        <div className="flex flex-col bg-gradient-1 rounded-t-4xl ">
          <div className="flex flex-col px-8 py-7">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-base">Saldo disponível</span>
                <h5 className="text-2xl">R$ 345.756,87</h5>
              </div>
              <ChevronRight className="cursor-pointer" size={24} />
            </div>
            <Link
              to="/bankstatement"
              className="uppercase text-xs mt-5 cursor-pointer"
            >
              Ver extrato
            </Link>
            <Separator className="mt-7 opacity-50" />
            <div className="flex justify-between mt-7 mb-3">
              {actions.map(({ label, icon: Icon, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="flex flex-col cursor-pointer items-center gap-3 justify-center"
                >
                  <div className="icon bg-white p-2 rounded-xl">
                    <Icon color="#B6657A" size={34} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs uppercase">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col bg-white rounded-t-4xl py-12 px-8 text-black">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-base">Total Investido</span>
                <h5 className="text-2xl">R$ 345.756,87</h5>
              </div>
              <Button className="py-5 px-8 text-sm text-[#CA0A36] bg-transparent border border-[#CA0A36] hover:bg-[#CA0A36] hover:text-white cursor-pointer">
                Resgatar
              </Button>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-base">Disponível para resgate</span>
              <span className="text-base font-medium">R$ 12.324,99</span>
            </div>
            <Separator className="mt-8" />
            <div className="flex flex-col mt-8">
              <span className="text-base">Seus rendimentos de 2025</span>
              <ChartContainer
                config={chartConfig}
                className=" w-full uppercase mt-6"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={12}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
