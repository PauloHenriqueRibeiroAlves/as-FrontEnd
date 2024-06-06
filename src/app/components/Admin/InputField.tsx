import { ChangeEvent } from "react";

type Props = {
    type?: 'text' | 'password';
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placehouder?: string;
    disabled?: boolean;
    erroMessager?: string;
}
export const InputField = ({ type, value, onChange, placehouder, disabled, erroMessager}: Props) => {
    return(
        <div className="w-full my-3">
            <input
                type={type || 'text'}
                value={value}
                onChange={onChange}
                placeholder={placehouder}
                disabled={disabled}
                className={`w-full block text-lg p-3 outline-none rounded bg-gray-900
                text-white border-b-2 ${erroMessager ? 'border-red-600' :
                'border-gray-900'} focus: border-white`}
            />
            {erroMessager && <div className="text-right text-sm text-red-600">{erroMessager}</div>}
        </div>
    );
}