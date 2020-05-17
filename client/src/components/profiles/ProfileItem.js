import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: { user, company, location, status, skills },
}) => {
  return (
    <div className='profile bg-light'>
      <img src={user.avatar} alt='' className='round-img' />
      <div>
        <h2>{user.name}</h2>
        <p>{`${status} at ${company}`}</p>
        <p>{location}</p>
        <Link to={`/profile/${user._id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li className='text-primary' key={index}>
            <i className='fas fa-check'></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
