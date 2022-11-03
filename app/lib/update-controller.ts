import { Version } from './version';

// 热更新的控制器
export class UpdateController {
  constructor() {

  }

  // 是否可以热更新
  static ShouldUpdate(clientVersion: string, clientHotUpdateVersion: number, latestVersion: string, latestHotUpdateVersion: number): boolean {
    if (!clientVersion) {
      console.log("当前版本不存在, 不允许更新");
      return false;
    }

    if (!latestVersion) {
      console.log("最新版本不存在, 不允许更新");
      return false;
    }

    const current = new Version(clientVersion, clientHotUpdateVersion);
    const latest = new Version(latestVersion, latestHotUpdateVersion);

    if (current.equal(latest)) {
      console.log("当前版本已是最新版, 不允许更新");
      return false;
    }

    // 如果最新版本的 patch 或者 buildNumber 比当前版本大, 则允许热更新
    if ((latest.major === current.major) && (latest.minor === latest.minor) && (latest.patch > current.patch || latest.hotfixes > current.hotfixes)) {
      return true;
    }

    return false;
  }

}
