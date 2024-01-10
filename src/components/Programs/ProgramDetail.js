import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { fetchProgramDetail } from '../../redux/thunk';
import UpdateProgram from './UpdateProgram';
import Attendances from '../Attendances';

const ProgramDetail = () => {
  const { programId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    programDetail, isLoading, error, errorMsg,
  } = useSelector((store) => store.programs);

  const navigate = useNavigate();
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const goBack = () => {
    navigate(-1);
  };

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
    <div>
      <Button
        onClick={goBack}
        variant="outlined"
        // className={styles.backBtn}
        size="medium"
        startIcon={<ArrowBack />}
      />
      <Modal
        // className={styles.modal}
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
      <div>
        <h2>Program Detail</h2>
        <Button
          onClick={handleModalOpen}
          variant="contained"
          size="small"
        >
          Update
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Event Name</TableCell>
                <TableCell align="right">Attendance Taker</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Church Name</TableCell>
                <TableCell align="right">Teams</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
                    `${team.attributes.name}, `
                  ))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Attendances
          programId={programDetail.id}
          programTeams={programDetail.programTeams}
          programAttendance={programDetail.programAttendance}
        />
      </div>

    </div>
  );
};

export default ProgramDetail;
