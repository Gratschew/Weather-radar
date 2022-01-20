import {useState} from 'react';

const Dropdown = ({onCityChange}) => {
    const [cityState, setCityState] = useState('allCities');


    return (
        <div className = "selectionContainer">
            <select value={cityState} onChange = {
                e=>{
                setCityState(e.target.value);
                onCityChange(e.target.value);}
                }>
                <option value = 'allCities' >Kaikki kaupungit</option>
                <option value = 'Helsinki'>Helsinki</option>
                <option value = 'Jyvaskyla'>Jyväskylä</option>
                <option value = 'Kuopio'>Kuopio</option>
                <option value = 'Tampere' >Tampere</option>
            </select>
        </div>
    )
}

export default Dropdown
