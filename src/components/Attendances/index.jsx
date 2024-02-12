import React, { useEffect } from 'react';
import moment from 'moment';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  Box,
  Button,
  Chip, Stack, Typography, useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import MemberAttendance from './MemberAttendance';
import { tokens } from '../../theme';
import { deleteAttendance, getAttendances } from '../../redux/thunk';

const Attendances = ({ programTeams, programId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const {
    attendances, isLoading, error, errorMsg,
  } = useSelector((store) => store.attendances);

  const handleDeleteMember = (e, id) => {
    e.stopPropagation();
    dispatch(deleteAttendance(id));
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      type: 'number',
      renderCell: (params) => (
        params.row.attributes.id
      ),
      filterable: false,
    },
    {
      field: 'member_name',
      headerName: 'Name',
      flex: 1,
      type: 'string',
      valueGetter: (params) => params.row.attributes.member_name,
      renderCell: (valueReceived) => valueReceived.row.member_name,
    },
    {
      field: 'status',
      headerName: 'Satus',
      flex: 1,
      type: 'string',
      valueGetter: (params) => params.row.attributes.status,
      renderCell: (valueReceived) => {
        if (valueReceived.row.attributes.status === 'present') {
          return (
            <Stack direction="row" spacing={1}>
              <Chip label="Present" color="success" />
            </Stack>
          );
        } if (valueReceived.row.attributes.status === 'permission') {
          return (
            <Stack direction="row" spacing={1}>
              <Chip label="Permission" color="secondary" style={{ color: 'white', background: colors.blueAccent[500] }} />
            </Stack>
          );
        }
        return (
          <Stack direction="row" spacing={1}>
            <Chip label="Absent" color="error" />
          </Stack>
        );
      },
    },
    {
      field: 'remark',
      headerName: 'Remark',
      flex: 1,
      type: 'string',
      valueGetter: (params) => params.row.attributes.remark,
      renderCell: (valueReceived) => valueReceived.row.remark,
    },
    {
      field: 'created_at',
      headerName: 'Date',
      type: 'Date',
      flex: 1,
      valueGetter: (params) => moment(params.row.attributes.created_at).format('YYYY/MM/DD'),
      renderCell: (params) => moment(params.row.attributes.created_at).format('DD/MM/YYYY'),
    },
    {
      field: 'time',
      headerName: 'Time',
      type: 'Date',
      flex: 1,
      valueGetter: (params) => moment(params.row.attributes.created_at).format('HH:mm:ss'),
      renderCell: (params) => moment(params.row.attributes.created_at).format('HH:mm:ss'),
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
            startIcon={<Delete />}
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
    dispatch(getAttendances());
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
      <Box>
        <Box>
          <Box m="20px 0">
            <Typography variant="h5">Attendance</Typography>
            <Typography variant="h6" sx={{ color: colors.greenAccent[400] }}>Attendance List</Typography>
          </Box>
          <Box sx={{
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
            {attendances && (
            <DataGrid
              rows={attendances?.data.filter(
                (attendance) => attendance.relationships.program.data.id === programId,
              )}
              columns={columns}
              getRowId={(row) => row.id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              slots={{ toolbar: GridToolbar }}
              pageSizeOptions={[5, 10]}
              autoHeight
            />
            )}
          </Box>
        </Box>
        <Box>
          <MemberAttendance
            programAttendance={attendances?.data.filter(
              (attendance) => attendance.relationships.program.data.id === programId,
            )}
            programTeams={programTeams}
            programId={programId}
          />
        </Box>
      </Box>
    );
};
Attendances.propTypes = {
  programTeams: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
    ]),
  ).isRequired,
  programId: PropTypes.string.isRequired,
};

export default Attendances;
