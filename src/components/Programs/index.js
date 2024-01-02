import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Modal, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { deleteProgram, getPrograms } from '../../redux/thunk';
import NewProgram from './NewProgram';

const Programs = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    programs, isLoading, error, errorMsg,
  } = useSelector((store) => store.programs);

  const dispatch = useDispatch();
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleDeleteProgram = (e, id) => {
    e.stopPropagation();
    dispatch(deleteProgram(id));
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
      type: 'number',
      renderCell: (params) => (
        params.row.attributes.id
      ),
      filterable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      type: 'string',
      valueGetter: (params) => params.row.attributes.name,
      renderCell: (valueReceived) => valueReceived.row.attributes.name,
    },
    {
      field: 'attendance_taker',
      headerName: 'Attendance Taker',
      width: 200,
      type: 'string',
      valueGetter: (params) => (params.row.attributes.attendance_taker),
      renderCell: (valueReceived) => {
        if (valueReceived.row.attributes.attendance_taker === 'undefined') {
          return 'N/A';
        }
        return valueReceived.row.attributes.attendance_taker;
      },
    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'Date',
      width: 130,
      valueGetter: (params) => moment(params.row.attributes.date).format('YYYY/MM/DD'),
      renderCell: (params) => moment(params.row.attributes.date).format('DD/MM/YYYY'),
    },
    {
      field: 'detail',
      headerName: '',
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Link to={`/programs/${params.row.attributes.id}`}>
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
          onClick={(e) => handleDeleteProgram(e, params.row.attributes.id)}
        >
          Delete
        </Button>
      ),
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
              width: 500,
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
            rows={programs?.data}
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
