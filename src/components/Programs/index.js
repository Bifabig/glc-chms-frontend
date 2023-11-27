import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Modal, Typography,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getPrograms } from '../../redux/thunk';
import NewProgram from './NewProgram';

const Programs = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    programs, isLoading, error, errorMsg,
  } = useSelector((store) => store.programs);

  const dispatch = useDispatch();
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 240 },
    { field: 'team_id', headerName: 'Team ID', width: 240 },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      width: 120,
      valueFormatter: (params) => moment(params?.value).format('DD/MM/YYYY'),
    },
  ];

  useEffect(() => {
    dispatch(getPrograms());
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

  return isLoading ? <h2>Loading...</h2>
    : (
      <div>
        <h2>Programs</h2>
        <Button onClick={handleModalOpen} variant="contained">Add Program</Button>
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
              Program Form
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              component="div"
            >
              <NewProgram />
              {' '}
              <Button onClick={handleModalClose}>Close</Button>
            </Typography>
          </Box>
        </Modal>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={programs}
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

export default Programs;
