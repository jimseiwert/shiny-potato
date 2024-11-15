import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import NewTemplate from "../new";
import { useContext } from "react";
import { LetterContext } from "../context";
import { Template as MSCTemplate } from "@/server/db/interfaces/template";

export default function ChangeTemplate() {
    const { selectedTemplateId, changeTemplate, templates } = useContext(LetterContext);
    
    return (
        <div className="flex">
                <NewTemplate />
                <Select value={selectedTemplateId} onValueChange={(val) => changeTemplate(val)}>
                    <SelectTrigger className="w-[225px]">
                        <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Available Templates</SelectLabel>
                            {templates.map((template: MSCTemplate) => (
                                <SelectItem key={template.id} value={template.id + ''}>{template.name}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
    )
}