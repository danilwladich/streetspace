export function parseJsonFromFormData(
  formData: FormData,
): Record<string, unknown> {
  const json: { [k: string]: unknown } = {};

  formData.forEach((value, name) => {
    if (name.includes("[]")) {
      json[name.split("[]")[0]] = formData.getAll(name);
      return;
    }

    if (value instanceof File) {
      json[name] = value;
      return;
    }

    json[name] = JSON.parse(value);
  });

  return json;
}

export function parseFormDataFromJson(json: {
  [k: string]: unknown;
}): FormData {
  const formData = new FormData();

  for (const key in json) {
    const value = json[key];

    if (!json[key]) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        formData.append(key + "[]", item);
      }
      continue;
    }

    if (value instanceof File) {
      formData.append(key, value);
      continue;
    }

    formData.append(key, JSON.stringify(value));
  }

  return formData;
}
