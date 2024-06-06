import * as api from '@/app/api/server';
import { redirect } from 'next/navigation';

const Page = async () => {
    //requisição vinda da api
    const logged = await api.pingAdmin();
    //condição para saber se está logado
    if (!logged) return redirect('/admin/login');

    return(
        <div>
            Painel ADM
        </div>
    );
}

export default Page;