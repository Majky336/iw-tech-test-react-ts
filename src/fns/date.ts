export const getFormattedDateFromDateString = (dateString?: string) => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear() % 2000;

  return `${day}/${month}/${year}`;
};
