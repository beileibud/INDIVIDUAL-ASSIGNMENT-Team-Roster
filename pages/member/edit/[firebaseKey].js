import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleMember } from '../../../api/memberData';
import MemberForm from '../../../components/form/MemberForm';

export default function EditMember() {
  const [editMember, setEditMember] = useState({});
  const router = useRouter();
  // grab the firebasekey
  const { firebaseKey } = router.query;

  // make a call to the API to get the member data
  useEffect(() => {
    getSingleMember(firebaseKey).then(setEditMember);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<MemberForm obj={editMember} />);
}
