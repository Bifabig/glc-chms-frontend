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
import { fetchTeamDetail } from '../../redux/thunk';
import styles from '../../styles/Churches.module.css';
import UpdateTeam from './UpdateTeam';
import Header from '../Header';
import { tokens } from '../../theme';

const TeamDetail = () => {
  const { teamId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    teamDetail, isLoading, error, errorMsg,
  } = useSelector((store) => store.teams);

  // const navigate = useNavigate();
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // const goBack = () => {
  //   navigate(-1);
  // };

  useEffect(() => {
    dispatch(fetchTeamDetail(teamId));
  }, [dispatch, teamId]);

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
  return isLoading ? <span>Loading...</span> : teamDetail && (
    <Box p={2}>
      <Header title="Team Detail" subtitle="Detailed information about Team" />
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
        height="75vh"
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450, minHeight: 50 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: colors.blueAccent[700] }}>
              <TableRow>
                <TableCell><Typography>Team Name</Typography></TableCell>
                <TableCell align="right"><Typography>{teamDetail.name}</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: colors.primary[400] }}>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell><Typography>Main Leader Name</Typography></TableCell>
                <TableCell align="right"><Typography>{teamDetail.main_leader_name}</Typography></TableCell>
              </TableRow>

              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell><Typography>Sub Leader Name</Typography></TableCell>
                <TableCell align="right"><Typography>{teamDetail.sub_leader_name}</Typography></TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell><Typography>Established In</Typography></TableCell>
                <TableCell align="right"><Typography>{teamDetail.established_at}</Typography></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Modal
        className={styles.modal}
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            left: '19%',
            transform: 'translate(-50%; -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Team
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <UpdateTeam teamDetail={teamDetail} />
            <Button onClick={handleModalClose}>Close</Button>
          </Typography>
        </Box>
      </Modal>

    </Box>
  );
};

export default TeamDetail;
