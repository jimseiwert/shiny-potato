import { GetAllBase, GetTemplates } from '@/server/db/queries/templates';
import { LetterProvider } from './context';
import Toolbar from './toolbar/toolbar';

export default async function Invoice() {
    const templates = await GetTemplates()
    const baseOptions = await GetAllBase()
    return (
        <LetterProvider templates={templates} baseOptions={baseOptions}>
        <Toolbar/>
      </LetterProvider>)
}