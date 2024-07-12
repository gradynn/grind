import { useState } from "react";
import { FaFilter } from "react-icons/fa6";

interface DropdownProps {
    title: string,
    options: {val: string, label:string}[],
    callback: React.Dispatch<React.SetStateAction<string | null>>;
    type: 'filter' | 'general';
}

const Dropdown = ({ title, options, callback, type }: DropdownProps) => {
    const [active, setActive] = useState(false);
    
    const iconMap = {
        'filter': <FaFilter className={`text-primary text-xl pr-1 ${active ? 'text-primary' : 'text-white'}`}/>,
        'general': <></>
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        callback(event.target.value || null);
        if (event.target.value) {
            setActive(true)
        } else {
            setActive(false)
        }
    };
    
    return <div className="flex flex-row items-center">
        { iconMap[type] }
        <select onChange={handleChange} className={`text-white p-1 focus:outline-none ${active ? 'bg-primary' : 'bg-background'}`}>
            <option value=''>{title}</option>
            {options.map((op: {val: string, label: string}) => {
                return <option value={op.val}>{op.label}</option>
            })}
        </select>
    </div>
};

export default Dropdown;