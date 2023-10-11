import React, { useMemo, useRef, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { exportCSV } from '../../Service/api';

const data = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
];


const Farmer = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 150,
      },
      {
        accessorKey: 'state',
        header: 'State',
        size: 150,
      },
    ],
    [],
  );
  const fileHandler = (event) => {
    setIsDisabled(true);
    const formData = new FormData();
    formData.append('csv', event.target.files[0])
    exportCSV(formData).then((response) => {
      console.log(response);
      setIsDisabled(false);
    })
  }
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  return (
    <>
      <h2 variant="h5" style={{'textAlign': 'initial', 'fontWeight': '300'}}>
        Farmer Table
      </h2>

      <MaterialReactTable
        columns={columns}
        data={data}
        muiTablePaginationProps={{
          rowsPerPageOptions: [5, 10, 15, 50],
          showFirstButton: true,
          showLastButton: true,
        }}
        renderTopToolbarCustomActions={() => (
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon/>}>
          Upload file
          <VisuallyHiddenInput onChange={fileHandler} type="file" />
          </Button>
        )}
      />
    </>
  )
}

export default Farmer