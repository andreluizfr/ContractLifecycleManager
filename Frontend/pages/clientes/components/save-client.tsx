import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Client } from "@/domain/models/Client"
import { UserRoundPlus } from "lucide-react";
//import { ElementType } from "react"

interface Props {
  client?: Client
  //TriggerComponent: ElementType<any, keyof JSX.IntrinsicElements>
}

export function SaveClient({client}: Readonly<Props>) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        {client ?
          <span
            className="w-full cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            Editar
          </span>
          :
          <Button variant="outline" className="mt-2 font-normal">
            <UserRoundPlus className="mr-2 w-5" strokeWidth={1.4}/>
            Novo Cliente
          </Button>
        }
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onClick={(e) => e.stopPropagation()}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Novo Cliente</DialogTitle>
          <DialogDescription>
            Você pode cadastrar um novo cliente. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              defaultValue={client?.name}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right">
              Whatsapp
            </Label>
            <Input
              id="phoneNumber"
              defaultValue={client?.phoneNumber}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cpf" className="text-right">
              CPF
            </Label>
            <Input
              id="cpf"
              defaultValue={client?.cpf}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rg" className="text-right">
              RG
            </Label>
            <Input
              id="rg"
              defaultValue={client?.rg}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pixKey" className="text-right">
              Chave Pix
            </Label>
            <Input
              id="pixKey"
              className="col-span-3"
              defaultValue={client?.pixKey ?? ''}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bankName" className="text-right">
              Banco
            </Label>
            <Input
              id="bankName"
              className="col-span-3"
              defaultValue={client?.bankAccount?.financialInstitution.description}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bankAgence" className="text-right">
              Agência
            </Label>
            <Input
              id="bankAgence"
              className="col-span-3"
              defaultValue={client?.bankAccount?.agence}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bankAccount" className="text-right">
              Conta
            </Label>
            <Input
              id="bankAccount"
              className="col-span-3"
              defaultValue={client?.bankAccount?.account}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="observations" className="text-right">
              Observações
            </Label>
            <Textarea
              id="observations"
              className="col-span-3"
              placeholder="Digite suas observações aqui."
              defaultValue={client?.observations}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}