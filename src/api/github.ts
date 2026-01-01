export const fetchGithubUser = async (username: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/users/${username}`
  );

  if (!res.ok) throw new Error('User not fund');
  const data = await res.json();
  return data;
};

export const searchGithubUser = async (query: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/search/users?q=${query}`
  );

  if (!res.ok) throw new Error('User not fund');
  const data = await res.json();
  return data.items;
};

// Check if following user on githhub
export const checkIfFollowingUser = async (username: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`,
    {
      headers: {
        Authorazation: `Bearer ${import.meta.env.VITE_GITHHUB_API_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    }
  );

  if (res.status === 204) {
    return true;
  } else if (res.status === 404) {
    return false;
  } else {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData.message || 'Failed to check follow status');
  }
};
