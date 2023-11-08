import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import moment from 'moment/moment';
import {
  Box, Button, Modal, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import getMembers from '../../redux/thunk';
import styles from '../../styles/Members.module.css';
import NewMember from './NewMember';

const Members = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { members, isLoading, error } = useSelector((store) => store.members);
  const dispatch = useDispatch();

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 140 },
    {
      field: 'photo',
      headerName: 'Photo',
      width: 130,
      renderCell: (params) => (
        <img src={params.value} alt={params.name} className={styles.photo} />
      ),
    },
    {
      field: 'address',
      headerName: 'Address',
      type: 'number',
      width: 120,
    },
    {
      field: 'phone_number',
      headerName: 'Phone Number',
      type: 'number',
      width: 120,
    },
    {
      field: 'joined_at',
      headerName: 'Member Since',
      type: 'date',
      width: 120,
      valueFormatter: (params) => moment(params?.value).format('DD/MM/YYYY'),
    },
  ];

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

  if (error) <h2>Something Went Wrong</h2>;

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <h1>Members</h1>
      <Button onClick={handleModalOpen}>Add Member</Button>
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
          rows={members}
          columns={columns}
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
