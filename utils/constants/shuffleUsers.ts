export function shuffleUser(users: any[], numItems: number) {
  if (users.length < numItems) {
    return users;
  }

  const newArray = [];
  for (let i = 0; i < numItems; i++) {
    const index = Math.floor(Math.random() * users.length);
    newArray.push(users[index]);
  }
  return newArray;
}
