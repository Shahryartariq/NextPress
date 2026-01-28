import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  // Redirect away if NOT auth

  return (
    <section className={classes.profile}>
      <h2>Your User Profile</h2>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
