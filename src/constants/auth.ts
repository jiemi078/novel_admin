export const isAuthEnabled = () => {
  return process.env.UMI_APP_AUTH_ENABLED === 'true';
};
