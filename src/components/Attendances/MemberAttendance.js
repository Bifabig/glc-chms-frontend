/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  Button, Modal, Box, Typography,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { createAttendance, getMembers } from '../../redux/thunk';
import styles from '../../styles/Members.module.css';

const MemberAttendance = ({
  programAttendance, programTeams, programId,
}) => {
  const {
    members, isLoading, error, errorMsg,
  } = useSelector((store) => store.members);
  const [modalOpen, setModalOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState({});
  const dispatch = useDispatch();

  const form = useForm();
  const {
    register, handleSubmit, formState,
  } = form;
  const { errors } = formState;

  const handleModalOpen = (params) => {
    setModalOpen(true);
    setAttendanceData(params);
  };
  const handleModalClose = () => setModalOpen(false);

  const onSubmit = (data) => {
    const attendance = new FormData();
    attendance.append('attendance[member_name]', attendanceData.row.attributes.name);
    attendance.append('attendance[status]', attendanceData.field);
    attendance.append('attendance[remark]', data.remark);
    attendance.append('attendance[program_id]', programId);
    dispatch(createAttendance(attendance));
  };
  const handleAttendancePresent = (e, params) => {
    e.stopPropagation();
    const attendance = new FormData();
    attendance.append('attendance[member_name]', params.row.attributes.name);
    attendance.append('attendance[status]', params.field);
    attendance.append('attendance[remark]', '-');
    attendance.append('attendance[program_id]', programId);
    dispatch(createAttendance(attendance));
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
      field: 'present',
      headerName: '',
      sortable: false,
      width: 100,
      renderCell: (params) => (
        programAttendance.some(
          (attendance) => attendance.attributes.member_name === params.row.attributes.name,
        )
          ? (<BeenhereIcon color="success" />)
          : (
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={(e) => handleAttendancePresent(e, params)}
            >
              Present
            </Button>
          )
      ),
    },
    {
      field: 'permission',
      headerName: '',
      sortable: false,
      width: 100,
      renderCell: (params) => (
        programAttendance.some(
          (attendance) => attendance.attributes.member_name === params.row.attributes.name,
        )
          ? ''
          : (
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => handleModalOpen(params)}
            >
              Permission
            </Button>
          )
      ),
    },
    {
      field: 'absent',
      headerName: '',
      sortable: false,
      width: 100,
      renderCell: (params) => (
        programAttendance.some(
          (attendance) => attendance.attributes.member_name === params.row.attributes.name,
        )
          ? ''
          : (
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => handleModalOpen(params)}
            >
              Absent
            </Button>
          )
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
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Remark
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
              <textarea
                type="text"
                id="remark"
                {...register('remark', {
                  required:
                    {
                      value: true,
                      message: 'Remark is required',
                    },
                })
                }
                placeholder="Remark"
                className="inputField"
              />
              <span className="errorMsg">{ errors.name?.message }</span>
              <div className="submitBtn">
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                >
                  Add Remark
                </Button>
              </div>
              <Button onClick={handleModalClose}>Close</Button>
            </form>
          </Typography>
        </Box>
      </Modal>
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

export default MemberAttendance;
