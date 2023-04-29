import React from 'react';
import MemberForm from '../../components/form/MemberForm';

// TODO: create a reusable form to add/edit book and render in this view

export default function AddMember() {
  return (
    <>
      <h1 style={{ color: 'white' }}>Add a Member</h1>
      <MemberForm />
    </>
  );
}
