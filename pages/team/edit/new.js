import React from 'react';
import TeamForm from '../../../components/form/TeamForm';

// TODO: create a reusable form to add/edit book and render in this view

export default function AddTeam() {
  return (
    <>
      <h1 style={{ color: 'white' }}>Add a Team</h1>
      <TeamForm />
    </>
  );
}
