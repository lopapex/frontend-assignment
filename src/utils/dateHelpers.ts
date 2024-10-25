export const formatDate = (date: Date, language = navigator.language) => {
  let formatter;

  const getFormatter = (specificLanguage: string) => new Intl.DateTimeFormat(specificLanguage, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  try {
    formatter = getFormatter(language);
  } catch (error) {
    formatter = getFormatter('en-US');
  }

  return formatter.format(date);
};