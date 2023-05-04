export function convertTime(newsEpoch) {
  let dateObj = new Date(newsEpoch * 1000);
  let date = dateObj.toLocaleDateString("en-GB"); // english format dd/mm/yyyy
  let time = dateObj.toLocaleTimeString("it-IT"); // italian format 13:10:34 --- in EN viene 1:10:34 PM

  let HumanDateProv = "" + date + " " + time;

  let HumanDate = HumanDateProv.slice(0, -3);

  return HumanDate;
}
