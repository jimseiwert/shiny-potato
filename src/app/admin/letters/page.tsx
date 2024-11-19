import { GetAllBase, GetTemplates } from '@/server/db/queries/templates';
import { LetterProvider } from './context';
import Toolbar from './toolbar/toolbar';
import withAuth from '@/lib/withAuth/page/server';
import { Claim } from '@/server/enums/claims';

async function Letter() {
    const templates = await GetTemplates()
    const baseOptions = await GetAllBase('base')
    const jsonOptions = await GetAllBase('json')
    return (
        <LetterProvider templates={templates} baseOptions={baseOptions} jsonOptions={jsonOptions}>
        <Toolbar/>
      </LetterProvider>)
}


export default withAuth(Letter,Claim.LettersRead);