const APP_TITLE = "streetspace";

export function getAppTitle(pageName: string = "", toLower: boolean = true) {
  if (toLower) {
    pageName = pageName.toLowerCase();
  }

  if (pageName) {
    return `${pageName} | ${APP_TITLE}`;
  }

  return APP_TITLE;
}
