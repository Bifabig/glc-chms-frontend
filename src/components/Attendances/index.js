import React, { useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import moment from 'moment/moment';
// import {
//   Button,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import InfoIcon from '@mui/icons-material/Info';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getMembers } from '../../redux/thunk';
import styles from '../../styles/Members.module.css';
// import NewMember from './NewMember';

const Attendances = () => {
  // const [modalOpen, setModalOpen] = useState(false);
  const {
    members, isLoading, error, errorMsg,
  } = useSelector((store) => store.members);
  const dispatch = useDispatch();

  // const handleModalOpen = () => setModalOpen(true);
  // const handleModalClose = () => setModalOpen(false);

  // const handleDeleteMember = (e, id) => {
  //   e.stopPropagation();
  //   dispatch(deleteMember(id));
  // };

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
      width: 200,
      type: 'string',
      valueGetter: (params) => params.row.attributes.name,
      renderCell: (valueReceived) => valueReceived.row.attributes.name,
    },
    {
      field: 'photo_url',
      headerName: 'Photo',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <img
          src={params.row.attributes.photo_url}
          alt={params.row.attributes.name}
          className={styles.photo}
        />
      ),
      filterable: false,
    },
    // {
    //   field: 'address',
    //   headerName: 'Address',
    //   width: 160,
    //   type: 'string',
    //   valueGetter: (params) => params.row.attributes.address,
    //   renderCell: (params) => (
    //     params.row.attributes.address
    //   ),
    // },
    {
      field: 'phone_number',
      headerName: 'Phone Number',
      width: 140,
      sortable: false,
      valueGetter: (params) => params.row.attributes.phone_number,
      renderCell: (params) => (
        params.row.attributes.phone_number
      ),
    },
    // {
    //   field: 'joined_at',
    //   headerName: 'Member Since',
    //   type: 'Date',
    //   width: 130,
    //   valueGetter: (params) => moment(params.row.attributes.joined_at).format('YYYY/MM/DD'),
    //   renderCell: (params) => moment(params.row.attributes.joined_at).format('DD/MM/YYYY'),
    // },
    // {
    //   field: 'detail',
    //   headerName: '',
    //   sortable: false,
    //   width: 100,
    //   renderCell: (params) => (
    //     <Link to={`/members/${params.row.attributes.id}`}>
    //       <Button
    //         variant="contained"
    //         size="small"
    //         startIcon={<InfoIcon />}
    //       >
    //         Detail
    //       </Button>
    //     </Link>
    //   ),
    // },
    // {
    //   field: 'delete',
    //   headerName: '',
    //   sortable: false,
    //   width: 110,
    //   renderCell: (params) => (
    //     <Button
    //       variant="contained"
    //       sx={{ color: 'white', background: 'red',
    // ':hover': { color: 'red', background: 'white' } }}
    //       size="small"
    //       startIcon={<DeleteIcon />}
    //       onClick={(e) => handleDeleteMember(e, params.row.attributes.id)}
    //     >
    //       Delete
    //     </Button>
    //   ),
    // },
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
    <div>
      <h2>Attendance</h2>
      {/* <Button onClick={handleModalOpen} variant="contained">Add Member</Button>
      <Modal
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
            Member Form
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <NewMember />
            <Button onClick={handleModalClose}>Close</Button>
          </Typography>
        </Box>
      </Modal> */}
      <div style={{ height: 260, width: '100%' }}>
        {members && (
        <DataGrid
          rows={members?.data}
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
      </div>
    </div>
  );
};

export default Attendances;
