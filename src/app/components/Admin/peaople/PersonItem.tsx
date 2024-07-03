type Props = {
    
}
export const PersonItem = ({ }: Props) => {
    
    return (
        <div className="border border-gray-700 bg-gray-900 rounded p-3 mb-3 flex
        items-center">
            ...
        </div>
    );
}

export const PersonItemPlaceholder = () => {
    return (
        <div className="w-full h-16 border border-gray-700 rounded mb-3 bg-gradient-to-r
        from-gray-900 to-gray-950 animate-pulse"></div>
    );
}

export const PersonItemNotFounde = () => {
    return (
        <div className="text-center py-4 text-gray-500">
            Não há pessoas neste grupo.
        </div>
    );
}
