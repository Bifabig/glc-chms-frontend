import React from 'react';
import moment from 'moment';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  Box,
  Chip, Stack, Typography, useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import MemberAttendance from './MemberAttendance';
import { tokens } from '../../theme';
// import styles from '../../styles/Attendances.module.css';

const Attendances = ({ programAttendance, programTeams, programId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 60,
      type: 'number',
      renderCell: (params) => (
        params.row.attributes.id
      ),
      filterable: false,
    },
    {
      field: 'member_name',
      headerName: 'Name',
      width: 200,
      type: 'string',
      valueGetter: (params) => params.row.attributes.member_name,
      renderCell: (valueReceived) => valueReceived.row.member_name,
    },
    {
      field: 'status',
      headerName: 'Satus',
      width: 200,
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
              <Chip label="Permission" color="secondary" />
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
      width: 200,
      type: 'string',
      valueGetter: (params) => params.row.attributes.remark,
      renderCell: (valueReceived) => valueReceived.row.remark,
    },
    {
      field: 'created_at',
      headerName: 'Date',
      type: 'Date',
      width: 130,
      valueGetter: (params) => moment(params.row.attributes.created_at).format('YYYY/MM/DD'),
      renderCell: (params) => moment(params.row.attributes.created_at).format('DD/MM/YYYY'),
    },
    {
      field: 'time',
      headerName: 'Time',
      type: 'Date',
      width: 130,
      valueGetter: (params) => moment(params.row.attributes.created_at).format('HH:mm:ss'),
      renderCell: (params) => moment(params.row.attributes.created_at).format('HH:mm:ss'),
    },
  ];

  return (
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
          {programAttendance && (
          <DataGrid
            rows={programAttendance}
            columns={columns}
            getRowId={(row) => row.id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            slots={{ toolbar: GridToolbar }}
            pageSizeOptions={[5, 10]}
          />
          )}
        </Box>
      </Box>
      <Box>
        <MemberAttendance
          programAttendance={programAttendance}
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
  programAttendance: PropTypes.arrayOf(
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
