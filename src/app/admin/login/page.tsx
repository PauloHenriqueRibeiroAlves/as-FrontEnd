"use client"
import { InputField } from "@/app/components/Admin/InputField";
import { useState } from "react";

const Page = () => {
    const [passwordInput, setPasswordInput] = useState('');
    return(
        <div>
            Painel ADM - Login
            <InputField
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placehouder="Digite a senha"
            />
        </div>
    );
}

export default Page;