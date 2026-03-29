export class Utils {
  /**
   * Returns true if the URL starts with the given path, which can be a string, an array of strings, or a regular expression.
   * @param url
   * @param path
   * @returns boolean
   */
  public static urlStartsWith(url: string, path: string | string[] | RegExp): boolean {
    if (Array.isArray(path)) return path.some((p) => Utils.urlStartsWith(url, p));
    if (path instanceof RegExp) return path.test(url);
    // For the `/` path
    if (path.length === 1) return path.at(-1) === path;

    return url.startsWith(path);
  }
}
