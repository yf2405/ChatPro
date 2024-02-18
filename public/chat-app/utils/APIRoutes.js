export  const host = import.meta.env.VITE_BACKEND_URL;
const groupId = '123'; // ID del grupo
export  const registerRoute = `${host}/api/auth/register`;
export  const loginRoute = `${host}/api/auth/login`;
export  const setAvatarRoute = `${host}/api/auth/setAvatar`;
export  const allUsersRoute = `${host}/api/auth/allUsers`;
export  const sendMessageRoute = `${host}/api/messages/addmsg`;
export  const getAllMessageRoute = `${host}/api/messages/getmsg`;
export  const getAllMessageGroupRoute = `${host}/api/messages/getmsggroup`;
export const groupMessageRoute = `${host}/api/groups/${groupId}/messages`;


