import { Version } from './version';

// 热更新的控制器
export class UpdateController {
  constructor() {

  }

  // 是否可以热更新
  static ShouldHotUpdate(currentVersion: string, latestVersion: string, reviewingVersion?: string): boolean {
    if (!currentVersion) {
      console.log("当前版本不存在, 不允许更新");
      return false;
    }

    if (!latestVersion) {
      console.log("最新版本不存在, 不允许更新");
      return false;
    }

    const current = new Version(currentVersion);
    const latest = new Version(latestVersion);
    const reviewing = reviewingVersion ? new Version(reviewingVersion) : new Version("0.0.0");

    if (current.equal(reviewing)) {
      console.log("当前版本处于审核中, 不允许更新");
      return false;
    }

    if (current.equal(latest)) {
      console.log("当前版本已是最新版, 不允许更新");
      return false;
    }

    if (reviewing.equal(latest)) {
      console.log("审核版本为最新版, 不允许更新");
      return false;
    }

    // 如果最新版本的 patch 或者 buildNumber 比当前版本大, 则允许热更新
    if ((latest.major === current.major) && (latest.minor === latest.minor) && (latest.patch > current.patch || latest.hotfixes > current.hotfixes)) {
      return true;
    }

    return false;
  }

  // 是否要进行基座更新
  static ShouldHostingUpdate(currentVersion: string, latestVersion: string, reviewingVersion?: string): boolean {
    if (!currentVersion) {
      return false;
    }

    if (!latestVersion) {
      return false;
    }

    const current = new Version(currentVersion);
    const latest = new Version(latestVersion);

    if (current.major < latest.major) {
      console.log("当前主版本小于最新版主版本号");
      return true;
    }

    if (current.major === latest.major && current.minor < latest.minor) {
      console.log("当前次版本小于最新版次版本号");
      return true;
    }

    return false;
  }
}
