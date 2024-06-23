import * as api from '@/app/api/server';
import { redirect } from 'next/navigation';
import { AdminPage } from '../components/Admin/AdminPAge';

const Page = async () => {
    //requisição vinda da api
    const logged = await api.pingAdmin();
    //condição para saber se está logado
    if (!logged) return redirect('/admin/login');

    return <AdminPage/>
}

export default Page;