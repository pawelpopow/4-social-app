import React from 'react';

export function isFriend(id1, id2, users) {
  
  const user1 = users.find((user) => {
    return user.id === Number(id1);
  });

  const isFriend = user1.friends.find((friend) => {
    if(friend === Number(id2)) {
      return true;
    }
    return false;
  });

  if(isFriend) {
    return true;
  }
  return false;
}
