import { useEffect, useState } from 'react';
import styles from './Farmer.module.css';
import { getFarmers } from '../../Service/api';

const FarmerFilters = (props) => {
    return (
        <form>
            <div className='row gx-2' style={{textAlign : 'left'}}>
                <div className='col-md-3'>
                    <select className={`form-select ${styles.inputSelect}`} id='crops' onChange={(event) => props.select({'crops' : event.target.value})}>
                        <option value="" selected={true}>Select Crops</option>
                        <option value="Ginger">Ginger</option>
                        <option value="Paddy">Paddy</option>
                    </select>
                </div>
                
            </div>
        </form>
    );
}

export default FarmerFilters;