const APP_TITLE = "streetspace";

export function getAppTitle(pageName: string = "") {
  if (pageName) {
    return `${pageName} | ${APP_TITLE}`;
  }

  return APP_TITLE;
}
