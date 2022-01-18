import {useState} from 'react';

const Dropdown = () => {
    const [cityState, setCityState] = useState("Kaikki kaupungit");
    
    return (
        <div className = "selectionContainer">
            <select value={cityState} onChange = {e=>setCityState(e.target.value)}
            >
                <option value = 'Kaikki kaupungit'>Kaikki kaupungit</option>
                <option value = 'Helsinki'>Helsinki</option>
                <option value = 'Tampere'>Tampere</option>
                <option value = 'Jyväskylä'>Jyväskylä</option>
                <option value = 'Kuopio'>Kuopio</option>
            </select>
        </div>
    )
}

export default Dropdown
