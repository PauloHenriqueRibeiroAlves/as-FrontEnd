import { Metadata } from "next";
import { ReactNode } from "react";

type Props = {
  children: ReactNode
}
export const metadata: Metadata = {
  title: 'Amigo Secreto - Admin'
}

const Layout = ({ children }:Props) => {
  return(
      <div>
          <header className="bg-gray-800 text-center py-5">
            <h3 className="text-3xl">Amigo Secreto</h3>
            <h4 className="text-base">Painel de Controle</h4>
          </header>
          <main className="mx-auto w-full max-w-3xl p-3 bg-red-900">{children}</main>
      </div>
  );
}
//children é a nossa pagina tipada
export default Layout;