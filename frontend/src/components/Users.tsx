import React, { useState, useEffect, useCallback } from 'react';
import { getUsers } from '../services/api';
import '../styles/Users.scss';

interface User {
  name: string;
  id: number;
}

interface Paging {
  previous?: string;
  next?: string;
  totalResults: number;
}

interface UsersState {
  users: User[];
  paging: Paging;
  page: number;
  size: number;
  sort: string;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  paging: { totalResults: 0 },
  page: 1,
  size: 10,
  sort: '',
  loading: false,
  error: null
};

const Users = () => {
  const [state, setState] = useState<UsersState>(initialState);

  const fetchUsers = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await getUsers(state.page, state.size, state.sort);
      setState(prev => ({
        ...prev,
        users: response.users,
        paging: response.paging,
        loading: false
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: 'Failed to fetch users',
        loading: false
      }));
      console.error(err);
    }
  }, [state.page, state.size, state.sort]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSort = (field: string) => {
    setState(prev => ({
      ...prev,
      sort: field,
      page: 1
    }));
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(prev => ({
      ...prev,
      size: Number(e.target.value),
      page: 1
    }));
  };

  const handlePageChange = (newPage: number) => {
    setState(prev => ({
      ...prev,
      page: newPage
    }));
  };

  return (
    <div className="users-container">
      <h1>Users</h1>
      
      <div className="page-size-selector">
        <label>Page Size:</label>
        <select
          value={state.size}
          onChange={handlePageSizeChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {state.error && <div className="error-message">{state.error}</div>}

      {state.loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('name')}>
                    Name {state.sort === 'name' && '↓'}
                  </th>
                  <th onClick={() => handleSort('id')}>
                    ID {state.sort === 'id' && '↓'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {state.users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button
              onClick={() => handlePageChange(state.page - 1)}
              disabled={!state.paging.previous}
            >
              Previous
            </button>
            <span>Page {state.page}</span>
            <button
              onClick={() => handlePageChange(state.page + 1)}
              disabled={!state.paging.next}
            >
              Next
            </button>
          </div>
          <div className="total-results">
            Total Results: {state.paging.totalResults}
          </div>
        </>
      )}
    </div>
  );
};

export default Users; 