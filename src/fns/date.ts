export const getFormattedDateFromDateString = (dateString?: string) => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  return `${date.getDay()}/${date.getMonth()}/${date.getFullYear() % 1000}`;
};
