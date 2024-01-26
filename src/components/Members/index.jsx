import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import moment from 'moment/moment';
import {
  Box, Button, Modal, Typography, Chip, Avatar, useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMembers, deleteMember } from '../../redux/thunk';
import NewMember from './NewMember';
import { tokens } from '../../theme';
import Header from '../Header';

const Members = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    members, isLoading, error, errorMsg,
  } = useSelector((store) => store.members);
  const dispatch = useDispatch();

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleDeleteMember = (e, id) => {
    e.stopPropagation();
    dispatch(deleteMember(id));
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      type: 'number',
      renderCell: (params) => (
        params.row.attributes.id
      ),
      filterable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      type: 'string',
      flex: 1,
      valueGetter: (params) => params.row.attributes.name,
      renderCell: (valueReceived) => (
        <Chip
          avatar={<Avatar alt="Natacha" src={valueReceived.row.attributes.photo_url} />}
          label={valueReceived.row.attributes.name}
          variant="outlined"
        />
      ),
      cellClassName: 'name-column--cell',
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
      type: 'string',
      valueGetter: (params) => params.row.attributes.address,
      renderCell: (params) => (
        params.row.attributes.address
      ),
    },
    {
      field: 'phone_number',
      headerName: 'Phone Number',
      flex: 1,
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
      flex: 1,
      valueGetter: (params) => moment(params.row.attributes.joined_at).format('YYYY/MM/DD'),
      renderCell: (params) => moment(params.row.attributes.joined_at).format('DD/MM/YYYY'),
    },
    {
      field: 'detail',
      headerName: '',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Link to={`/members/${params.row.attributes.id}`}>
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
            onClick={(e) => handleDeleteMember(e, params.row.attributes.id)}
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
    <Box p={2}>
      <Header title="Members" subtitle="Managing church members" />
      <Button
        onClick={handleModalOpen}
        variant="contained"
        sx={{ background: colors.greenAccent[700], ':hover': { background: colors.greenAccent[600] } }}
      >
        <Typography>
          Add Member
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
            left: '19%',
            transform: 'translate(-50%; -50%)',
            width: 600,
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
        {members && (
        <DataGrid
          rows={members?.data}
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
        )}
      </Box>
    </Box>
  );
};

export default Members;
