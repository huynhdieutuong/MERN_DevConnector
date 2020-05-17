import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile: { user, bio, skills } }) => {
  return (
    <div className='profile-about bg-light p-2'>
      <h2 className='text-primary'>{`${user.name.split(' ')[0]}'s Bio`}</h2>
      <p>{bio}</p>
      <div className='line'></div>
      <h2 className='text-primary'>Skill Set</h2>
      <div className='skills'>
        {skills.length > 0 &&
          skills.map((skill, index) => (
            <div key={index} className='p-1'>
              <i className='fas fa-check'></i> {skill}
            </div>
          ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
