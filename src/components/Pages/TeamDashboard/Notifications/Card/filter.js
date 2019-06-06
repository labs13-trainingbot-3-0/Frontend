export default ({ items, pagination, member_id }) => {
  const { offset, limit, setMax } = pagination;
  let filtered = items;
  if (member_id) {
    filtered = filtered.filter(
      ({ recipient_id: id }) => id === parseInt(member_id, 10)
    );
  }
  filtered.sort((a, b) =>
    a.send_date > b.send_date ? 1 : b.send_date > a.send_date ? -1 : 0
  );
  setMax(filtered.length);
  return filtered.filter(
    (_, i) => i >= offset && i < parseInt(offset, 10) + parseInt(limit, 10)
  );
};
