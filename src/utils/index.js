import { format } from "date-fns";

export function dateToString(date) {
  if (!date) {
    //  空文字を返す
    return "";
  }
  return format(date, "yyyy年M月d日 HH時mm分");
}

export function translateError(code) {
  // デフォルトのエラー（原因が特定できない場合）
  const error = { title: "エラー", description: "時間を置いてお試しください" };
  switch (code) {
    case "auth/invalid-email":
      error.description = "メールアドレスが不正です";
      break;
    case "auth/user-disabled":
      error.description = "アカウントが無効です";
      break;
    case "auth/user-not-found":
      error.description = "ユーザーが見つかりませんでした";
      break;
    case "auth/wrong-password":
      error.description = "パスワードが間違っています";
      break;
    // create user
    case "auth/email-already-in-use":
      error.description = "メールアドレスが使用されています";
      break;
    case "auth/operation-not-allowed":
      error.description = "開発者にお問合せください";
      break;
    case "auth/weak-password":
      error.description = "パスワードが簡単すぎます";
      break;

    default:
  }
  return error;
}
