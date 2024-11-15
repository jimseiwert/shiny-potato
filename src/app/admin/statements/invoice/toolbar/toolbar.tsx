'use client'
import * as React from "react"
import { Button } from "@/components/ui/button"
import { useContext, useRef } from "react";
import { Download, Save, Trash, Upload } from "lucide-react";
import { ChangeBase } from "./changeBase";
import ChangeTemplate from "./changeTemplate";
import { LetterContext } from "../context";
import { ReadFile } from "../helper";
import { UploadNewBase } from "./actions";


export default function Toolbar() {
    const { selectedTemplateId, deleteTemplate, downloadJsonFile, saveTemplate, uploadJson, baseOptions } = useContext(LetterContext);
    const hiddenFileBaseInput = useRef(null);
    const hiddenFileTemplateInput = useRef(null);

    const uploadNewBasePDF = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target && e.target.files) {
            ReadFile(e.target.files[0], "dataURL").then(async (basePdf) => {
                const result = await UploadNewBase(e.target.files[0].name, basePdf.toString());
                if (result?.ok) {
                    const data = await result.json();
                    baseOptions.push({id: data.id, name: e.target.files[0].name});
                }
            });
        }
    };

    const uploadNewTemplateJson = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target && e.target.files) {
            ReadFile(e.target.files[0], "text").then(async (jsonStr) => {
                uploadJson(jsonStr as string);
            });
        }
    };

    const selectNewTemplateJson = () => {
        if (hiddenFileTemplateInput) {
            hiddenFileTemplateInput.current.click();
        }
    };

    const selectNewBasePDF = () => {
        if (hiddenFileBaseInput) {
            hiddenFileBaseInput.current.click();
        }
    };

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <ChangeTemplate/>
                <ChangeBase/>
           </div>
            <input type="file" ref={hiddenFileBaseInput} accept="application/pdf" hidden onChange={uploadNewBasePDF} />
            <input type="file" ref={hiddenFileTemplateInput} accept="application/json" hidden onChange={uploadNewTemplateJson} />
            <div className="flex items-center  gap-2 py-2">
                <Button size={"sm"} disabled={!selectedTemplateId} variant={"destructive"} onClick={deleteTemplate}><Trash />Delete Template</Button>
                <Button size={"sm"} disabled={!selectedTemplateId} variant={"secondary"} onClick={selectNewTemplateJson}><Upload />Upload Template</Button>
                <Button size={"sm"} disabled={!selectedTemplateId} variant={"secondary"} onClick={selectNewBasePDF}><Upload />Add New Base PDF</Button>
                <Button size={"sm"} disabled={!selectedTemplateId} variant={"secondary"} onClick={downloadJsonFile}><Download />Download Template</Button>
                {/* <Button size={"sm"} disabled={!selectedTemplate} variant={"secondary"} onClick={() => { generatePDF(designer.current) }}>Generate PDF</Button> */}
                <Button size={"sm"} disabled={!selectedTemplateId} variant={"default"} onClick={saveTemplate}><Save />Save</Button>
            </div>
        </div>
    );
}