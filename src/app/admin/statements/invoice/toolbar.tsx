import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Template } from "@/server/db/interfaces/templates";
import NewTemplate from "./new";

export default async function Toolbar({templates}: {templates: Template[]}) {
    
    return (
        <div className="flex justify-between items-center">
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        {templates.map((template: Template) => (
                            <SelectItem key={template.id} value={template.id + ''}>{template.name}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <NewTemplate/>
            <div className="flex items-center  gap-4">
                <Button>Load Template</Button>
                <Button>Change BasePDF</Button>
                <Button>Preview</Button>
                <Button>Save</Button>
            </div>
        </div>
    );
}