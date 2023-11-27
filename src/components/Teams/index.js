import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Modal, Typography,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import moment from 'moment';
import { getTeams } from '../../redux/thunk';
import NewTeam from './NewTeam';

const Teams = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    teams, isLoading, error, errorMsg,
  } = useSelector((store) => store.teams);

  const dispatch = useDispatch();
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 240 },
    {
      field: 'main_leader_name',
      headerName: 'Main Leader',
      width: 200,
    },
    {
      field: 'sub_leader_name',
      headerName: 'Sub Leader',
      width: 200,
    },
    {
      field: 'established_at',
      headerName: 'Established In',
      type: 'date',
      width: 120,
      valueFormatter: (params) => moment(params?.value).format('DD/MM/YYYY'),
    },
  ];

  useEffect(() => {
    dispatch(getTeams());
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

  return isLoading ? <h2>Loading...</h2> : (
    <div>
      <h2>Teams</h2>
      <Button onClick={handleModalOpen} variant="contained">Add Team</Button>
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
            Team Form
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <NewTeam />
            {' '}
            <Button onClick={handleModalClose}>Close</Button>
          </Typography>
        </Box>
      </Modal>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={teams}
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

export default Teams;
