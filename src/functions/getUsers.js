import React from 'react';

export function getUser(users, userId) {
  const user = users.find((user) => {
    return user.id === Number(userId);
  });
  return user;
}
