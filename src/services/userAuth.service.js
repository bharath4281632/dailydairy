export const checkAnonymously = userInfo => {
  if (!userInfo) return true;
  if (userInfo.email) return false;
  return true;
};
