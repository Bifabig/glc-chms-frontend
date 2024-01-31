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
import { fetchChurchDetail } from '../../redux/thunk';
import styles from '../../styles/Churches.module.css';
import UpdateChurch from './UpdateChurch';
import Header from '../Header';
import { tokens } from '../../theme';

const ChurchDetail = () => {
  const { churchId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    churchDetail, isLoading, error, errorMsg,
  } = useSelector((store) => store.churches);

  // const navigate = useNavigate();
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // const goBack = () => {
  //   navigate(-1);
  // };

  useEffect(() => {
    dispatch(fetchChurchDetail(churchId));
  }, [dispatch, churchId]);

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
  return isLoading ? <span>Loading...</span> : churchDetail && (
    <Box p={2}>
      <Header title="Church Detail" subtitle="Detailed information about church" />
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
                <TableCell>
                  <Typography>Church Name</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{churchDetail.name}</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: colors.primary[400] }}>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Typography>Location</Typography>
                </TableCell>
                <TableCell align="right"><Typography>{churchDetail.location}</Typography></TableCell>
              </TableRow>

              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell><Typography>Established In</Typography></TableCell>
                <TableCell align="right"><Typography>{churchDetail.established_at}</Typography></TableCell>
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
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Typography>
              Update Member
            </Typography>
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <UpdateChurch churchDetail={churchDetail} />
            {' '}
            <Button onClick={handleModalClose}>Close</Button>
          </Typography>
        </Box>
      </Modal>

    </Box>
  );
};

export default ChurchDetail;
