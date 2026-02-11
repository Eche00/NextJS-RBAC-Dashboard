"use client";

import React, { useState } from 'react';
import { migrateUsersToCollection } from '@/utils/Migration';
import '@/styles/MigrateUsers.css'; 

// * THIS HELPS YOU TRANSFER AND MIGRATE TO A NEW DB COLLECTION
const MigrateUsersButton = () => {
  const [originCollection, setOriginCollection] = useState('users');
  const [targetCollection, setTargetCollection] = useState('geeks');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleMigration = async () => {
    try {
      setIsLoading(true);
      setMessage('');

      const result = await migrateUsersToCollection(originCollection, targetCollection);
      setMessage(result.message);
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again later.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="migrate-users-container">

      <div className="migration-fields">
        <label>
          Origin Collection
          <input
            type="text"
            value={originCollection}
            onChange={(e) => setOriginCollection(e.target.value)}
            placeholder="Enter origin collection"
          />
        </label>

        <label>
          Target Collection
          <input
            type="text"
            value={targetCollection}
            onChange={(e) => setTargetCollection(e.target.value)}
            placeholder="Enter target collection"
          />
        </label>
      </div>

      <span className="migrate-btn" onClick={handleMigration} disabled={isLoading}>
        {isLoading
          ? `Migrating from ${originCollection} to ${targetCollection}...`
          : 'Migrate Users'}
      </span>

      {message && <p className="migration-message">{message}</p>}
    </div>
  );
};

export default MigrateUsersButton;
