export default function access(
  initialState:
    | { currentUser?: API.CurrentUser; permissions?: Set<string> }
    | undefined,
) {
  const { currentUser } = initialState ?? {};
  const permissions = initialState?.permissions || new Set<string>();
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    hasPermi: (perm: string | string[]) => {
      const values = Array.isArray(perm) ? perm : [perm];
      return values.some((value) => permissions.has(value) || permissions.has('*:*:*'));
    },
  };
}
