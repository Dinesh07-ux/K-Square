interface User {
  name: string;
  id: number;
}

interface Paging {
  previous?: string;
  next?: string;
  totalResults: number;
}

interface UsersResponse {
  users: User[];
  paging: Paging;
}

const API_BASE_URL = 'http://localhost:6001/api';

export const getUsers = async (
  page: number = 1,
  size: number = 10,
  sort?: string
): Promise<UsersResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    ...(sort && { sort }),
  });

  const response = await fetch(`${API_BASE_URL}/users?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}; 