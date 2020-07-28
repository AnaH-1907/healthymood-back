import React, { useState, useEffect } from 'react';
import useResourceCollection from '../hooks/useResourceCollection';
import useFormData from '../hooks/useFormData';
import { EditOutlined } from '@ant-design/icons';
import '../Styles/Form.css';
import { Link } from 'react-router-dom';
import API from '../services/API';
import '../Styles/Users.css';

function Users () {
  const initialForm = ({ is_admin: false, blocked: false });
  const { fields, setFields, handleFieldChange } = useFormData(initialForm);
  const { saveResource, newResourceSaveError, collection: UsersToShow, fetchCollectionError: fetchError } = useResourceCollection('/users');
  const [isVisible, setIsvisible] = useState(false);

  const [users, setUsers] = useState([UsersToShow]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const usersPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const pageNumbers = [];

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await API.get('/users?per_page=' + usersPerPage + '&page=' + currentPage);
      setUsers(res.data.data);
      setTotalUsers(res.data.total);
      setLoading(false);
    };
    fetchUsers();
  }, [currentPage, UsersToShow]);

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) { pageNumbers.push(i); }
  if (loading) { return <h2>Loading...</h2>; }

  const SaveUser = async (event) => {
    event.preventDefault();
    saveResource(fields, { optimistic: false });
    setFields({ is_admin: false, blocked: false });
    setIsvisible(!isVisible);
  };
  const fillForm = async user => {
    setIsvisible(true);
    setFields(user);
  };
  if (fetchError) {
    return (
      <div>
        <p className='errorText'>Une erreur s'est produite lors de la récupération des Utilisateurs.</p>
      </div>
    );
  }
  if (!UsersToShow) return 'Chargement...';
  function RenderList () {
    return (
      <>

        <h2 style={{ marginTop: '20px' }}>Utilisateurs</h2>

        <table className='Render-list'>
          <thead>
            <tr className='first-tr'>
              <td>Pseudo</td>
              <td>Adresse de messagerie</td>
              <td>Administrateur</td>
              <td>Autorisé/Bloqué</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {users.map(u => {
              return (
                <tr key={u.id}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.is_admin ? 'Oui' : 'Non'}</td>
                  <td>{u.blocked ? 'Bloqué' : 'Autorisé'}</td>
                  <td>
                    <EditOutlined className='edit-icon' onClick={() => fillForm(u)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav>
          <ul className='pagination'>
            {pageNumbers.map(number => (<li key={number}><Link onClick={() => paginate(number)} to='#' className='page-link'>{number}</Link></li>))}
          </ul>
        </nav>
      </>
    );
  }
  return (
    <>

      {isVisible &&
        <div className='form-top'>
          <form className='form-inline' onSubmit={SaveUser}>
            <div style={{ margin: '10px' }}><h3>Admin</h3></div>
            <label className='switch'>
              <input
                className='input-form-all'
                required
                type='checkbox'
                name='is_admin'
                id='is_admin'
                placeholder='Role'
                checked={fields.is_admin}
                onChange={handleFieldChange}
              />
              <div className='slider' />
            </label>
            <div style={{ margin: '10px' }}><h3>Autorisé/Bloqué</h3></div>
            <label className='switch'>
              <input
                className='input-form-all'
                required
                type='checkbox'
                name='blocked'
                id='blocked'
                placeholder='bloqué ? '
                checked={fields.blocked}
                onChange={handleFieldChange}
              />
              <div className='slider' />
            </label>

            <button
              className='form-button'
              onClick={SaveUser}
            >
              Enregistrer
            </button>
            {newResourceSaveError && (
              <p className='errorText'>Une erreur a la récuperation des Utilisateurs</p>
            )}
          </form>
        </div>}
      {RenderList()}
    </>
  );
}

export default Users;
