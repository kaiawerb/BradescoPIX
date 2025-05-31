import React from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const WarningDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-[#E7C9A5] text-[#14171C] hover:bg-[#EAB87C] inline-flex min-h-14 w-full items-center justify-center rounded-md px-6 py-2 font-bold text-base"
          type="submit"
        >
          {"Consultar"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#ffffff] border-0">
        <DialogHeader>
          <DialogTitle className="text-[#A92C2C] text-2xl">
            Atenção!
          </DialogTitle>
          <DialogDescription className="text-[#A92C2C] text-base">
            Destinatário não possui histórico de vendas confiáveis! É
            recomendado não realizar nenhuma transferencia para este PIX! Deseja
            continuar?
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Input id="link" defaultValue="000.000.000-00" readOnly />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" className="bg-slate-500">
              Voltar
            </Button>
          </DialogClose>
          <Button className="cursor-pointer">Sim, continuar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default WarningDialog
