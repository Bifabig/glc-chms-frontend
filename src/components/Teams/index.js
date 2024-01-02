import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Modal, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { deleteTeam, getTeams } from '../../redux/thunk';
import NewTeam from './NewTeam';

const Teams = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    teams, isLoading, error, errorMsg,
  } = useSelector((store) => store.teams);

  const dispatch = useDispatch();
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleDeleteTeam = (e, id) => {
    e.stopPropagation();
    dispatch(deleteTeam(id));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 180 },
    {
      field: 'main_leader_name',
      headerName: 'Main Leader',
      width: 180,
    },
    {
      field: 'sub_leader_name',
      headerName: 'Sub Leader',
      width: 180,
    },
    {
      field: 'established_at',
      headerName: 'Established In',
      type: 'date',
      width: 100,
      valueFormatter: (params) => moment(params?.value).format('DD/MM/YYYY'),
    },
    {
      field: 'detail',
      headerName: '',
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Link to={`/teams/${params.id}`}>
          <Button
            variant="contained"
            size="small"
            startIcon={<InfoIcon />}
          >
            Detail
          </Button>
        </Link>
      ),
    },
    {
      field: 'delete',
      headerName: '',
      sortable: false,
      width: 110,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{ color: 'white', background: 'red', ':hover': { color: 'red', background: 'white' } }}
          size="small"
          startIcon={<DeleteIcon />}
          onClick={(e) => handleDeleteTeam(e, params.id)}
        >
          Delete
        </Button>
      ),
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
            width: 600,
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
