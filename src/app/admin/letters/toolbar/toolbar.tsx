'use client'
import * as React from "react"
import { useContext, useRef, useState } from "react";
import { LetterContext } from "../context";
import { ReadFile } from "../helper";
import { UploadNewBase } from "./actions";
import { toast } from "sonner";

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { Template as MSCTemplate } from "@/server/interfaces/template";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function Toolbar() {
    const { selectedTemplateId, changeTemplate, addTemplateOptions, closeTemplate, addJsonOptions, avaialbleTemplates, addBaseOptions, avaialbleBase, avaialbleJson, deleteTemplate, changeBase, downloadJsonFile, saveTemplate, generatePreviewPDF } = useContext(LetterContext);
    const hiddenFileBaseInput = useRef(null);
    const hiddenFileTemplateInput = useRef(null);
    const [open, setOpen] = useState(false);

    const uploadNewBasePDF = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target && e.target.files) {
            toast('Uploading Base PDF');
            ReadFile(e.target.files[0], "dataURL").then(async (basePdf) => {
                const result = await UploadNewBase(e.target.files![0].name, 'base', basePdf.toString());
                if (result?.ok) {
                    const data = await result.json();
                    addBaseOptions({ id: data.id, name: data.name });
                    toast('New Base PDF option added');
                } else {
                    toast.error('Error uploading Base PDF: ' + result?.statusText);
                }
            });
        }
    };

    const uploadNewTemplateJson = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target && e.target.files) {
            toast('Uploading JSON');
            ReadFile(e.target.files[0], "text").then(async (jsonStr) => {
                const result = await UploadNewBase(e.target.files![0].name, 'json', jsonStr);
                if (result?.ok) {
                    const data = await result.json();
                    addJsonOptions({ id: data.id, name: data.name });
                    toast('New JSON option added');
                } else {
                    toast.error('Error uploading JSON: ' + result?.statusText);
                }
            });
        }
    };

    const FormAction = async (formData: FormData) => {
        try {
            toast('Creating template');
            const result = await fetch('/api/template', {
                method: 'POST',
                body: formData,
            });
            const record = await result.json();
            addTemplateOptions(record);
            setOpen(false);
            toast('Template created');
        } catch (error) {
            toast.error('Error creating template: ' + error);
        }
    }

    const selectNewTemplateJson = () => {
        if (hiddenFileTemplateInput) {
            hiddenFileTemplateInput.current!.click();
        }
    };

    const selectNewBasePDF = () => {
        if (hiddenFileBaseInput) {
            hiddenFileBaseInput.current!.click();
        }
    };

    return (
        <>
            <input type="file" ref={hiddenFileBaseInput} accept="application/pdf" hidden onChange={uploadNewBasePDF} />
            <input type="file" ref={hiddenFileTemplateInput} accept="application/json" hidden onChange={uploadNewTemplateJson} />
            <Dialog open={open} onOpenChange={setOpen}>
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>File</MenubarTrigger>
                        <MenubarContent>
                            <DialogTrigger asChild>
                                <MenubarItem>New Template</MenubarItem>
                            </DialogTrigger>
                            <MenubarSub>
                                <MenubarSubTrigger>Open</MenubarSubTrigger>
                                <MenubarSubContent>
                                    {avaialbleTemplates.map((template: MSCTemplate) => (
                                        <MenubarItem key={template.id} onClick={() => changeTemplate(template.id + '')}>{template.name}</MenubarItem>
                                    ))}
                                </MenubarSubContent>
                            </MenubarSub>
                            <MenubarSeparator />
                            <MenubarItem disabled={!selectedTemplateId} onClick={deleteTemplate}>Delete Template</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem onClick={generatePreviewPDF} disabled={!selectedTemplateId} >
                                Generate PDF
                            </MenubarItem>
                            <MenubarItem onClick={saveTemplate} disabled={!selectedTemplateId} >
                                Save
                            </MenubarItem>
                            <MenubarItem onClick={closeTemplate} disabled={!selectedTemplateId} >
                                Close
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Templates</MenubarTrigger>
                        <MenubarContent>
                            <MenubarSub>
                                <MenubarSubTrigger >Base PDF</MenubarSubTrigger>
                                <MenubarSubContent>
                                    {avaialbleBase.map((item) => (
                                        <MenubarItem key={item.id + ''} disabled={!selectedTemplateId} onClick={() => changeBase(item.id + '','base')}>{item.name}</MenubarItem>
                                    ))}
                                    <MenubarSeparator />
                                    <MenubarItem onClick={selectNewBasePDF}>Add New Base PDF</MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>
                            <MenubarSub>
                                <MenubarSubTrigger>Content Templates</MenubarSubTrigger>
                                <MenubarSubContent>
                                    {avaialbleJson.map((item) => (
                                        <MenubarItem key={item.id + ''} disabled={!selectedTemplateId} onClick={() => changeBase(item.id + '','json')}>{item.name}</MenubarItem>
                                    ))}
                                    <MenubarSeparator />
                                    <MenubarItem onClick={selectNewTemplateJson}>Upload Template</MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>
                            <MenubarItem disabled={!selectedTemplateId} onClick={downloadJsonFile}>
                                Download Template
                            </MenubarItem>


                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>


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


        </>
    )
}