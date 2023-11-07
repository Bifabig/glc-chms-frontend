import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Box, Button, Modal, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import getMembers from '../redux/thunk';
import styles from '../styles/Members.module.css';
import NewMember from './NewMember';

const Members = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { members, isLoading, error } = useSelector((store) => store.members);
  const dispatch = useDispatch();

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

  if (error) <h2>Something Went Wrong</h2>;

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <h1>Members</h1>
      <Button onClick={handleModalOpen}>Add Member</Button>
      <Modal
        className={styles.modal}
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%; -50%)',
          width: 400,
          border: '2px solid #000',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Member Form
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} component="div">
            <NewMember />
            {' '}
            <Button onClick={handleModalClose}>Close</Button>
          </Typography>
        </Box>
      </Modal>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Photo</TableCell>
                <TableCell align="right">Full Name</TableCell>
                <TableCell align="right">Phone Number</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Member Since</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member) => (
                <TableRow
                  key={member.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img src={member.photo} alt={member.name} className={styles.photo} />
                  </TableCell>
                  <TableCell align="right">{member.name}</TableCell>
                  <TableCell align="right">{member.phone_number}</TableCell>
                  <TableCell align="right">{member.address}</TableCell>
                  <TableCell align="right">{member.joined_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Members;
