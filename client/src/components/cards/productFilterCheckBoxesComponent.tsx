import { changeProductFeatureSelected } from "@/data/redux/productFilterStore";
import { reduxStore } from "@/data/redux/reduxStore";


export default function DisplayCheckboxFilters(
    {renderSW, setRenderSW} : {renderSW: boolean, setRenderSW: React.Dispatch<React.SetStateAction<boolean>>}
    ) {
    
    // // this is a weird implementation but I need to force a rerender of the checkboxes when the redux state changes
    // const [renderSW, setRenderSW] = useState(false);

    function handleSelectFilterStateChange(
        {event, featureIndex, optionIndex} : {event: React.MouseEvent<HTMLDivElement, MouseEvent>, featureIndex: number, optionIndex: number}
    ) {
        // dispatch the action to change the selected state of the option
        reduxStore.dispatch(changeProductFeatureSelected({featureIndex: featureIndex, optionIndex: optionIndex}));
    
        // force a rerender of select button
        setRenderSW(!renderSW);
    }

    
    return (
        <div className="flex flex-col gap-1">
            {reduxStore.getState().productFilter.value.features.map((feature, featureIndex) => {
                return (
                    <div className="flex flex-col gap-1" key={featureIndex}>
                        <span>{feature.name}</span>
                        {feature.options.map((option, optionIndex) => {
                            return (
                                <div className="flex flex-row gap-2" key={optionIndex} onClick={(e) => handleSelectFilterStateChange({event: e, featureIndex:featureIndex, optionIndex: optionIndex})}
                                >
                                    <input type="checkbox" checked={option.selected} readOnly/>
                                    <span>{option.name}</span>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}