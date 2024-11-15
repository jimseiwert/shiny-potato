'use client';
import { Designer } from "@pdfme/ui";
import { createContext, useEffect, useRef, useState } from "react";
import { DownloadJsonFile, generatePDF, getFontsData, getPlugins, uint8ArrayToBase64 } from "./helper";
import { BLANK_PDF, checkTemplate, cloneDeep, Template } from "@pdfme/common";
import { Template as MSCTemplate } from "@/server/db/interfaces/template";
import { DeleteTemplate, DownloadBase, DownloadTemplate, SaveTemplate } from "./toolbar/actions";
import { useRouter } from "next/navigation";
import { generate } from "@pdfme/generator";

interface Props {
  children: React.ReactNode;
  templates: MSCTemplate[];
  baseOptions: MSCTemplate[];
}

interface LetterContext {
  selectedTemplateId: string | null;
  templates: MSCTemplate[];
  baseOptions: MSCTemplate[];
  changeTemplate: (templateId: string) => void;
  deleteTemplate: () => void;
  downloadJsonFile: () => void;
  saveTemplate: () => void;
  addPage: () => void;
  deletePage: () => void;
  generatePreviewPDF: () => void;
  changeBase: (templateId: string) => void;
  uploadJson: (json: string) => void;
}

export const LetterContext = createContext<LetterContext>({
  selectedTemplateId: null,
  templates: [],
  baseOptions: [],
  changeTemplate: () => { },
  deleteTemplate: () => { },
  downloadJsonFile: () => { },
  saveTemplate: () => { },
  changeBase: () => { },
  uploadJson: () => { },
  addPage: () => { },
  deletePage: () => { },
  generatePreviewPDF: () => { },
});

const headerHeight = 80;

export const LetterProvider = ({ templates, baseOptions, children }: Props) => {
  const router = useRouter();

  if (!baseOptions.find((base) => base.id === 0)) {
    baseOptions.unshift({ id: 0, name: 'Blank - Single Page' });
  }

  const designerRef = useRef<HTMLDivElement | null>(null);
  const designer = useRef<Designer | null>(null);

  const [template, setTemplate] = useState<Template | null>(null);
  const [selectedTemplateId, setSelectedTemplate] = useState<string>("");

  const downloadJsonFile = async (): Promise<void> => {
    if (designer.current) {
      const template = designer.current.getTemplate();
      const selectedTemplate = templates.find((template) => template.id === Number(selectedTemplateId));

      await DownloadJsonFile(template, `${selectedTemplate?.name}.json`);
    }
  }

  const addPage = async (): Promise<void> => {
    if (designer.current) {
      const template = designer.current.getTemplate();
      generateTemplate(template.schemas.length + 1)
    }
  }
const deletePage = async (): Promise<void> => {
  if (designer.current) {
    const template = designer.current.getTemplate();
    generateTemplate(template.schemas.length)
  }
}

const generatePreviewPDF = async (): Promise<void> => {
    generatePDF(designer.current)
}
const generateTemplate = (pages: number) =>{
  if (designer.current) {
    const template: Template = {
      basePdf: BLANK_PDF,
      schemas: [[]]
    }
    const inputs = [];
    for (let i = 0; i < pages; i++) {
      inputs.push({})
    }
    generate({ template, inputs }).then((pdf) => {
      const basePdf = uint8ArrayToBase64(pdf);
      designer.current!.updateTemplate(
        Object.assign(cloneDeep(designer.current!.getTemplate()), {
          basePdf,
        })
      );
    });
  }
}
  const changeTemplate = async (templateId: string): Promise<void> => {
    const template = await DownloadTemplate(Number(templateId));
    setSelectedTemplate(templateId);
    setTemplate(template)
  }

  const saveTemplate = async (): Promise<void> => {
    if (designer.current) {
      const template = designer.current.getTemplate();
      await SaveTemplate(Number(selectedTemplateId), JSON.stringify(template));
    }
  }

  const changeBase = async (templateId: string): Promise<void> => {
    const setBase = (basePdf: string) => {
      if (designer.current) {
        designer.current.updateTemplate(
          Object.assign(cloneDeep(designer.current.getTemplate()), {
            basePdf,
          })
        );
      }
    }
    if (templateId === '0') {
      setBase(BLANK_PDF);
    } else {
      const template = await DownloadBase(Number(templateId));
      setBase(template.base);
    }
  }

  const uploadJson = async (jsonStr: string): Promise<void> => {
    const template: Template = JSON.parse(jsonStr as string);
    checkTemplate(template);
    setTemplate(template)
  }

  const deleteTemplate = async (): Promise<void> => {
    await DeleteTemplate(Number(selectedTemplateId));
    router.refresh();
  }

  useEffect(() => {
    const buildDesigner = () => {
      getFontsData().then((font) => {
        if (designerRef.current && template)

          designer.current = new Designer({
            domContainer: designerRef.current,
            template,
            options: {
              font,
              labels: {
                'clear': '🗑️',
              },
              theme: {
                token: {
                  colorPrimary: '#25c2a0',
                },
              },
              icons: {
                multiVariableText: '<svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.643,13.072,17.414,2.3a1.027,1.027,0,0,1,1.452,0L20.7,4.134a1.027,1.027,0,0,1,0,1.452L9.928,16.357,5,18ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"/></svg>'
              },
            },
            plugins: getPlugins(),
          });
      }
      );
    }

    buildDesigner();
  }, [template])

  return (
    <LetterContext.Provider value={{ selectedTemplateId, changeTemplate, templates, baseOptions, generatePreviewPDF, addPage, deletePage, uploadJson, saveTemplate, deleteTemplate, changeBase, downloadJsonFile }}>
      {children}
      {!template &&
        <div className="px-10 py-10">
          <button
            type="button"
            className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
              aria-hidden="true"
              className="mx-auto size-12 text-gray-400"
            >
              <path
                d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="mt-2 block text-sm font-semibold ">Select or Create Template</span>
          </button>
        </div>
      }
      {template &&

        <div ref={designerRef} style={{ width: '100%', height: `calc(100vh - ${headerHeight}px)` }} />
      }
    </LetterContext.Provider>
  )
}