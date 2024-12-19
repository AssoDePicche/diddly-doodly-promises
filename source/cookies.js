export class Cookies {
  static contains(name) {
    if (!document.cookie) {
      return null;
    }

    const cookies = document.cookie.split('; ');

    const pattern = encodeURIComponent(name) + '=';

    for (const cookie of cookies) {
      if (cookie.startsWith(pattern)) {
        return decodeURIComponent(cookie.slice(pattern.length));
      }
    }

    return null;
  }

  static add(name, data, days = 0) {
    let expires = '';

    if (days > 0) {
      const date = new Date();

      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

      expires = ';expires=' + date.toUTCString();
    }

    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(data) + expires + '; path=/';
  }

  static remove(name) {
    if (!this.contains(name)) {
      return;
    }

    document.cookie = encodeURIComponent(name) + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
  }
};
