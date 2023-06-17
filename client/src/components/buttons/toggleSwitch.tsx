// toggle switch component using tailwind nextjs and typescript
// Date: 9/18/2021

import React, { useState } from 'react';

interface Props {
    onChange: (value: boolean) => void;
    defaultChecked?: boolean;
}

// export const ToggleSwitch: React.FC<Props> = ({ label, onChange, defaultChecked }) => {
//     const [checked, setChecked] = useState(defaultChecked || false);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setChecked(e.target.checked);
//         onChange(e.target.checked);
//     };

//     return (
//         <div className="flex items-center justify-between">
//             <label htmlFor="toggle" className="flex items-center cursor-pointer">
//                 <div className="relative">
//                     <input
//                         type="checkbox"
//                         id="toggle"
//                         className="sr-only"
//                         checked={checked}
//                         onChange={handleChange}
//                     />
//                     <div className="block bg-neutral w-14 h-8 rounded-full"></div>
//                     <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
//                 </div>
//                 <div className="ml-3 text-neutral font-medium">{label}</div>
//             </label>
//         </div>
//     );
// }

export function ToggleSwitch(props: Props) {
    // const [checked, setChecked] = useState(props.defaultChecked || false);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setChecked(e.target.checked);
    //     onChange(e.target.checked);
    // };

    return (
        <div className="mt-5">
            <label className="relative inline-block w-16 h-9 rounded-full">
                <input type="checkbox" className="peer opacity-0 w-0 h-0"  onClick={() => props.onChange(true)}/>
                <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-neutral rounded-full duration-300 before:content-[''] before:absolute before:w-7 before:h-7 before:bottom-1 before:left-1 before:rounded-full
                    before:bg-white before:duration-300 peer-checked:before:translate-x-7 peer-checked:bg-primary"></span>
            </label>
        </div>
    )
}