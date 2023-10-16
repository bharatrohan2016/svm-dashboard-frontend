import { useState } from "react";
import styles from './Farmer.module.css';
import { getFarmers } from "../../Service/api";

const Filter = (props) => {
    const [village, setVillage] = useState([]);
    const [farmers, setFarmers] = useState([]);
    const [data, setData]  = useState([]);

    const selectHandler = (event) => {
        const val = Array.from(village)[parseInt(event.target.value)];
        console.log(parseInt(event.target.value))
        let arr = data.filter((item) => item.village === val);
        console.log(arr);
        setFarmers(arr);
    }

    useState(() => {
        getFarmers().then((response) => {
            const village_ = new Set(response.data?.filter((item) => item.village!='-').map((item) => item.village));
            setVillage(village_);
            setData(response.data);
        })
    },[])
    return (
        <div className='row gx-2' style={{textAlign : 'left'}}>
            <div className='col-md-6 mb-3'  style={{textAlign : 'left !important'}}>
                <label>Village</label>
                <select className={`form-select mt-2 ${styles.inputSelect}`} id='village' onChange={selectHandler}>
                        <option disabled={true}  selected={true}>Select Village</option>
                        {
                            Array.from(village).map((item, index) => <option value={index}>{item}</option>)
                        }
                </select>
            </div>

            <div className='col-md-6 mb-3'  style={{textAlign : 'left !important'}}>
                <label>Farmer</label>
                <select className={`form-select mt-2 ${styles.inputSelect}`} id='farmer' onChange={(event) => props.value(event.target.value)}>
                        <option disabled={true}  selected={true}>Select Farmer</option>    
                        {
                            farmers.map((item, index) => <option value={item._id}>{item.name}</option>)
                        }
                </select>
            </div>
            
        </div>
    );
}

export default Filter;