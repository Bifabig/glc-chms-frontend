/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  Button, Modal, Box, Typography, Avatar, Chip, useTheme,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { createAttendance, getMembers } from '../../redux/thunk';
import { tokens } from '../../theme';

const MemberAttendance = ({
  programAttendance, programTeams, programId,
}) => {
  const {
    members, isLoading, error, errorMsg,
  } = useSelector((store) => store.members);
  const [modalOpen, setModalOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState({});
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      flex: 1,
      type: 'string',
      valueGetter: (params) => params.row.attributes.name,
      renderCell: (valueReceived) => (
        <Chip
          avatar={<Avatar alt="Natacha" src={valueReceived.row.attributes.photo_url} />}
          label={valueReceived.row.attributes.name}
          variant="outlined"
        />
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
              <Typography variant="h8">
                Detail
              </Typography>
            </Button>
          </Link>
        </Box>
      ),
    },
    {
      field: 'present',
      headerName: '',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        programAttendance.some(
          (attendance) => attendance.attributes.member_name === params.row.attributes.name,
        )
          ? (<BeenhereIcon color="success" />)
          : (

            <Box>
              <Button
                variant="contained"
                size="small"
                onClick={(e) => handleAttendancePresent(e, params)}
                sx={{ background: colors.greenAccent[600], ':hover': { background: colors.greenAccent[500] } }}
              >
                <Typography variant="h8">
                  Present
                </Typography>
              </Button>
            </Box>
          )
      ),
    },
    {
      field: 'permission',
      headerName: '',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        programAttendance.some(
          (attendance) => attendance.attributes.member_name === params.row.attributes.name,
        )
          ? ''
          : (
            <Box>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleModalOpen(params)}
                sx={{ background: colors.blueAccent[600], ':hover': { background: colors.blueAccent[500] } }}
              >
                <Typography variant="h8">
                  Permission
                </Typography>
              </Button>
            </Box>
          )
      ),
    },
    {
      field: 'absent',
      headerName: '',
      sortable: false,
      flex: 1,
      renderCell: (params) => (

        programAttendance.some(
          (attendance) => attendance.attributes.member_name === params.row.attributes.name,
        )
          ? ''
          : (
            <Box>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleModalOpen(params)}
                sx={{ background: colors.redAccent[600], ':hover': { background: colors.redAccent[500] } }}
              >
                <Typography variant="h8">
                  Absent
                </Typography>
              </Button>
            </Box>
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
    <Box>
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
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
      <Box>
        <Box m="20px 0">
          <Typography variant="h5">Attendees</Typography>
          <Typography variant="h6" sx={{ color: colors.greenAccent[400] }}>List of expected people at the program</Typography>
        </Box>
        <Box
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
        </Box>
      </Box>
    </Box>
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
