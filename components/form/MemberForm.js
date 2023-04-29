import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createMember, updateMember } from '../../api/memberData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  image: '',
  name: '',
  role: '',
  team: '',
  details: '',
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput)
        .then(() => router.push('/member'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/member');
        });
      });
    }
  };

  return (
    <>
      <Form className="text-white" onSubmit={handleSubmit}>
        {/* First Name INPUT  */}
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={formInput.name}
            placeholder="Name"
            name="name"
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Image  */}
        <Form.Group controlId="formImage" className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Image URL"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Role  */}
        <Form.Group className="mb-3" controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            placeholder="Role"
            value={formInput.role}
            name="role"
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Team  */}
        <Form.Group className="mb-3" controlId="formRole">
          <Form.Label>Team</Form.Label>
          <Form.Control
            type="text"
            placeholder="Team"
            value={formInput.team}
            name="team"
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Detials  */}
        <Form.Group className="mb-3" controlId="formRole">
          <Form.Label>Details</Form.Label>
          <Form.Control
            type="text"
            placeholder="details"
            value={formInput.details}
            name="details"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default MemberForm;

MemberForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    team: PropTypes.string,
    details: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};
