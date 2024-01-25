import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Modal, Typography, List, ListItem, ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { green } from '@mui/material/colors';
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

const Programs = () => {
  const [modalOpen, setModalOpen] = useState(false);
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
        <Box m="20px">
          Calendar
          <Box display="flex" justifyContent="space-between">
            {/* Calendar Sidebar */}
            <Box flex="1 1 20%" backgroundColor="grey" p="15px" borderRadius="4px">
              <Typography variant="h5">
                Events
              </Typography>

              <List>
                {/* {currentEvents.map((event) => ( */}
                {programs.data.map((event) => (
                  <ListItem key={event.attributes.id} sx={{ backgroundColor: green, margin: '10px 0', borderRadius: '2px' }}>
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
      </div>
    );
};

export default Programs;
