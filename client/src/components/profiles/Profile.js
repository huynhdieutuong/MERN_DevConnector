import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getProfileById } from '../../redux/actions/profile';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({ match, profile: { loading, profile }, getProfileById }) => {
  useEffect(() => {
    getProfileById(match.params.id);
    // eslint-disable-next-line
  }, []);

  if (!profile || loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Link to='/profiles' className='btn'>
        Back To Profiles
      </Link>

      <div className='profile-grid my-1'>
        <ProfileTop profile={profile} />

        <ProfileAbout profile={profile} />

        <ProfileExperience experience={profile.experience} />

        <ProfileEducation education={profile.education} />

        <ProfileGithub username={profile.githubusername} />
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
