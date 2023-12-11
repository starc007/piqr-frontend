export const debounce = (func: any, delay: number) => {
  let debounceTimer: NodeJS.Timeout;
  return function (this: any, ...args: any) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export const arrayCompare = (_arr1: string[], _arr2: string[]) => {
  if (
    !Array.isArray(_arr1) ||
    !Array.isArray(_arr2) ||
    _arr1.length !== _arr2.length
  ) {
    return false;
  }

  // .concat() to not mutate arguments
  const arr1 = _arr1.concat().sort();
  const arr2 = _arr2.concat().sort();

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
};

export const validUsername = (username: string) => {
  const re = /^[a-zA-Z0-9]+$/;
  return re.test(username);
};

export * from "./constants";

export function urlify(text: string) {
  const urlRegex1 = /(https?:\/\/[^\s]+)/g;
  const urlRegex2 = /(www.[^\s]+)/g;

  if (urlRegex1.test(text)) {
    return text.replace(urlRegex1, function (url) {
      //check if in the end of the url there is a dot or comma
      const lastChar = url[url.length - 1];
      if (lastChar === "." || lastChar === ",") {
        url = url.slice(0, -1);
      }
      return (
        '<a target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" href="' +
        formatURL(url) +
        '">' +
        url +
        "</a>"
      );
    });
  }

  if (urlRegex2.test(text)) {
    return text.replace(urlRegex2, function (url) {
      const lastChar = url[url.length - 1];
      if (lastChar === "." || lastChar === ",") {
        url = url.slice(0, -1);
      }
      if (!url.startsWith("https")) {
        url = "https://" + url;
      }
      return (
        '<a target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" href="' +
        formatURL(url) +
        '">' +
        url +
        "</a>"
      );
    });
  }

  return text;
}

export const moneyFormatter = (val: number | string): string => {
  if (!isFinite(Number(val))) {
    console.error("Input is not a finite number");
  }

  const numberString = String(val); // Convert the number to a string
  const parts = numberString.split("."); // Split the string into integer and decimal parts

  // Format the integer part with commas as thousands separators
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Rejoin the integer and decimal parts
  const formattedNumber = parts.join(".");

  return formattedNumber;
};

export const getUserLocation: () => Promise<
  { city: string; country: string } | false
> = async () => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    const loc = {
      city: data.city,
      country: data.country_name,
    };
    return loc;
  } catch (error) {
    return false;
  }
};

export function formatURL(url: string) {
  // Remove leading and trailing spaces
  url = url.trim();

  // Check if the URL starts with "http://" or "https://"
  if (!/^(https?:\/\/)/i.test(url)) {
    // If not, add "https://" to the beginning
    url = "https://" + url;
  }

  // Clean up multiple slashes and hashes after the protocol
  url = url.replace(/(https?:\/\/)\/+/i, "$1");

  return url;
}

export const formatText = (text: string, words: number) => {
  // if character length is less than words, return the text
  if (text.length <= words) {
    return text;
  } else {
    // else return the text with the words and an ellipsis
    return text.slice(0, words) + "...";
  }
};
