import React, { useMemo, useRef, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { exportCSV, getFarmers, getFarmersByQuery } from '../../Service/api';
import FarmerFilters from './FarmerFilters';
import { ToastContainer, toast } from 'react-toastify';




const Farmer = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [originaldata, setOriginalData] =useState([]); 
  const [data, setData] = useState([]);
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Name'
      },
      {
        accessorKey: 'fathersName',
        header: 'Fathers Name'
      },
      {
        accessorKey: 'phone',
        header: 'Phone'
      },
      {
        accessorKey: 'village',
        header: 'Village'
      },
      {
        accessorKey: 'numberOfLastYearCrops',
        header: 'Number of last year crops'
      }
    ],
    [],
  );
  
  const handleFilters = (query) => {
    
    getFarmersByQuery(query).then((response) => {
      console.log(response);
      setData(response.data);
    })
  }
  const fileHandler = (event) => {
    setIsDisabled(true);
    const formData = new FormData();
    formData.append('csv', event.target.files[0])
    exportCSV(formData).then((response) => {
      console.log(response);
      if(response.result==='success'){
        toast.success("CSV file added succesfully", {
          position: toast.POSITION.TOP_RIGHT,
          toastId:3,
          autoClose : 2000,
        })
      }
      setIsDisabled(false);
    })
  }
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
   
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  useEffect(() => {
    getFarmers().then((response) =>{ setData(response.data); setOriginalData(response.data)});
  }, [])
  return (
    <>
      <ToastContainer/>
      <h2 variant="h5" style={{'textAlign': 'initial', 'fontWeight': '300'}}>
        Farmer Table
      </h2>
      <div className='col-md-3' style={{textAlign : 'left'}}>
      <Button component="label" sx={{width : '100%'}} variant="contained" startIcon={<CloudUploadIcon/>} >
              Upload file
            <VisuallyHiddenInput onChange={fileHandler} type="file" />
      </Button>
      </div>
      <br/>
      <FarmerFilters select={handleFilters}/>

     <br/>
        <MaterialReactTable
          columns={columns}
          data={data}
          //decides initial states
          initialState={{
            sorting : [ { id : 'name'}],
            showGlobalFilter: true,
          }}
          
          // search bar position
          positionGlobalFilter="left"
          muiSearchTextFieldProps={{
            placeholder: 'Search all users',
            sx : { width : '400px' }
          }}
          //removed toggle
          enableDensityToggle={false}

          //borders
          muiTableProps={{
            sx: {
              border: '1px solid rgba(224, 224, 224, 1)!important',
            },
          }}
          muiTableHeadCellProps={{
                sx: {
                border: '1px solid rgba(224, 224, 224, 1)!important',
                },
          }}
          muiTableBodyCellProps={{
              sx: {
              border: '1px solid rgba(224, 224, 224, 1)!important',
              },
          }}

          //showing first and last button
          muiTablePaginationProps={{
            rowsPerPageOptions: [5, 10, 15, 50],
            showFirstButton: true,
            showLastButton: true,
          }}

         
        />
    </>
  )
}

export default Farmer