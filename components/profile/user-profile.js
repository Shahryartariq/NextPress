import { getSession } from 'next-auth/react';

import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { useState, useEffect } from 'react';

function UserProfile() {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (!session) {
        window.location.href = '/auth/login';
      } else {
        setIsLoading(false);
      }
    }
    securePage();
  }, []);

  if (isLoading) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  }

  

  return (
    <section className={classes.profile}>
      <h2>Your User Profile</h2>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
