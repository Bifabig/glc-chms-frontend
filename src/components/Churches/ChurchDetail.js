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
import { fetchChurchDetail } from '../../redux/thunk';
import styles from '../../styles/Churches.module.css';
import UpdateChurch from './UpdateChurch';

const ChurchDetail = () => {
  const { churchId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    churchDetail, isLoading, error, errorMsg,
  } = useSelector((store) => store.churches);

  const navigate = useNavigate();
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const goBack = () => {
    navigate(-1);
  };

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
    <div className={styles.churchDetailPage}>
      <Button
        onClick={goBack}
        variant="outlined"
        className={styles.backBtn}
        size="medium"
        startIcon={<ArrowBack />}
      />
      <div>
        <h2>Church Detail</h2>
        <Button
          onClick={handleModalOpen}
          variant="contained"
          // className={styles.updateBtn}
          size="small"
        >
          Update
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450, minHeight: 50 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Church Name</TableCell>
                <TableCell align="right">{churchDetail.name}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>Location</TableCell>
                <TableCell align="right">{churchDetail.location}</TableCell>
              </TableRow>

              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>Established In</TableCell>
                <TableCell align="right">{churchDetail.established_at}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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
              Update Member
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
      </div>
    </div>
  );
};

export default ChurchDetail;
