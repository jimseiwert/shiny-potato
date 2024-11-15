'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useContext, useState } from "react"
import { LetterContext } from "./context"

export default function NewTemplate() {
    const [open, setOpen] = useState(false);
    const { changeTemplate, templates } = useContext(LetterContext);
    const FormAction = async (formData: FormData) =>{
        try {
          const result = await fetch('/api/template', {
            method: 'POST',
            body: formData,
          });
          const record = await result.json();
          console.log(record);
          templates.push(record);
          changeTemplate(record.id + '');

          setOpen(false);
        } catch (error) {
          // Handle error
          console.error('Error submitting form:', error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline"><Plus/></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <form action={FormAction}>
          <DialogHeader>
            <DialogTitle>Create Template</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                className="col-span-3"
              />
            </div>
           
          </div>
          <DialogFooter>
            <Button type="submit">Create Template</Button>
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      )
}