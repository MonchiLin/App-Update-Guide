export class Version {
  major!: number;
  minor!: number;
  patch!: number;
  buildNumber!: number;

  constructor(version: string, separator = "+") {
    try {
      const [v, b] = version.split(separator);
      let [majorStr, minorStr, patchStr] = v.split(".");
      const major = Number(majorStr);
      const minor = Number(minorStr);
      const patch = Number(patchStr);
      const buildNumber = b ? Number(b) : Version.GetBuilderNumber(version);

      this.major = major;
      this.minor = minor;
      this.patch = patch;
      this.buildNumber = buildNumber;
    } catch (e) {

    }
  }

  static GetBuilderNumber(version: string, patchIncrease = 0) {
    let [majorStr, minorStr, patchStr] = version.split(".");
    const major = Number(majorStr);
    const minor = Number(minorStr);
    const patch = Number(patchStr);

    return (major * 1000000) + (minor * 10000) + (patch * 100 + patchIncrease);
  }

  static FromBuilderNumber(buildNumber: number) {
    const major = Number.parseInt((buildNumber / 1000000).toString());
    const minor = Number.parseInt(((buildNumber - major * 1000000) / 10000).toString());
    const patch = Number.parseInt(((buildNumber - major * 1000000 - minor * 10000)).toString());

    return new Version(major + "." + minor + "." + patch)
  }

  toString() {
    return `${this.major}.${this.minor}.${this.patch}+${this.buildNumber}`
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
    if (a.buildNumber > b.buildNumber) {
      return true;
    }
    if (a.buildNumber < b.buildNumber) {
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
      && this.buildNumber === a.buildNumber;
  }

}
