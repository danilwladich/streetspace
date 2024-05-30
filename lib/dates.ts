export function getYearsDiff(firstDate: Date, secondDate: Date = new Date()) {
  const ageDifMs = firstDate.getTime() - secondDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1969);
}
