import { format } from "date-fns";

export function dateToString(date) {
  if (!date) {
    //  空文字を返す
    return "";
  }
  return format(date, "yyyy年M月d日 HH時mm分");
}
