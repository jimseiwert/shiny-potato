import {
    Font,
    getInputFromTemplate,
    getDefaultFont,
    DEFAULT_FONT_NAME,
  } from '@pdfme/common';
  import { Form, Viewer, Designer } from '@pdfme/ui';
  import { generate } from '@pdfme/generator';
  import {
    multiVariableText,
    text,
    barcodes,
    image,
    svg,
    line,
    table,
    rectangle,
    ellipse,
    dateTime,
    date,
    time,
    select,
  } from '@pdfme/schemas';
  import plugins from './plugins';
  
  const fontObjList = [
    {
      fallback: true,
      label: 'NotoSerifJP-Regular',
      url: '/fonts/NotoSerifJP-Regular.otf',
    },
    {
      fallback: false,
      label: 'NotoSansJP-Regular',
      url: '/fonts/NotoSansJP-Regular.otf',
    },
    {
      fallback: false,
      label: DEFAULT_FONT_NAME,
      data: getDefaultFont()[DEFAULT_FONT_NAME].data,
    },
  ];
  
  export const getFontsData = async () => {
    const fontDataList = (await Promise.all(
      fontObjList.map(async (font) => ({
        ...font,
        data: font.data || (await fetch(font.url || '').then((res) => res.arrayBuffer())),
      }))
    )) as { fallback: boolean; label: string; data: ArrayBuffer }[];
  
    return fontDataList.reduce((acc, font) => ({ ...acc, [font.label]: font }), {} as Font);
  };
  
  export const ReadFile = (file: File | null, type: 'text' | 'dataURL' | 'arrayBuffer') => {
    return new Promise<string | ArrayBuffer>((r) => {
      const fileReader = new FileReader();
      fileReader.addEventListener('load', (e) => {
        if (e && e.target && e.target.result && file !== null) {
          r(e.target.result);
        }
      });
      if (file !== null) {
        if (type === 'text') {
          fileReader.readAsText(file);
        } else if (type === 'dataURL') {
          fileReader.readAsDataURL(file);
        } else if (type === 'arrayBuffer') {
          fileReader.readAsArrayBuffer(file);
        }
      }
    });
  };

  
  export const DownloadJsonFile = (json: unknown, title: string) => {
    if (typeof window !== 'undefined') {
      const blob = new Blob([JSON.stringify(json)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };
   
  export const getPlugins = () => {
    return {
      Text: text,
      'Multi-Variable Text': multiVariableText,
      Table: table,
      Line: line,
      Rectangle: rectangle,
      Ellipse: ellipse,
      Image: image,
      SVG: svg,
      Signature: plugins.signature,
      QR: barcodes.qrcode,
      DateTime: dateTime,
      Date: date,
      Time: time,
      Select: select,
      // JAPANPOST: barcodes.japanpost,
      EAN13: barcodes.ean13,
      // EAN8: barcodes.ean8,
      // Code39: barcodes.code39,
      Code128: barcodes.code128,
      // NW7: barcodes.nw7,
      // ITF14: barcodes.itf14,
      // UPCA: barcodes.upca,
      // UPCE: barcodes.upce,
      // GS1DataMatrix: barcodes.gs1datamatrix,
    };
  };
  
 
  export const generatePDF = async (currentRef: Designer | Form | Viewer | null) => {
    if (!currentRef) return;
    const template = currentRef.getTemplate();
    const options = currentRef.getOptions();
    const inputs =
      typeof (currentRef as Viewer | Form).getInputs === 'function'
        ? (currentRef as Viewer | Form).getInputs()
        : getInputFromTemplate(template);
    const font = await getFontsData();
  
    try {
      const pdf = await generate({
        template,
        inputs,
        options: {
          font,
          lang: options.lang,
          title: 'pdfme',
        },
        plugins: getPlugins(),
      });
  
      const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
      window.open(URL.createObjectURL(blob));
    } catch (e) {
      alert(e + '\n\nCheck the console for full stack trace');
      throw e;
    }
  };
  
  export const IsJsonString = (str: string) => {
    try {
      JSON.parse(str);
    } catch (e: Error | unknown) {
        console.log(e)
      return false;
    }
    return true;
  };






