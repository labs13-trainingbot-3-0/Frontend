import moment from "moment";

export default ({ items, pagination, filters, member_id }) => {
  const { offset, limit, setMax } = pagination;
  const currentDate = new Date();
  const currentDateInMS = moment(currentDate).format("X");

  let filtered = items;
  if (member_id) {
    filtered = filtered.filter(
      ({ recipient_id: id }) => id === parseInt(member_id, 10)
    );
  }
  filtered = filtered.filter(({ name, is_sent, send_date }) => {
    const sendDateInMS = moment(send_date)
      .add(1, "hours")
      .format("X");
    if (
      // (filters.status === "pending" && !is_sent) ||
      // (filters.status === "sent" && is_sent)
      currentDateInMS - sendDateInMS >=
      0
    ) {
      return filters.service === "all" ? true : name === filters.service;
    } else return false;
  });
  filtered.sort((a, b) =>
    a.send_date > b.send_date ? 1 : b.send_date > a.send_date ? -1 : 0
  );
  setMax(filtered.length);
  return filtered.filter(
    (_, i) => i >= offset && i < parseInt(offset, 10) + parseInt(limit, 10)
  );
};

// const currentDate = new Date();
// const formattedSendDate = moment(send_date)
//   .add(1, "hours")
//   .format("MMMM Do");
// const currentDateInMS = moment(currentDate).format("X");
// const sendDateInMS = moment(send_date)
//   .add(1, "hours")
//   .format("X");
// const mathDate = currentDateInMS - sendDateInMS;
