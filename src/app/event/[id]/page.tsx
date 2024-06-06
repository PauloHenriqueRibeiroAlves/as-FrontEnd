import { redirect } from "next/navigation";
import * as api from "../../api/site";
import { Search } from "@/app/components/site/Search";

type Props = { params: { id: string }}

const Page = async ({params}: Props) => {
  const eventItem = await api.getEvent(parseInt(params.id));
  if (!eventItem || !eventItem.status) return redirect('/');

  return (    
    <main className="text-center mx-auto max-w-lg p5">
      <header>
        <h2 className="text-2xl text-yellow-400">Amigo Secreto</h2>
        <h1 className="text-3xl mt-5 mb2">{eventItem.title}</h1>
        <p className="text-sm mb-5">{eventItem.description}</p>
      </header>
      <Search id={eventItem.id}/>

      <footer className="mt-5 text-sm">Criado pelo Paulo Henrique</footer>
    </main>
    
  );
}

export default Page;