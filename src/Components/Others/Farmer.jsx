import React, { useMemo, useRef, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Button, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { exportCSV, getFarmers, getFarmersByQuery, getOtherFarmers, getOtherFarmersByQuery } from '../../Service/api';
import FarmerFilters from './FarmerFilters';
import { ToastContainer, toast } from 'react-toastify';




const Farmer = () => {
  // const [isDisabled, setIsDisabled] = useState(false);
  // const [originaldata, setOriginalData] =useState([]); 
  const [data, setData] = useState([]);
  const columns = useMemo(
    () => [
      {
        accessorKey: 'excel_id',
        header: 'Farmer ID'
      },
      {
        id : 'farmerName',
        header: 'Farmer Name',
        accessorFn: (data) => {
            return data?.farmerName;
        },
        Cell: ({ cell }) => {
            return (<div>
              <a href={`/#/farmer-profile/${cell.row.original?._id}`}>{cell.row.original?.farmerName}</a>
            </div>);
        }
      },
      // {
      //   accessorKey: 'fatherName',
      //   header: 'Fathers Name'
      // },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone',
        Cell: ({cell}) => {
          const data = cell.row.original;
          return (<div>
            { data.phoneNumber === '' ? '-' : data.phoneNumber }
          </div>);
        }
      },
      {
        accessorKey: 'state',
        header: 'State'
      },
      {
        accessorKey: 'district',
        header: 'District'
      },
      {
        accessorKey: 'block',
        header: 'Block'
      },
      {
        accessorKey: 'village',
        header: 'Village'
      },
      {
        header: 'Area',
        accessorFn: (data) => {
          
          
          let area = 0;
          const {maps} = data;
          for(let map of maps){
            area += map.area;
          }
          return `${(area/4046.8564224).toFixed(2)} Acres`;
        },
      },
      {
        accessorKey: 'crops',
        header: 'Crops Grown',
        Cell: ({ cell }) => {
          const data = cell.row.original;
          return <div>
          {
            data.crops.length === 0 ? <span>No crops to display</span> : 
            <>
              {
                data?.crops.map((crop) => <span>{crop.cropName}</span>)
              }
            </>
          }
          
        </div>
      },
      }
    ],
    [],
  );
  
  const handleFilters = (query) => {
    
    getOtherFarmersByQuery(query).then((response) => {
      console.log(response);
      console.log(response)
      setData(response.data);
    })
  }
  // const fileHandler = (event) => {
  //   setIsDisabled(true);
  //   const formData = new FormData();
  //   formData.append('csv', event.target.files[0])
  //   exportCSV(formData).then((response) => {
  //     console.log(response);
  //     if(response.result==='success'){
  //       setData(response.data);
  //       setIsDisabled(false);
  //       toast.success("CSV file added succesfully", {
  //         position: toast.POSITION.TOP_RIGHT,
  //         toastId:3,
  //         autoClose : 2000,
  //       })
  //     }
     
  //   })
  // }
  // const VisuallyHiddenInput = styled('input')({
  //   clip: 'rect(0 0 0 0)',
  //   clipPath: 'inset(50%)',
  //   height: 1,
   
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   whiteSpace: 'nowrap',
  //   width: 1,
  // });
  useEffect(() => {
    getOtherFarmers().then((response) =>{
      console.log(response.data);
      setData(response.data); 
    });
  }, [])
  return (
    <>
      <ToastContainer/>
      <h2 variant="h5" style={{'textAlign': 'initial', 'fontWeight': '300'}}>
        Farmer Table
      </h2>
      {/* <div className='col-md-3' style={{textAlign : 'left'}}>
      <Button component="label" sx={{width : '100%'}} variant="contained" startIcon={<CloudUploadIcon/>} disabled={isDisabled}>
            {isDisabled === true ? 'Uploading..' : 'Upload file'}  
            <VisuallyHiddenInput onChange={fileHandler} type="file" />
      </Button>
      </div> 
      <br/>*/}
      <FarmerFilters select={handleFilters}/>

     <br/>
     {
      data.length!=0 ? 
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

     
    /> : <LinearProgress/>
     }

    </>
  )
}

export default Farmer