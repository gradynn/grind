interface DropdownProps {
    options: string[],
    callback: React.Dispatch<React.SetStateAction<string | null>>;
}

const Dropdown = ({ options, callback }: DropdownProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        callback(event.target.value || null);
    };
    
    return <select onChange={handleChange}>
        <option value=''>None</option>
        {options.map((op: string) => {
            return <option value={op}>{op}</option>
        })}
    </select>
};

export default Dropdown;