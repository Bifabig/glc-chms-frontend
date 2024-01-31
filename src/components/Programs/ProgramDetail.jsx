import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Modal,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from '@mui/material';
// import { ArrowBack } from '@mui/icons-material';
import { fetchProgramDetail } from '../../redux/thunk';
import UpdateProgram from './UpdateProgram';
import Attendances from '../Attendances';
import { tokens } from '../../theme';
import Header from '../Header';
// import styles from '../../styles/Programs.module.css';

const ProgramDetail = () => {
  const { programId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    programDetail, isLoading, error, errorMsg,
  } = useSelector((store) => store.programs);

  // const navigate = useNavigate();
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // const goBack = () => {
  //   navigate(-1);
  // };

  useEffect(() => {
    dispatch(fetchProgramDetail(programId));
  }, [dispatch, programId]);

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
  return isLoading ? <span>Loading...</span> : programDetail && (
    <Box p={2}>
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
            Update Program
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <UpdateProgram programDetail={programDetail} />
            <Button onClick={handleModalClose}>Close</Button>
          </Typography>
        </Box>
      </Modal>
      <Box>

        <Header title="Program Detail" subtitle="Detailed information about Program" />
        <Button
          onClick={handleModalOpen}
          variant="contained"
          sx={{ background: colors.greenAccent[700], ':hover': { background: colors.greenAccent[600] } }}
          size="small"
        >
          <Typography>
            Update
          </Typography>
        </Button>
        <Box
          m="40px 0 0 0"
          height="100%"
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: colors.blueAccent[700] }}>
                <TableRow>
                  <TableCell><Typography>Event Name</Typography></TableCell>
                  <TableCell align="right"><Typography>Attendance Taker</Typography></TableCell>
                  <TableCell align="right"><Typography>Date</Typography></TableCell>
                  <TableCell align="right"><Typography>Church Name</Typography></TableCell>
                  <TableCell align="right"><Typography>Teams</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: colors.primary[400] }}>
                <TableRow
                  key={programDetail.attributes.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {programDetail.attributes.name}
                  </TableCell>
                  <TableCell align="right">
                    {
                      programDetail.attributes.attendance_taker === 'undefined'
                        ? 'N/A'
                        : `${programDetail.attributes.attendance_taker}`
                    }
                  </TableCell>
                  <TableCell align="right">{programDetail.attributes.date}</TableCell>
                  <TableCell align="right">
                    {programDetail.programChurch.map((church) => (
                      `${church.attributes.name} `
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {programDetail.programTeams.map((team) => (
                      <Typography key={team.id} variant="h8">
                        {team.attributes.name}
                      </Typography>
                    ))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Attendances
          programId={programDetail.id}
          programTeams={programDetail.programTeams}
          programAttendance={programDetail.programAttendance}
        />
      </Box>

    </Box>
  );
};

export default ProgramDetail;
