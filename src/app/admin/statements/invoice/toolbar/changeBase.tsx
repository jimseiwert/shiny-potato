'use client';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React, { useContext } from "react";
import { LetterContext } from "../context";

export function ChangeBase() {
       
    const { selectedTemplateId, changeBase, baseOptions } = useContext(LetterContext);

 
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button disabled={!selectedTemplateId} variant="outline">Change Base PDF</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    {baseOptions.map((item) => (
                        <DropdownMenuItem key={item.id + ''} onClick={() => changeBase(item.id + '')}>
                            <span>{item.name}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
