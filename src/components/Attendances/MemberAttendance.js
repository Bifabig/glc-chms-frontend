import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  Button, Menu, MenuItem,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getMembers } from '../../redux/thunk';
import styles from '../../styles/Members.module.css';

const MemberAttendance = ({
  saveAttendance, programTeams, programId,
}) => {
  const {
    members, isLoading, error, errorMsg,
  } = useSelector((store) => store.members);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [attendanceText, setAttendanceText] = useState('Attendance');
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e, row) => {
    e.stopPropagation();
    // const attendance = new FormData();
    // attendance.append('attendance[member_name]', row.attributes.name);
    // attendance.append('attendance[status]', e.currentTarget.dataset.myValue);
    // attendance.append('attendance[remark]', 'good');
    // attendance.append('attendance[program_id]', programId);

    // dispatch(createAttendance(attendance));
    // setNewAttendance(attendance);
    // saveAttendance(attendance);
    saveAttendance({
      name: row.attributes.name, status: e.currentTarget.dataset.myValue, remark: 'good', programId,
    });
    setAttendanceText(e.currentTarget.dataset.myValue);
    setAnchorEl(null);
  };

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
      field: 'name',
      headerName: 'Name',
      width: 200,
      type: 'string',
      valueGetter: (params) => params.row.attributes.name,
      renderCell: (valueReceived) => valueReceived.row.attributes.name,
    },
    {
      field: 'photo_url',
      headerName: 'Photo',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <img
          src={params.row.attributes.photo_url}
          alt={params.row.attributes.name}
          className={styles.photo}
        />
      ),
      filterable: false,
    },
    {
      field: 'phone_number',
      headerName: 'Phone Number',
      width: 140,
      sortable: false,
      valueGetter: (params) => params.row.attributes.phone_number,
      renderCell: (params) => (
        params.row.attributes.phone_number
      ),
    },
    {
      field: 'detail',
      headerName: '',
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Link to={`/members/${params.row.attributes.id}`}>
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
      field: 'attendance',
      headerName: '',
      sortable: false,
      width: 100,
      renderCell: (params) => (

        <>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            {attendanceText}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={(e) => handleClose(e, params.row)} data-my-value="Present">Present</MenuItem>
            <MenuItem onClick={handleClose} data-my-value="Permission">Permission</MenuItem>
            <MenuItem onClick={handleClose} data-my-value="Absent">Absent</MenuItem>
            {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
          </Menu>

        </>
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
    <div>
      <h2>Members</h2>
      <div style={{ height: 260, width: '100%' }}>
        {members.data && (
        <DataGrid
          rows={members.data.filter(
            (memberTeam) => programTeams.some(
              (programTeam) => memberTeam.relationships.teams.data.some(
                (data) => data.id === programTeam.id,
              ),
            ),
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
        />
        )}
      </div>
    </div>
  );
};

MemberAttendance.propTypes = {
  programTeams: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
    ]),
  ).isRequired,
  programId: PropTypes.string.isRequired,
  // setNewAttendance: PropTypes.func.isRequired,
  saveAttendance: PropTypes.func.isRequired,
};

export default MemberAttendance;
