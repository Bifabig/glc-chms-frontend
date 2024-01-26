import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Modal, Typography, useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { deleteTeam, getTeams } from '../../redux/thunk';
import NewTeam from './NewTeam';
import Header from '../Header';
import { tokens } from '../../theme';

const Teams = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      flex: 1,
    },
    {
      field: 'sub_leader_name',
      headerName: 'Sub Leader',
      flex: 1,
    },
    {
      field: 'established_at',
      headerName: 'Established In',
      type: 'date',
      flex: 1,
      valueFormatter: (params) => moment(params?.value).format('DD/MM/YYYY'),
    },
    {
      field: 'detail',
      headerName: '',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Link to={`/teams/${params.id}`}>
            <Button
              variant="contained"
              size="small"
              startIcon={<InfoIcon />}
              sx={{ background: colors.greenAccent[700], ':hover': { background: colors.greenAccent[600] } }}
            >
              <Typography>
                Detail
              </Typography>
            </Button>
          </Link>
        </Box>
      ),
    },
    {
      field: 'delete',
      headerName: '',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            size="small"
            startIcon={<DeleteIcon />}
            sx={{ background: colors.redAccent[600], ':hover': { background: colors.redAccent[500] } }}
            onClick={(e) => handleDeleteTeam(e, params.id)}
          >
            <Typography>
              Delete
            </Typography>
          </Button>
        </Box>
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
    <Box p={2}>
      <Header title="Teams" subtitle="List of teams in a church" />
      <Button
        onClick={handleModalOpen}
        variant="contained"
        sx={{ background: colors.greenAccent[700], ':hover': { background: colors.greenAccent[600] } }}
      >
        <Typography>
          Add Team
        </Typography>
      </Button>
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
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
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
      </Box>
    </Box>
  );
};

export default Teams;
