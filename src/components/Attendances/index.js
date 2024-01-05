// import React from 'react';
import React, { useEffect } from 'react';
import moment from 'moment';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  Button,
} from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import InfoIcon from '@mui/icons-material/Info';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import MemberAttendance from './MemberAttendance';
import { createAttendance, getAttendances } from '../../redux/thunk';
// import { Link } from 'react-router-dom';
// import { createAttendance, getMembers } from '../../redux/thunk';
// import styles from '../../styles/Members.module.css';
// import NewMember from './NewMember';

const Attendances = ({ programTeams, programId }) => {
// const [modalOpen, setModalOpen] = useState(false);
  // const [newAttendance, setNewAttendance] = useState({});
  const {
    attendances, isLoading, error, errorMsg,
  } = useSelector((store) => store.attendances);
  const dispatch = useDispatch();

  const saveAttendance = ({
    name, status, remark, programId,
  }) => {
    const attendance = new FormData();
    attendance.append('attendance[member_name]', name);
    attendance.append('attendance[status]', status);
    attendance.append('attendance[remark]', remark);
    attendance.append('attendance[program_id]', programId);
    dispatch(createAttendance(attendance));
  };

  // const [anchorEl, setAnchorEl] = useState(null);
  // const [attendanceText, setAttendanceText] = useState('Attendance');
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = (e, row) => {
  //   e.stopPropagation();
  //   // console.log(row, e.currentTarget.dataset.myValue);
  //   const attendance = new FormData();
  //   attendance.append('attendance[member_name]', row.attributes.name);
  //   attendance.append('attendance[status]', e.currentTarget.dataset.myValue);
  //   attendance.append('attendance[remark]', 'good');
  //   attendance.append('attendance[program_id]', programId);

  //   dispatch(createAttendance(attendance));
  //   setAttendanceText(e.currentTarget.dataset.myValue);
  //   setAnchorEl(null);
  // };

  // const handleModalOpen = () => setModalOpen(true);
  // const handleModalClose = () => setModalOpen(false);

  // const handleDeleteMember = (e, id) => {
  //   e.stopPropagation();
  //   dispatch(deleteMember(id));
  // };

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
        if (valueReceived.row.attributes.status === 'Present') {
          return (
            <Button
              variant="contained"
              color="success"
              size="small"
            >
              Present
            </Button>
          );
        } if (valueReceived.row.attributes.status === 'Permission') {
          return (
            <Button
              variant="contained"
              color="secondary"
              size="small"
            >
              Permission
            </Button>
          );
        }
        return (
          <Button
            variant="contained"
            color="error"
            size="small"
          >
            Absent
          </Button>
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
    //   {
    //     field: 'photo_url',
    //     headerName: 'Photo',
    //     width: 80,
    //     sortable: false,
    //     renderCell: (params) => (
    //       <img
    //         src={params.row.attributes.photo_url}
    //         alt={params.row.attributes.name}
    //         className={styles.photo}
    //       />
    //     ),
    //     filterable: false,
    //   },
    //   {
    //     field: 'phone_number',
    //     headerName: 'Phone Number',
    //     width: 140,
    //     sortable: false,
    //     valueGetter: (params) => params.row.attributes.phone_number,
    //     renderCell: (params) => (
    //       params.row.attributes.phone_number
    //     ),
    //   },
    //   {
    //     field: 'detail',
    //     headerName: '',
    //     sortable: false,
    //     width: 100,
    //     renderCell: (params) => (
    //       <Link to={`/members/${params.row.attributes.id}`}>
    //         <Button
    //           variant="contained"
    //           size="small"
    //           startIcon={<InfoIcon />}
    //         >
    //           Detail
    //         </Button>
    //       </Link>
    //     ),
    //   },
    //   {
    //     field: 'attendance',
    //     headerName: '',
    //     sortable: false,
    //     width: 100,
    //     renderCell: (params) => (

    //       <>
    //         <Button
    //           id="basic-button"
    //           aria-controls={open ? 'basic-menu' : undefined}
    //           aria-haspopup="true"
    //           aria-expanded={open ? 'true' : undefined}
    //           onClick={handleClick}
    //         >
    //           {attendanceText}
    //         </Button>
    //         <Menu
    //           id="basic-menu"
    //           anchorEl={anchorEl}
    //           open={open}
    //           onClose={handleClose}
    //           MenuListProps={{
    //             'aria-labelledby': 'basic-button',
    //           }}
    //         >
    //           <MenuItem onClick={(e) => handleClose(e, params.row)}
    // data-my-value="Present">Present</MenuItem>
    //           <MenuItem onClick={handleClose} data-my-value="Permission">Permission</MenuItem>
    //           <MenuItem onClick={handleClose} data-my-value="Absent">Absent</MenuItem>
    //           {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
    //         </Menu>

  //       </>
  //     ),
  //   },
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
        saveAttendance={saveAttendance}
        // setNewAttendance={setNewAttendance}
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
