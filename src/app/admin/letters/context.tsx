'use client';
import { Designer } from "@pdfme/ui";
import { createContext, useEffect, useRef, useState } from "react";
import { DownloadJsonFile, generatePDF, getFontsData, getPlugins } from "./helper";
import { checkTemplate, cloneDeep, Template } from "@pdfme/common";
import { Template as MSCTemplate } from "@/server/interfaces/template";
import { DeleteTemplate, DownloadBase, DownloadTemplate, SaveTemplate } from "./toolbar/actions";
import { toast } from "sonner";

interface Props {
  children: React.ReactNode;
  templates: MSCTemplate[];
  baseOptions: MSCTemplate[];
  jsonOptions: MSCTemplate[];
}

interface LetterContext {
  selectedTemplateId: string | null;
  avaialbleTemplates: MSCTemplate[];
  avaialbleBase: MSCTemplate[];
  avaialbleJson: MSCTemplate[];
  changeTemplate: (templateId: string) => void;
  addTemplateOptions: (template: MSCTemplate) => void;
  addBaseOptions: (template: MSCTemplate) => void;
  addJsonOptions: (template: MSCTemplate) => void;
  deleteTemplate: () => void;
  closeTemplate: () => void;
  downloadJsonFile: () => void;
  saveTemplate: () => void;
  generatePreviewPDF: () => void;
  changeBase: (templateId: string, type: string) => void;
  uploadJson: (json: string) => void;
}

export const LetterContext = createContext<LetterContext>({
  selectedTemplateId: null,
  avaialbleTemplates: [],
  avaialbleBase: [],
  avaialbleJson: [],
  addTemplateOptions: () => { },
  addBaseOptions: () => { },
  addJsonOptions: () => { },
  changeTemplate: () => { },
  deleteTemplate: () => { },
  downloadJsonFile: () => { },
  saveTemplate: () => { },
  closeTemplate: () => { },
  changeBase: () => { },
  uploadJson: () => { },
  generatePreviewPDF: () => { },
});

const headerHeight = 80;

const blankPDF = {
  width: 210,
  height: 297,
  padding: [5, 5, 5, 5],
};


export const LetterProvider = ({ templates, baseOptions, jsonOptions, children }: Props) => {
  if (!baseOptions.find((base) => base.id === 0)) {
    baseOptions.unshift({ id: 0, name: 'Blank - Single Page' });
  }

  const designerRef = useRef<HTMLDivElement | null>(null);
  const designer = useRef<Designer | null>(null);

  const [template, setTemplate] = useState<Template | null>(null);
  const [selectedTemplateId, setSelectedTemplate] = useState<string>("");

  const [avaialbleTemplates, setAvailableTemplates] = useState<MSCTemplate[]>(templates);
  const [avaialbleBase, setAvailableBase] = useState<MSCTemplate[]>(baseOptions);
  const [avaialbleJson, setAvailableJson] = useState<MSCTemplate[]>(jsonOptions);

  const downloadJsonFile = async (): Promise<void> => {
    if (designer.current) {
      const template = designer.current.getTemplate();
      const selectedTemplate = templates.find((template) => template.id === Number(selectedTemplateId));

      await DownloadJsonFile(template, `${selectedTemplate?.name}`);
    }
  }

  const closeTemplate = async (): Promise<void> => {
    setTemplate(null);
    designer.current!.destroy();
  }



  const generatePreviewPDF = async (): Promise<void> => {
    generatePDF(designer.current)
  }

  const changeTemplate = async (templateId: string): Promise<void> => {
    const template = await DownloadTemplate(Number(templateId));

    setSelectedTemplate(templateId);
    setTemplate(template)
  }

  const saveTemplate = async (): Promise<void> => {
    if (designer.current) {
      toast('Saving Template');
      const template = designer.current.getTemplate();
      await SaveTemplate(Number(selectedTemplateId), JSON.stringify(template));
      toast('Template Saved');
    }
  }

  const changeBase = async (templateId: string, type: string): Promise<void> => {
    if (templateId === '0') {
      if (designer.current) {
        designer.current.updateTemplate(
          Object.assign(cloneDeep(designer.current.getTemplate()), {
            basePdf: blankPDF
          })
        );
      }
    } else {
      const template = await DownloadBase(Number(templateId));
      if (designer.current) {
        if (type === 'json') {
          designer.current.updateTemplate(
            JSON.parse(template.base)
          );
        } else
          designer.current.updateTemplate(
            Object.assign(cloneDeep(designer.current.getTemplate()), {
              basePdf: template.base
            })
          );

      }
    }
  }

  const addTemplateOptions = (template: MSCTemplate) => {
    setAvailableTemplates([...avaialbleTemplates, template]);
    changeTemplate(template.id.toString());
  }

  const addBaseOptions = (template: MSCTemplate) => {
    setAvailableBase([...avaialbleBase, template]);
  }

  const addJsonOptions = (template: MSCTemplate) => {
    setAvailableJson([...avaialbleJson, template]);
  }
  const uploadJson = async (jsonStr: string): Promise<void> => {
    const template: Template = JSON.parse(jsonStr as string);
    checkTemplate(template);
    setTemplate(template)
  }

  const deleteTemplate = async (): Promise<void> => {
    const con = confirm('Are you sure you want to delete this template?');
    if (con) {
      await DeleteTemplate(Number(selectedTemplateId));
      setTemplate(null)
      setAvailableTemplates(avaialbleTemplates.filter((template) => template.id !== Number(selectedTemplateId)));
    }
  }


  useEffect(() => {
    const buildDesigner = () => {
      getFontsData().then((font) => {
        if (designerRef.current && template) {

          designer.current = new Designer({
            domContainer: designerRef.current,
            template: template,
            options: {
              font,
              lang: 'en',
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
      }
      );
    }

    buildDesigner();
  }, [template])

  return (
    <LetterContext.Provider value={{ selectedTemplateId, closeTemplate, addJsonOptions, addTemplateOptions, addBaseOptions, changeTemplate, avaialbleTemplates, avaialbleBase, avaialbleJson, generatePreviewPDF, uploadJson, saveTemplate, deleteTemplate, changeBase, downloadJsonFile }}>
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

        <div ref={designerRef} className="text-gray-900" style={{ width: '100%', height: `calc(100vh - ${headerHeight}px)` }} />
      }
    </LetterContext.Provider>
  )
}