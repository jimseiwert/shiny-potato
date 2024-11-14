'use client'
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
import { FormEvent } from "react"

export default function NewTemplate() {
    const FormAction = async (formData) =>{
        try {
          let response = await fetch('/api/template', {
            method: 'POST',
            body: formData,
          });
          response = await response.json()
          alert(`${response.name} ${response.age} ${response.city}`)
        } catch (error) {
          // Handle error
          console.error('Error submitting form:', error);
        }
    }
    // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault(); 

    //     const formData = new FormData(event.currentTarget); 
    // console.log(formData)
    //     try {
    //       let response = await fetch('/api/template', {
    //         method: 'POST',
    //         body: formData,
    //       });
    //       response = await response.json()
    //       alert(`${response.name} ${response.age} ${response.city}`)
    //     } catch (error) {
    //       // Handle error
    //       console.error('Error submitting form:', error);
    //     }
    //   };
    return (
<form action={FormAction}>
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
                <button type="submit">Create Template</button>  
              </div>
            </div>
            </form>


      )
}