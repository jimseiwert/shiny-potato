'use client'
import * as React from "react"
import { useContext, useRef } from "react";
import { LetterContext } from "../context";
import { ReadFile } from "../helper";
import { UploadNewBase } from "./actions";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  import { Template as MSCTemplate } from "@/server/db/interfaces/template";

export default function Toolbar() {
    const { selectedTemplateId, changeTemplate, templates , deleteTemplate, changeBase, downloadJsonFile, saveTemplate, uploadJson, addPage, deletePage,generatePreviewPDF,  baseOptions } = useContext(LetterContext);
    const hiddenFileBaseInput = useRef(null);
    const hiddenFileTemplateInput = useRef(null);

    const uploadNewBasePDF = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target && e.target.files) {
            ReadFile(e.target.files[0], "dataURL").then(async (basePdf) => {
                const result = await UploadNewBase(e.target.files![0].name, basePdf.toString());
                if (result?.ok) {
                    const data = await result.json();
                    baseOptions.push({id: data.id, name: e.target.files![0].name});
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
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
            <MenubarSub>
                <MenubarSubTrigger>Open</MenubarSubTrigger>
                <MenubarSubContent>
                {templates.map((template: MSCTemplate) => (
                                <MenubarItem key={template.id} onClick={() => changeTemplate(template.id + '')}>{template.name}</MenubarItem>
                            ))}
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem disabled={!selectedTemplateId}  onClick={deleteTemplate}>Delete Template</MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={generatePreviewPDF} disabled={!selectedTemplateId} >
                Generate PDF... <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
              <MenubarItem onClick={saveTemplate} disabled={!selectedTemplateId} >
                Save... <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={addPage} disabled={!selectedTemplateId}>
                Add New Page 
              </MenubarItem>
              <MenubarItem onClick={deletePage} disabled={!selectedTemplateId}>
                Delete Empty Pages 
              </MenubarItem>
              
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Templates</MenubarTrigger>
            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger >Base PDF</MenubarSubTrigger>
                <MenubarSubContent>
                {baseOptions.map((item) => (
                    <MenubarItem key={item.id + ''} disabled={!selectedTemplateId} onClick={() => changeBase(item.id + '')}>{item.name}</MenubarItem>
                    ))}
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSub>
                <MenubarSubTrigger>Content Templates</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Search the web</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Find...</MenubarItem>
                  <MenubarItem>Find Next</MenubarItem>
                  <MenubarItem>Find Previous</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarItem disabled={!selectedTemplateId} onClick={downloadJsonFile}>
                Download Template
              </MenubarItem>
              <MenubarItem disabled={!selectedTemplateId} onClick={selectNewTemplateJson}>
                Upload Template
              </MenubarItem>
              <MenubarItem onClick={selectNewBasePDF}>
                Add New Base PDF
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        </>
      )
}