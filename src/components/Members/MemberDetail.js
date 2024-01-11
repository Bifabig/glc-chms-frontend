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
import { fetchMemberDetail } from '../../redux/thunk';
import styles from '../../styles/Members.module.css';
import UpdateMember from './UpdateMember';

const MemberDetail = () => {
  const { memberId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    memberDetail, isLoading, error, errorMsg,
  } = useSelector((store) => store.members);

  const navigate = useNavigate();
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchMemberDetail(memberId));
  }, [dispatch, memberId]);

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
  return isLoading ? <span>Loading...</span> : memberDetail && (
    <div className={styles.memberDetailPage}>
      <Button
        onClick={goBack}
        variant="outlined"
        className={styles.backBtn}
        size="medium"
        startIcon={<ArrowBack />}
      />
      <div>
        <h2>Member Detail</h2>
        <Button
          onClick={handleModalOpen}
          variant="contained"
          // className={styles.updateBtn}
          size="small"
        >
          Update
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 250, minHeight: 50 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><h3>{memberDetail.attributes.name}</h3></TableCell>
                <TableCell align="right" sx={{ width: 300 }}><img src={memberDetail.attributes.photo_url} alt="member detail" className={styles.memberDetailImg} /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>Address</TableCell>
                <TableCell align="right">{memberDetail.attributes.address}</TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>Phone Number</TableCell>
                <TableCell align="right">{memberDetail.attributes.phone_number}</TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>Member Since</TableCell>
                <TableCell align="right">{memberDetail.attributes.joined_at}</TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>Church</TableCell>
                <TableCell align="right">
                  {memberDetail.memberChurch.map((church) => (
                    `${church.attributes.name}, `
                  ))}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>Teams</TableCell>
                <TableCell align="right">
                  {memberDetail.memberTeams.map((team) => (
                    `${team.attributes.name}, `
                  ))}

                </TableCell>
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
              <UpdateMember memberDetail={memberDetail} />
              {' '}
              <Button onClick={handleModalClose}>Close</Button>
            </Typography>
          </Box>
        </Modal>
      </div>

    </div>
  );
};

export default MemberDetail;
