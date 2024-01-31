import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Modal, Typography, List, ListItem, ListItemText, useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { formatDate } from '@fullcalendar/core';
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { deleteProgram, getPrograms } from '../../redux/thunk';
import NewProgram from './NewProgram';
import { tokens } from '../../theme';
import Header from '../Header';

const Programs = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    programs, isLoading, error, errorMsg,
  } = useSelector((store) => store.programs);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleDeleteProgram = (e, id) => {
    e.stopPropagation();
    dispatch(deleteProgram(id));
  };

  const handleEventClick = (e) => {
    // console.log(e.event._def.publicId);
    // e.stopPropagation();
    // dispatch(deleteProgram(id));
    // eslint-disable-next-line no-underscore-dangle
    navigate(`/programs/${e.event._def.publicId}`);
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
      flex: 1,
      type: 'string',
      valueGetter: (params) => params.row.attributes.name,
      renderCell: (valueReceived) => valueReceived.row.attributes.name,
    },
    {
      field: 'attendance_taker',
      headerName: 'Attendance Taker',
      flex: 1,
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
      flex: 1,
      valueGetter: (params) => moment(params.row.attributes.date).format('YYYY/MM/DD'),
      renderCell: (params) => moment(params.row.attributes.date).format('DD/MM/YYYY'),
    },
    {
      field: 'detail',
      headerName: '',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Link to={`/programs/${params.row.attributes.id}`}>
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
            onClick={(e) => handleDeleteProgram(e, params.id)}
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
      <Box p={2}>
        <Header title="Programs" subtitle="List of programs in a church" />
        <Button
          onClick={handleModalOpen}
          variant="contained"
          sx={{ background: colors.greenAccent[700], ':hover': { background: colors.greenAccent[600] } }}
        >
          <Typography>
            Add Program
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
        </Box>
        <Box m="20px">
          <Box display="flex" justifyContent="space-between">
            {/* Calendar Sidebar */}
            <Box flex="1 1 20%" backgroundColor={colors.primary[400]} p="15px" borderRadius="4px">
              <Typography variant="h5">
                Events
              </Typography>

              <List>
                {programs.data.map((event) => (
                  <ListItem key={event.attributes.id} sx={{ backgroundColor: colors.orangeAccent[600], margin: '10px 0', borderRadius: '2px' }}>
                    <ListItemText
                      primary={event.attributes.name}
                      secondary={(
                        <Typography>
                          {formatDate(event.attributes.date, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}

                        </Typography>
                  )}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            {/* Calendar */}
            <Box flex="1 1 100%" ml="15px">
              <FullCalendar
                height="75vh"
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
                }}
                initialView="dayGridMonth"
                editable
                selectable
                selectMirror
                dayMaxEvents
                // select={handleDateClick}
                select={handleModalOpen}
                // eventClick={handleEventClick}
                eventClick={(event) => handleEventClick(event)}
                // eventsSet={(event) => setCurrentEvents(event)}
                initialEvents={programs.data.map((program) => (
                  {
                    id: program.attributes.id,
                    title: program.attributes.name,
                    date: program.attributes.date,
                  }
                ))}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    );
};

export default Programs;
