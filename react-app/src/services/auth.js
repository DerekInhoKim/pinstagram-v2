export const authenticate = async() => {
  const response = await fetch('/api/auth/',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}

// Sends a rerquest to log a user in
export const login = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  // Will return the current user.to_dict()
  return await response.json();
}

// Sends a request to log a user out
export const logout = async () => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return await response.json();
};

// Sends a request to create a new user
export const signUp = async (fullname, username, email, password) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullname,
      username,
      email,
      password,
    }),
  });
  return await response.json();
}

// Sends a request update a user's info
export const editUser = async (fullname, username, about) => {
  const response = await fetch("/api/auth/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullname,
      username,
      about
    })
  })
  return await response.json()
}
