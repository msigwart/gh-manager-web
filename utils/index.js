export const toPrettyDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = { year: 'numeric', month: 'long', day: 'numeric', minute: 'numeric', hour: 'numeric' };
  return `${date.toLocaleDateString(undefined, options)}`
}
