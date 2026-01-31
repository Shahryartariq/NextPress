import { signOut } from "next-auth/react";

import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
// import { useState, useEffect } from 'react';

function UserProfile() {
  // const [isLoading, setIsLoading] = useState(true);


  // useEffect(() => {
  //   const securePage = async () => {
  //     const session = await getSession();
  //     if (!session) {
  //       window.location.href = '/auth/login';
  //     } else {
  //       setIsLoading(false);
  //     }
  //   }
  //   securePage();
  // }, []);

  // if (isLoading) {
  //   return <p style={{ textAlign: 'center' }}>Loading...</p>;
  // }

  async function changePasswordHandler(passwordData) {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    console.log(data);
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!');
    } else {
      signOut();
      
    }

  }



  return (
    <section className={classes.profile}>
      <h2>Your User Profile</h2>
      <ProfileForm onPasswordChange={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
