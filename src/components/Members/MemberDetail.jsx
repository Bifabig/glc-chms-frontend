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
import { fetchMemberDetail } from '../../redux/thunk';
import styles from '../../styles/Members.module.css';
import UpdateMember from './UpdateMember';
import { tokens } from '../../theme';
import Header from '../Header';

const MemberDetail = () => {
  const { memberId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    memberDetail, isLoading, error, errorMsg,
  } = useSelector((store) => store.members);

  // const navigate = useNavigate();
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // const goBack = () => {
  //   navigate(-1);
  // };

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
    <Box p={2}>

      <Header title="Member Detail" subtitle="Detailed information about member" />
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
        <TableContainer
          component={Paper}
        >
          <Table
            sx={{ minWidth: 250, minHeight: 50 }}
            aria-label="simple table"
          >
            <TableHead sx={{ backgroundColor: colors.blueAccent[700] }}>
              <TableRow>
                <TableCell>
                  <Typography variant="h5">{memberDetail.attributes.name}</Typography>
                </TableCell>
                <TableCell align="right" sx={{ width: 300 }}><img src={memberDetail.attributes.photo_url} alt="member detail" className={styles.memberDetailImg} /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: colors.primary[400] }}>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Typography>
                    Address
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    {memberDetail.attributes.address}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Typography>
                    Phone Number
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    {memberDetail.attributes.phone_number}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Typography>
                    Member Since
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    {memberDetail.attributes.joined_at}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Typography>
                    Church
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {memberDetail.memberChurch.map((church) => (
                    <Typography key={church.id}>
                      {church.attributes.name}
                    </Typography>
                  ))}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Typography>
                    Teams
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {memberDetail.memberTeams.map((team) => (
                    <Typography key={team.id}>
                      {team.attributes.name}
                    </Typography>
                  ))}

                </TableCell>
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
            bgcolor: colors.primary[500],
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
            <Box p={2}>
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  onClick={handleModalClose}
                  sx={{ background: colors.orangeAccent[700], ':hover': { background: colors.orangeAccent[600] }, mt: -4 }}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default MemberDetail;
