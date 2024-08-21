import { useEffect, useState } from 'react';
import styles from './Farmer.module.css';
import { getFarmers } from '../../Service/api';

const FarmerFilters = (props) => {
    const [village, setVillage] = useState([]); 
    const [farmers, setFarmers] = useState([]);
    const [data,setData] = useState([]);

    const selectHandler = (event) => {
        let arr = data.filter((item) => item.village === event.target.value);
        document.getElementById('farmer').value = "";
        setFarmers(arr);
    }
    const handleClick = () => {
        const village_ = document.getElementById('village').value;
        const farmer_ = document.getElementById('farmer').value;
        
        let query = {};

        if(village_ != ""){
            query['village'] = village_;
        }

        if(farmer_ != ""){
            query['name'] = farmer_;
        }

        props.select(query);
    }
    useEffect(()=> {
        getFarmers().then((response) => {
            setFarmers(response.data);
            setData(response.data);
            const village_ = new Set(response.data?.filter((item) => item.village!='-').map((item) => item.village));
            setVillage(village_);
        })
    },[])
    return (
        <form>
            <div className='row gx-2' style={{textAlign : 'left'}}>
                <div className='col-md-3 mt-3 mb-2'>
                    <label style={{fontSize : '15px'}} className='text-primary'>Block</label>
                    <select className={`form-select ${styles.inputSelect}`} id='block'>
                        <option value="" disabled={true}>Select Block</option>
                        <option value="bhoirymbog">Bhoirymbong</option>
                    </select>
                </div>
                <div className='col-md-3 mt-3 mb-2'>
                    <label style={{fontSize : '15px'}} className='text-primary'>District</label>
                    <select className={`form-select ${styles.inputSelect}`} id='district'>
                        <option value="" disabled={true}>Select District</option>
                        <option value="ri-bhoi">Ri Bhoi</option>
                    </select>
                </div>
                <div className='col-md-3 mt-3 mb-2'>
                    <label style={{fontSize : '15px'}} className='text-primary'>Village</label>
                    <select className={`form-select ${styles.inputSelect}`} id='village' onChange={selectHandler}>
                        <option value="" defaultValue={true}>All</option>
                        {
                            Array.from(village).map((item, index) => <option key={index} value={item}>{item}</option>)
                        }
                    </select>
                </div>
                <div className='col-md-3 mt-3 mb-2' >
                <label style={{fontSize : '15px'}} className='text-primary'>Farmer</label>
                    <select className={`form-select ${styles.inputSelect}`} id='farmer'>
                            <option value="" defaultValue={true}>All</option>    
                            {
                                farmers.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)
                            }
                    </select>
                </div>
                <div className='col-md-3 mt-3'>
                    <button className='btn btn-primary w-100' type='button' style={{backgroundColor : '#193C34 ', border : 'none'}}>Apply</button>
                </div>
            </div>
        </form>
    );
}

export default FarmerFilters;