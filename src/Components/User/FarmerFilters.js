import { useEffect, useState } from 'react';
import styles from './Farmer.module.css';
import { getFarmers } from '../../Service/api';

const FarmerFilters = (props) => {
    const [village, setVillage] = useState([]); 
    const [crops, setCrops] = useState([]); 

    const handleClick = () => {
        const village_ = Array.from(village)[parseInt(document.getElementById('village').value)];
        const crops_ = Array.from(crops)[parseInt(document.getElementById('crops').value)];

        //props called
        if(village_ !=  "" && village_ !=undefined){
            props.select({village : village_, crops : crops_});
        }else{
            //no filter applied
            props.select({});
        }
    }
    useEffect(()=> {
        getFarmers().then((response) => {
            const village_ = new Set(response.data?.filter((item) => item.village!='-').map((item) => item.village));
            setVillage(village_);
        })
    },[])
    return (
        <form>
            <div className='row gx-2'>
                <div className='col-md-5 mb-3'>
                    <select className={`form-select ${styles.inputSelect}`} id='village'>
                        <option value="" defaultValue={true}>Select Village</option>
                        {
                            Array.from(village).map((item, index) => <option value={index}>{item}</option>)
                        }
                    </select>
                </div>
                <div className='col-md-5 mb-3'>
                    <select className={`form-select ${styles.inputSelect}`} id='crops'>
                        <option>Select Crops</option>
                        <option value='ginger' selected={true}>Ginger</option>
                        
                    </select>
                </div>
                <div className='col-md-2 mb-3'>
                    <button className='btn btn-primary w-100' type='button' style={{backgroundColor : '#242b4d', border : 'none'}} onClick={handleClick}>Apply</button>
                </div>
            </div>
        </form>
    );
}

export default FarmerFilters;