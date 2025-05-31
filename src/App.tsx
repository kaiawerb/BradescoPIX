/* eslint-disable @typescript-eslint/no-unused-vars */
import "./index.css"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form"
import { Input } from "./components/ui/input"
import { useForm } from "react-hook-form"
import { Landmark } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog"
import { Label } from "./components/ui/label"

function App() {
  // Estado dos modais
  const [openInfoModal, setOpenInfoModal] = useState(false)
  const [openPixModal, setOpenPixModal] = useState(false)
  const [recipientData, setRecipientData] = useState<null | {
    name: string
    cpf: string
    reputationScore: number
    complaints: number
    hasHistory: boolean
  }>(null)

  // Form para consulta da chave Pix
  const pixForm = useForm<{ pix: string }>()

  // Form para inserir valor Pix
  const pixValueForm = useForm<{ value: string }>()

  // Dummy para simular resposta da consulta
  const dummyRecipients = [
    {
      key: "111.111.111-11",
      name: "Sophia Oliveira",
      cpf: "111.111.111-11",
      reputationScore: 85,
      complaints: 0,
      hasHistory: true,
    },
    {
      key: "222.222.222-22",
      name: "Willian Santos",
      cpf: "222.222.222-22",
      reputationScore: 60,
      complaints: 1,
      hasHistory: true,
    },
    {
      key: "333.333.333-33",
      name: "Kaiã Werb",
      cpf: "333.333.333-33",
      reputationScore: 45,
      complaints: 5,
      hasHistory: false,
    },
    {
      key: "444.444.444-44",
      name: "Eric Kenji",
      cpf: "444.444.444-44",
      reputationScore: 30,
      complaints: 8,
      hasHistory: false,
    },
  ]

  // Ao enviar consulta da chave Pix
  function onSubmit(data: { pix: string }) {
    // Simula busca do destinatário pela chave Pix digitada
    const found = dummyRecipients.find((r) => r.key === data.pix.trim())

    if (found) {
      setRecipientData(found)
    } else {
      setRecipientData({
        name: "Destinatário não encontrado",
        cpf: data.pix.trim(),
        reputationScore: 0,
        complaints: 0,
        hasHistory: false,
      })
    }

    setOpenInfoModal(true)
  }

  // Ao confirmar "Sim, quero continuar" no modal de info
  function handleContinue() {
    setOpenInfoModal(false)
    pixValueForm.reset()
    setOpenPixModal(true)
  }

  // Ao confirmar valor Pix
  function onConfirmPix(data: { value: string }) {
    alert(
      `Pix de R$ ${data.value} enviado para ${recipientData?.name} (Simulado)`
    )

    setOpenPixModal(false)
    setRecipientData(null)
    pixForm.reset()
  }

  return (
    <main className="bg-neutral-200 flex items-center justify-center h-screen">
      <div className="flex flex-col gap-4 bg-[#12151F] px-10 py-14 text-white w-1/4 rounded-xl">
        <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
          {<Landmark size={32} />} Consulta destinatário
        </h1>

        <p className="text-light-100">
          Iremos realizar uma busca em nossa base em histórico (número de
          reclamações ou denúncias)
        </p>

        {/* Formulário consulta */}
        <Form {...pixForm}>
          <form
            className="space-y-6 w-full"
            onSubmit={pixForm.handleSubmit(onSubmit)}
          >
            <FormField
              key="pix"
              name="pix"
              control={pixForm.control}
              rules={{ required: "Chave PIX é obrigatória" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chave PIX</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full min-h-12 border-none text-base font-bold placeholder:font-normal text-white placeholder:text-light-100 focus-visible:ring-0 focus-visible:shadow-none bg-[#232839]"
                      type="text"
                      placeholder="000.000.000-00"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!pixForm.formState.isValid}>
              Consultar
            </Button>
          </form>
        </Form>
      </div>

      {/* Modal Informações destinatário */}
      <Dialog open={openInfoModal} onOpenChange={setOpenInfoModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verificação do Destinatário</DialogTitle>
            <DialogDescription>
              {recipientData && (
                <>
                  <p>Nome: {recipientData.name}</p>
                  <p>CPF/CNPJ: {recipientData.cpf}</p>
                  <p>Reputação: {recipientData.reputationScore}</p>
                  <p>Denúncias: {recipientData.complaints}</p>
                  {!recipientData.hasHistory && (
                    <p className="mt-2 text-red-600 font-semibold">
                      Alerta: Destinatário sem histórico confiável. Deseja
                      continuar?
                    </p>
                  )}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setOpenInfoModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleContinue}>Sim, quero continuar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal inserir valor Pix */}
      <Dialog open={openPixModal} onOpenChange={setOpenPixModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insira o valor do Pix</DialogTitle>
          </DialogHeader>

          <Form {...pixValueForm}>
            <form
              onSubmit={pixValueForm.handleSubmit(onConfirmPix)}
              className="space-y-4"
            >
              <FormField
                key="value"
                name="value"
                control={pixValueForm.control}
                rules={{
                  required: "Informe o valor do Pix",
                  validate: (value) =>
                    parseFloat(value) > 0 || "Valor deve ser maior que zero",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor em R$</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        min="0.01"
                        placeholder="Ex: 100.00"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setOpenPixModal(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={!pixValueForm.formState.isValid}
                >
                  Confirmar Pix
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </main>
  )
}

export default App
