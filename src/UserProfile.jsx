import styles from './UserProfile.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(null);

  async function fetchUser() {
    const id = Math.floor(Math.random() * 10) + 1;

    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      setStatus(response.status);
      setUser(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  function handleClick() {
    setStatus(null);
    fetchUser();
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (!status) {
    return <p className={styles.profile_load}>Loading...</p>;
  }

  return (
    <div className={styles.profile_container}>
      <div className={styles.img_container}></div>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <button className={styles.btn_load} onClick={handleClick}>
        Load New User
      </button>
    </div>
  );
}

export default UserProfile;
