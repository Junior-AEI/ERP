export function isValidDate(dateString: string) {
  if (!dateString) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}