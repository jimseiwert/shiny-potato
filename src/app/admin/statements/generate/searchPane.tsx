"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { useContext } from "react"
import { GenerateStatementContext } from "./context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"



const formSchema = z.object({
    memberType: z
        .string({
            required_error: "Please select an member type.",
        })
        .min(1).max(1),
    memberStatus: z
        .string({
            required_error: "Please select an member status.",
        })
        .min(1).max(1),
    letter: z
        .string({
            required_error: "Please select an letter template.",
        })
        .min(1),
    year: z
        .string({
            required_error: "Select 4 digit year",
        })
        .min(4).max(4),
})

export function SearchPane() {
    const { search, memberTypes, memberStatus, letterTemplates } = useContext(GenerateStatementContext);

    const today = new Date();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            year: today.getFullYear() + 1 + '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        search(values)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="memberType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Member Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select member type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {memberTypes.map((memberType) => (
                                        <SelectItem key={memberType.id} value={memberType.id + ''}>
                                            {memberType.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="memberStatus"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Member Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select member status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {memberStatus.map((status) => (
                                        <SelectItem key={status.id} value={status.id + ''}>
                                            {status.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Year</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select statement year" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem key={today.getFullYear()} value={today.getFullYear() + ''}>{today.getFullYear()}</SelectItem>
                                    <SelectItem key={today.getFullYear() + 1} value={today.getFullYear() + 1 + ''}>{today.getFullYear() + 1}</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Statement Year
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
               <FormField
                    control={form.control}
                    name="letter"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Letter Template</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select letter template" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {letterTemplates.map((letter) => (
                                        <SelectItem key={letter.id} value={letter.id + ''}>
                                            {letter.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">Load Members</Button>

                <Button type="submit" className="w-full">Dry Run</Button>

                <Button type="submit" className="w-full">Generate</Button>
            </form>
        </Form>
    )
}
