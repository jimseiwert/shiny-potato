import React, { useContext, useState } from "react";
import { LetterContext } from "./context";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function Options() {
    const { selectedBase, fields, setMailTemplateUsed, setPrintColor, setPrintDuplex, changeBaseOptions, mailTemplateUsed, printColor, printDuplex } = useContext(LetterContext);

    const [width, setWidth] = useState<number>(selectedBase?.width || 0);
    const [height, setHeight] = useState<number>(selectedBase?.height || 0);
    const [padding, setPadding] = useState<number[]>(selectedBase?.padding || [0, 0, 0, 0]);

    const changeWidth = (e) => {
        setWidth(e.target.value);
        changeBaseOptions({ ...selectedBase, height: height, width: Number(e.target.value) });
    }
    const changeHeight = (e) => {
        setHeight(e.target.value);
        changeBaseOptions({ ...selectedBase, width: width,  height: Number(e.target.value) });
    }
    const changePadding = (top, right, bottom, left) => {
        setPadding([top, right, bottom, left]);
        changeBaseOptions({ ...selectedBase, height: height, width: width,  padding: [top, right, bottom, left] });
    }


    return (
        <div className="w-80 py-4 px-4">
            <h2 className="text-base/7 font-semibold border-b-2">Page Size</h2>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <Label htmlFor="width">Width</Label>
                    <Input type="number" id="width" value={width} onChange={changeWidth} />
                </div>
                <div>
                    <Label htmlFor="height">Height</Label>
                    <Input type="number" id="height" value={height} onChange={changeHeight} />
                </div>
            </div>
            <h2 className="text-base/7 font-semibold border-b-2 py-4">Padding</h2>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <Label htmlFor="email">Top</Label>
                    <Input type="number" id="height" value={padding[0]} onChange={(e) => {
                        changePadding(Number(e.target.value), padding[1], padding[2], padding[3]);

                    }} />
                </div>
                <div>
                    <Label htmlFor="email">Right</Label>
                    <Input type="number" id="height" value={padding[1]} onChange={(e) => {
                        changePadding(padding[0], Number(e.target.value), padding[2], padding[3]);

                    }} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <Label htmlFor="email">Bottom</Label>
                    <Input type="number" id="height" value={padding[2]} onChange={(e) => {
                        changePadding(padding[0], padding[1], Number(e.target.value), padding[3]);

                    }} />
                </div>
                <div>
                    <Label htmlFor="email">Left</Label>
                    <Input type="number" id="height" value={padding[3]} onChange={(e) => {
                        changePadding(padding[0], padding[1], padding[2], Number(e.target.value));

                    }} />
                </div>
            </div>
            <h2 className="text-base/7 font-semibold border-b-2 py-4">Mailer Options</h2>
            <div className="flex flex-col gap-4 py-4 px-4">
                <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" checked={mailTemplateUsed} onCheckedChange={setMailTemplateUsed} />
                    <Label htmlFor="airplane-mode">Mailer Template Used</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" checked={printColor} onCheckedChange={setPrintColor} />
                    <Label htmlFor="airplane-mode">Mailer Print In Color</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" checked={printDuplex} onCheckedChange={setPrintDuplex} />
                    <Label htmlFor="airplane-mode">Mailer Print Duplex</Label>
                </div>
            </div>

            <h2 className="text-base/7 font-semibold border-b-2">Fields</h2>
            <ScrollArea className="h-48 rounded-md border py-2 ms-2 w-full">
                {fields.map((field) => (
                    <React.Fragment key={field}>
                        <div className="text-sm">
                            {field}
                        </div>
                        <Separator className="my-2" />
                    </React.Fragment>
                ))}
            </ScrollArea>
            </div>
    )
}