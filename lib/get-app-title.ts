const APP_TITLE = "2rnik";

export function getAppTitle(pageName: string = "") {
  if (pageName) {
    return `${pageName} | ${APP_TITLE}`;
  }

  return APP_TITLE;
}
