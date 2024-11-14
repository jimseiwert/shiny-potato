'use client';
import type { Template } from '@pdfme/common';
import { Designer } from '@pdfme/ui';
import { BLANK_PDF } from '@pdfme/common';
import { useEffect, useRef } from 'react';
import { text, image, barcodes, table} from "@pdfme/schemas";

const template: Template = {
    basePdf:{
    width: 210,
    height: 297,
    padding: [10, 10, 20, 10],
    "staticSchema": [
    {
      "name": "line",
      "type": "line",
      "position": {
        "x": 20,
        "y": 279
      },
      "width": 170,
      "height": 0.2,
      "rotate": 0,
      "opacity": 1,
      "color": "#999999",
      "required": false,
      "readOnly": true,
      "content": ""
    },
    {
      "name": "footerInfo",
      "type": "text",
      "content": "Invoice No.{info.InvoiceNo} • {totalInput} USD due {date}",
      "position": {
        "x": 10,
        "y": 282
      },
      "width": 150,
      "height": 10,
      "rotate": 0,
      "alignment": "left",
      "verticalAlignment": "middle",
      "fontSize": 13,
      "lineHeight": 1,
      "characterSpacing": 0,
      "fontColor": "#000000",
      "backgroundColor": "",
      "opacity": 1,
      "strikethrough": false,
      "underline": false,
      "required": false,
      "readOnly": true
    },
    {
      "name": "pageNumber",
      "type": "text",
      "content": "Page {currentPage} of {totalPages}",
      "position": {
        "x": 145,
        "y": 282
      },
      "width": 45,
      "height": 10,
      "rotate": 0,
      "alignment": "right",
      "verticalAlignment": "middle",
      "fontSize": 13,
      "lineHeight": 1,
      "characterSpacing": 0,
      "fontColor": "#000000",
      "backgroundColor": "",
      "opacity": 1,
      "strikethrough": false,
      "underline": false,
      "required": false,
      "readOnly": true
    }
  ]},
    schemas: [
      [
        {
          name: 'name',
          type: 'text',
          position: { x: 0, y: 0 },
          width: 10,
          height: 10,
        },
        {
          name: 'address',
          type: 'text',
          position: { x: 10, y: 10 },
          width: 10,
          height: 10,
        },
        {
          name: 'c',
          type: 'text',
          position: { x: 20, y: 20 },
          width: 10,
          height: 10,
        },
        
      ],
    ],
  };

const plugins = { text, image, qrcode: barcodes.qrcode, table };
export default function Editor() {
    const ref = useRef(null);

    const inputs = [
        {
            "mytable": [
              ["Alice", "New York", "Alice is a freelance web designer and developer"],
              ["Bob", "Paris", "Bob is a freelance illustrator and graphic designer"]
            ]
          }
    ]
    // ref.current.saveTemplate
    // updateTemplate
    // getTemplate
    // onChangeTemplate
    // onSaveTemplate
    // destroy
    useEffect(() => {
        const domContainer = document.getElementById('container');
        const designer = new Designer({ domContainer, template, plugins });
    }  , [])

    return (
        <div id="container" ref={ref} className="h-screen">
        </div>
    );
}