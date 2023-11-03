import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getMembers from '../redux/thunk';

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
        {members.map((member) => (
          <div key={member.id}>
            <img src={member.photo} alt={member.name} />
            <h2>
              Name:
              {' '}
              {member.name}
            </h2>
            <h2>
              Phone Number:
              {' '}
              {member.phone_number}
            </h2>
            <h2>
              Address:
              {' '}
              {member.address}
            </h2>
            <h2>
              Join Date:
              {' '}
              {member.joined_at}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
