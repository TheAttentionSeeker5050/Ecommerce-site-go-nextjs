// toggle switch component using tailwind nextjs and typescript
// Date: 9/18/2021

import React, { useState } from 'react';

interface Props {
    handleContext: () => void;
    defaultChecked?: boolean;
}


export function ToggleSwitch(props: Props) {
    // create checked state
    const [checked, setChecked] = useState(props.defaultChecked || false);

    // handle change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
        props.handleContext();
        console.log("toggle switch value: "+e.target.checked);
    };

    return (
        <div className="mt-5">
            <label className="relative inline-block w-16 h-9 rounded-full">
                <input type="checkbox" className="peer opacity-0 w-0 h-0"  onClick={(e) => handleChange(e)}/>
                <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-neutral rounded-full duration-300 before:content-[''] before:absolute before:w-7 before:h-7 before:bottom-1 before:left-1 before:rounded-full
                    before:bg-white before:duration-300 peer-checked:before:translate-x-7 peer-checked:bg-primary"></span>
            </label>
        </div>
    )
}