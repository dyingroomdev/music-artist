// path: frontend/src/lib/formatters.ts
const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric"
});

export const formatDate = (dateString: string): string => {
  return dateFormatter.format(new Date(dateString));
};

export const formatTime = (timeString?: string | null): string | null => {
  if (!timeString) return null;
  const [hourStr, minuteStr] = timeString.split(":");
  const date = new Date();
  date.setHours(Number(hourStr), Number(minuteStr), 0, 0);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
};

export const truncate = (text: string, max: number): string => {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1)}…`;
};
