// import React from 'react';
import React, { useEffect } from 'react';
import moment from 'moment';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  Chip, Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import MemberAttendance from './MemberAttendance';
import { getAttendances } from '../../redux/thunk';

const Attendances = ({ programTeams, programId }) => {
  const {
    attendances, isLoading, error, errorMsg,
  } = useSelector((store) => store.attendances);
  const dispatch = useDispatch();

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

  // eslint-disable-next-line implicit-arrow-linebreak
  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <>
      <h2>Attendance</h2>
      <div style={{ height: 260, width: '100%' }}>
        {attendances.data && (
        <DataGrid
          rows={attendances.data}
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
      </div>
      <MemberAttendance
        programTeams={programTeams}
        programId={programId}
      />
    </>
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
