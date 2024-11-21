'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import PaymentButton from '@/components/PaymentForm/PaymentButton';
import { use, useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRouter } from 'next/navigation';
import { PaymentTypes } from '@/server/interfaces/payments/paymentTypes';

const FormSchema = z.object({
    statementId: z.number(),
    method: z.enum(["credit", "check", "cash"]),
    dues: z.literal(true),
    dinners: z.boolean().default(false),
    bulletin: z.boolean().default(false),
    guestFishingBook: z.boolean().default(false),
    extraKeyCard: z.boolean().default(false),
    extraWindowsSticker: z.boolean().default(false),
    sendFamilyBadge: z.boolean().default(false),
    archeryContribution: z.number().min(0).nonnegative().default(0),
    campingContribution: z.number().min(0).nonnegative().default(0),
    fishingContribution: z.number().min(0).nonnegative().default(0),
    pistolContribution: z.number().min(0).nonnegative().default(0),
    womansContribution: z.number().min(0).nonnegative().default(0),
    delivery: z.enum(["mail", "trap"], {
        required_error: "You need to select a delivery method.",
    }),
})

export default function StatementCheckout({params}: { params: Promise<{ id: number }> }) {
    const {id} = use(params);
    
    const [total, setTotal] = useState(0)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            statementId: Number(id),
            method: "credit",
            dues: true,
            dinners: false,
            delivery: "mail",
            bulletin: false,
            extraKeyCard: false,
            extraWindowsSticker: false,
            guestFishingBook: false,
            sendFamilyBadge: false,
            archeryContribution: 0,
            campingContribution: 0,
            fishingContribution: 0,
            pistolContribution: 0,
            womansContribution: 0,
        },
    })

    const router = useRouter()

    const {
        handleSubmit,
        control,
        trigger,
        setError,
        register,
        formState: { errors },
    } = useForm();

    const onSuccess = async () => {
        router.push('/member')
    }

    useEffect(() => {
        const val = form.watch()
        let total = val.dues ? 450 : 0
        total += val.dinners ? 300 : 0
        total += val.bulletin ? 45 : 0
        total += val.guestFishingBook ? 100 : 0
        total += val.extraKeyCard ? 10 : 0
        total += val.extraWindowsSticker ? 10 : 0
        total += Number(val.archeryContribution < 0 ? 0 : val.archeryContribution)
        total += Number(val.campingContribution < 0 ? 0 : val.campingContribution)
        total += Number(val.fishingContribution < 0 ? 0 : val.fishingContribution)
        total += Number(val.pistolContribution < 0 ? 0 : val.pistolContribution)
        total += Number(val.womansContribution < 0 ? 0 : val.womansContribution)
        setTotal(total)
    }, [form.watch()])


    return (
        
        <Form {...form}>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>
                <div className="space-y-12 sm:space-y-16">
                    <div className='px-10 py-10'>
                        <div className='flex justify-between'>
                            <div>
                                <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Annual Dues</h1>
                                <p className="mt-1 text-2-xl text-gray-600  dark:text-white">
                                    The annual dues for <strong>$450</strong> is already added. Please review optional items below, and click pay when ready.
                                </p>
                            </div>
                            <div className='flex gap-x-4'>
                                <h2 className="font-semibold text-2xl text-gray-900  dark:text-white">${total}</h2>
                            </div>
                        </div>


                        <div className="mt-10 space-y-10 border-b border-gray-900/10  dark:border-gray-100 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:dark:divide-gray-100  sm:border-t sm:pb-0">
                            <fieldset>
                                <legend className="sr-only">Required Items</legend>
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-6">
                                    <div aria-hidden="true" className="text-sm/6 font-semibold  dark:text-white text-gray-900">
                                        Required Items
                                    </div>
                                    <div className="mt-4 sm:col-span-2 sm:mt-0">

                                        <div className="max-w-lg space-y-6">

                                            <FormField
                                                control={form.control}
                                                name="dues"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div className="relative flex gap-x-3">
                                                                <div className="flex h-6 items-center">
                                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                                </div>
                                                                <div className="text-sm/6">
                                                                    <FormLabel> 2025 Dues</FormLabel>
                                                                </div>

                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend className="sr-only">Optional Items</legend>
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-6">
                                    <div aria-hidden="true" className="text-sm/6 font-semibold  dark:text-white text-gray-900">
                                        Optional Items
                                    </div>
                                    <div className="mt-4 sm:col-span-2 sm:mt-0">

                                        <div className="max-w-lg space-y-6">
                                            <FormField
                                                control={form.control}
                                                name="dinners"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div className="relative flex gap-x-3">
                                                                <div className="flex h-6 items-center">
                                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                                </div>
                                                                <div className="text-sm/6">
                                                                    <FormLabel>2025 Dinners (12) $300 - No Transfer or Refunds</FormLabel>
                                                                </div>

                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="bulletin"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div className="relative flex gap-x-3">
                                                                <div className="flex h-6 items-center">
                                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                                </div>
                                                                <div className="text-sm/6">
                                                                    <FormLabel>Paper Bulletin $45</FormLabel>
                                                                </div>

                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />


                                            <FormField
                                                control={form.control}
                                                name="guestFishingBook"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div className="relative flex gap-x-3">
                                                                <div className="flex h-6 items-center">
                                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                                </div>
                                                                <div className="text-sm/6">
                                                                    <FormLabel>Guest Fishing Book $100</FormLabel>
                                                                </div>

                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />


                                            <FormField
                                                control={form.control}
                                                name="extraKeyCard"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div className="relative flex gap-x-3">
                                                                <div className="flex h-6 items-center">
                                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                                </div>
                                                                <div className="text-sm/6">
                                                                    <FormLabel>Extra Key Card $10</FormLabel>
                                                                </div>

                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />


                                            <FormField
                                                control={form.control}
                                                name="extraWindowsSticker"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div className="relative flex gap-x-3">
                                                                <div className="flex h-6 items-center">
                                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                                </div>
                                                                <div className="text-sm/6">
                                                                    <FormLabel>Extra Window Sticker $10</FormLabel>
                                                                </div>

                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />


                                        </div>
                                    </div>
                                </div>
                            </fieldset>


                            <fieldset>
                                <legend className="sr-only">Contribution Options</legend>
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-6">
                                    <div aria-hidden="true" className="text-sm/6 font-semibold  dark:text-white text-gray-900">
                                        Contribution Options
                                    </div>
                                    <div className="mt-4 sm:col-span-2 sm:mt-0">
                                        <FormField
                                            control={form.control}
                                            name="archeryContribution"
                                            render={({ field }) => (
                                                <div className="relative flex gap-x-3 py-4">
                                                    <div className="flex h-6 items-center">
                                                        <Input type='number' {...field} onChange={event => field.onChange(+event.target.value)} placeholder="50" />
                                                    </div>
                                                    <div className="text-sm/6">
                                                        <label htmlFor="comments" className="font-medium  dark:text-white text-gray-900">
                                                            Voluntary Archery Contribution
                                                        </label>

                                                    </div>
                                                </div>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="campingContribution"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="relative flex gap-x-3 py-4">
                                                            <div className="flex h-6 items-center">
                                                                <Input type='number' {...field} onChange={event => field.onChange(+event.target.value)} placeholder="50" />
                                                            </div>
                                                            <div className="text-sm/6">
                                                                <FormLabel>Voluntary Camping Contribution</FormLabel>
                                                            </div>

                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>

                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="fishingContribution"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="relative flex gap-x-3 py-4">
                                                            <div className="flex h-6 items-center">
                                                                <Input type='number' {...field} onChange={event => field.onChange(+event.target.value)} placeholder="50" />
                                                            </div>
                                                            <div className="text-sm/6">
                                                                <FormLabel>Voluntary Fishing Contribution</FormLabel>
                                                            </div>

                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="pistolContribution"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="relative flex gap-x-3 py-4">
                                                            <div className="flex h-6 items-center">
                                                                <Input type='number' {...field} onChange={event => field.onChange(+event.target.value)} placeholder="50" />
                                                            </div>
                                                            <div className="text-sm/6">
                                                                <FormLabel>Voluntary Pistol Contribution</FormLabel>
                                                            </div>

                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="womansContribution"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="relative flex gap-x-3 py-4">
                                                            <div className="flex h-6 items-center">
                                                                <Input type='number' {...field} onChange={event => field.onChange(+event.target.value)} placeholder="50" />
                                                            </div>
                                                            <div className="text-sm/6">
                                                                <FormLabel>Voluntary Woman's Committee Contribution</FormLabel>
                                                            </div>

                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>

                                            )}
                                        />
                                        <div className="max-w-lg space-y-6">
                                        </div>
                                    </div>
                                </div>
                            </fieldset>


                            <fieldset>
                                <legend className="sr-only">Delivery Options</legend>
                                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-6">
                                    <div aria-hidden="true" className="text-sm/6 font-semibold  dark:text-white text-gray-900">
                                        Delivery Options
                                    </div>
                                    <div className="mt-4 sm:col-span-2 sm:mt-0">

                                        <div className="max-w-lg space-y-6">
                                            <FormField
                                                control={form.control}
                                                name="delivery"
                                                render={({ field }) => (
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="flex flex-col space-y-1"
                                                    >
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="mail" className="size-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal text-gray-900  dark:text-white">
                                                                Please mail them to me
                                                            </FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="trap" className="size-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal text-gray-900  dark:text-white">
                                                                I will pick them up at trap
                                                            </FormLabel>
                                                        </FormItem>
                                                    </RadioGroup>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="sendFamilyBadge"
                                                render={({ field }) => (
                                                    <div className="relative flex gap-x-3">
                                                        <div className="flex h-6 items-center">
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </div>
                                                        <div className="text-sm/6">
                                                            <label htmlFor="comments" className="font-medium  dark:text-white text-gray-900">
                                                                Include Family Badge
                                                            </label>

                                                        </div>
                                                    </div>
                                                )}
                                            />

                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                        <PaymentButton type={PaymentTypes.STATEMENT} trigger={form.trigger} data={form.getValues()} onSubmit={onSuccess}>
                            Pay Now
                        </PaymentButton>
                    </div>
                </div>
            </form>
        </Form>
    )
}
