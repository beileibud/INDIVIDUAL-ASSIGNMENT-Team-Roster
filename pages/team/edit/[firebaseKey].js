import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTeam } from '../../../api/teamData';
import TeamForm from '../../../components/form/MemberForm';

export default function EditTeam() {
  const [editMember, setEditTeam] = useState({});
  const router = useRouter();
  // grab the firebasekey
  const { firebaseKey } = router.query;

  // make a call to the API to get the member data,[firebaseKey] is dependency array in useEffect
  useEffect(() => {
    getSingleTeam(firebaseKey).then(setEditTeam);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<TeamForm obj={editMember} />);
}
