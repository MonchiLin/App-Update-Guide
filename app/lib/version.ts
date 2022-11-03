export class Version {
  public major: number;
  public minor: number;
  public patch: number;
  public hotfixes: number;
  public buildNumber: number;

  constructor(version: string, hotfixes: number = 0) {
    const [majorStr, minorStr, patchStr] = version.split(".");
    const major = Number(majorStr);
    const minor = Number(minorStr);
    const patch = Number(patchStr);
    this.major = major;
    this.minor = minor;
    this.patch = patch;
    this.hotfixes = hotfixes;
    this.buildNumber = Version.GetHotUpdateVersion(version, 0);
  }

  static isVersion(version: string, splitor = ".") {
    const [majorStr, minorStr, patchStr] = version.split(splitor);
    const major = Number(majorStr);
    const minor = Number(minorStr);
    const patch = Number(patchStr);
    return !isNaN(major) && !isNaN(minor) && !isNaN(patch);
  }

  static GetHotUpdateVersion(version: string, hotfixes = 0) {
    let [majorStr, minorStr, patchStr] = version.split(".");
    const major = Number(majorStr);
    const minor = Number(minorStr);
    const patch = Number(patchStr);

    return (major * 1000000) + (minor * 10000) + (patch * 100 + hotfixes);
  }

  static FromHotUpdateVersion(hotUpdateVersion: number) {
    const major = Number.parseInt((hotUpdateVersion / 1000000).toString());
    const minor = Number.parseInt(((hotUpdateVersion - major * 1000000) / 10000).toString());
    const patch = Number.parseInt(((hotUpdateVersion - major * 1000000 - minor * 10000)).toString());

    return new Version(major + "." + minor + "." + patch)
  }

  toString() {
    return `${this.major}.${this.minor}.${this.patch}+${this.hotfixes}`
  }

  static GreaterThan(a: Version, b: Version) {
    if (a.major > b.major) {
      return true;
    }
    if (a.major < b.major) {
      return false;
    }
    if (a.minor > b.minor) {
      return true;
    }
    if (a.minor < b.minor) {
      return false;
    }
    if (a.patch > b.patch) {
      return true;
    }
    if (a.patch < b.patch) {
      return false;
    }
    if (a.hotfixes > b.hotfixes) {
      return true;
    }
    if (a.hotfixes < b.hotfixes) {
      return false;
    }
    return false;
  }

  greaterThan(a: Version) {
    return Version.GreaterThan(this, a)
  }

  equal(a: Version) {
    return this.major === a.major
      && this.minor === a.minor
      && this.patch === a.patch
      && this.hotfixes === a.hotfixes;
  }

}
