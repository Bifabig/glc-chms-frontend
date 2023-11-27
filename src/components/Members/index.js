import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import moment from 'moment/moment';
import {
  Box, Button, Modal, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from '../../redux/thunk';
import styles from '../../styles/Members.module.css';
import NewMember from './NewMember';

const Members = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    members, isLoading, error, errorMsg,
  } = useSelector((store) => store.members);
  const dispatch = useDispatch();

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      type: 'number',
      renderCell: (params) => (
        params.row.attributes.id
      ),
      filterable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 240,
      type: 'string',
      valueGetter: (params) => params.row.attributes.name,
      renderCell: (valueReceived) => valueReceived.row.attributes.name,
    },
    {
      field: 'photo_url',
      headerName: 'Photo',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <img
          src={params.row.attributes.photo_url}
          alt={params.row.attributes.name}
          className={styles.photo}
        />
      ),
      filterable: false,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 160,
      type: 'string',
      valueGetter: (params) => params.row.attributes.address,
      renderCell: (params) => (
        params.row.attributes.address
      ),
    },
    {
      field: 'phone_number',
      headerName: 'Phone Number',
      width: 160,
      sortable: false,
      valueGetter: (params) => params.row.attributes.phone_number,
      renderCell: (params) => (
        params.row.attributes.phone_number
      ),
    },
    {
      field: 'joined_at',
      headerName: 'Member Since',
      type: 'Date',
      width: 150,
      valueGetter: (params) => moment(params.row.attributes.joined_at).format('YYYY/MM/DD'),
      renderCell: (params) => moment(params.row.attributes.joined_at).format('DD/MM/YYYY'),
    },
  ];

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

  if (error) {
    return (
      <span>
        Something Went Wrong...
        <br />
        <br />
        {errorMsg}
      </span>
    );
  }

  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <div>
      <h2>Members</h2>
      <Button onClick={handleModalOpen} variant="contained">Add Member</Button>
      <Modal
        className={styles.modal}
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            left: '20%',
            transform: 'translate(-50%; -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Member Form
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <NewMember />
            {' '}
            <Button onClick={handleModalClose}>Close</Button>
          </Typography>
        </Box>
      </Modal>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={members.data}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default Members;
