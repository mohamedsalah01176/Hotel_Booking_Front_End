export function isdateDisable(date: Date, disable: (Date | string)[]) {
  return disable.some(d => {
    const current = typeof d === "string" ? new Date(d) : d;
    return (
      current.getFullYear() === date.getFullYear() &&
      current.getMonth() === date.getMonth() &&
      current.getDate() === date.getDate()
    );
  });
}
