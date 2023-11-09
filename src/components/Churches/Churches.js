import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  Box, Button, Modal, Typography,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { getChurches } from '../../redux/thunk';
import NewChurch from './NewChurch';

const Churches = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { churches, isLoading, error } = useSelector((store) => store.churches);
  const dispatch = useDispatch();

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 240 },
    {
      field: 'location',
      headerName: 'Location',
      width: 180,
    },
    {
      field: 'established_at',
      headerName: 'Established In',
      type: 'date',
      width: 180,
      valueFormatter: (params) => moment(params?.value).format('DD/MM/YYYY'),
    },
  ];

  useEffect(() => {
    dispatch(getChurches());
  }, [dispatch]);

  if (error) <span>Something Went Wrong</span>;

  return isLoading ? <p>Loading...</p>
    : (
      <div>
        <h2>Churches</h2>
        <Button onClick={handleModalOpen} variant="contained">Add Church</Button>
        <Modal
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
              Church Form
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              component="div"
            >
              <NewChurch />
              {' '}
              <Button onClick={handleModalClose}>Close</Button>
            </Typography>
          </Box>
        </Modal>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={churches}
            columns={columns}
            getRowId={() => uuidv4()}
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

export default Churches;
