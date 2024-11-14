import { GetTemplates } from '@/server/db/queries/templates';
import Editor from './editor';
import Toolbar from './toolbar';

export default async function Invoice(){
    const templates = await GetTemplates()
    // generate({ template, inputs }).then((pdf) => {
    //     console.log(pdf);
      
    //     Browser
    //     const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    //     window.open(URL.createObjectURL(blob));
      
    //     Node.js
    //     fs.writeFileSync(path.join(__dirname, `test.pdf`), pdf);
    //   });


    return (
        <div>
        <Toolbar templates={templates}/>
        <Editor />
        </div>
    )
}