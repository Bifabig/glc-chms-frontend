import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import getMembers from '../redux/thunk';
import styles from '../styles/Members.module.css';

const Members = () => {
  const { members, isLoading, error } = useSelector((store) => store.members);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

  if (error) <h2>Something Went Wrong</h2>;

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <h1>Members</h1>
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
