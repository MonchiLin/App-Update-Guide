import { useMemo, useState } from "react";
import { checkUpdateUrl } from "../api-config.json";
import { hotfixes, version } from "../version.json";
import { Platform } from "react-native";
import { UpdateController } from "./update-controller";
import { Version } from "./version";
import { useToast } from "react-native-toast-notifications";

export type UpdateResult = {
  platform: string
  hostingVersion: string
  hotUpdateVersion: string
}

export function useUpdate() {
  // 热更新检查结果
  const [hotUpdateResult, setHotUpdateResult] = useState<UpdateResult | null>(null);
  // 基座更新检查结果
  const [hostingUpdateResult, setHostingUpdateResult] = useState<UpdateResult | null>(null);
  const toast = useToast();

  // 检查更新
  const checkUpdate = async () => {
    const api1 = checkUpdateUrl + "/api/hot-update/" + Platform.select({
      android: "android",
      ios: "ios"
    }) + "/" + version;
    const api2 = checkUpdateUrl + "/api/latest-version/" + Platform.select({ android: "android", ios: "ios" });

    await fetch(api1)
      .then((response) => response.json())
      .then(res => {
        setHotUpdateResult(res);
      })
      .catch(err => {
        console.log(api1 + " 请求失败", err);
        toast.show("热更新检查失败, 检查 app/api-config.json 是否配置正确", { type: "danger" });
      });

    await fetch(api2)
      .then((response) => response.json())
      .then(res => {
        setHostingUpdateResult(res);
      })
      .catch(err => {
        console.log(api2 + " 请求失败", err);
        toast.show("基座更新检查失败, 检查 app/api-config.json 是否配置正确", { type: "danger" });
      });
    return Promise.resolve();
  };

  const hasHotUpdate = useMemo(() => {
    if (!hotUpdateResult) {
      return false;
    }
    return UpdateController.ShouldUpdate(
      version, Version.GetHotUpdateVersion(version, hotfixes),
      hotUpdateResult.hostingVersion, Version.GetHotUpdateVersion(version, Number(hotUpdateResult.hotUpdateVersion))
    );
  }, [hotUpdateResult]);

  const hasHostingUpdate = useMemo(() => {
    if (!hostingUpdateResult) {
      return false;
    }
    return UpdateController.ShouldUpdate(
      version, Version.GetHotUpdateVersion(version, hotfixes),
      hostingUpdateResult.hostingVersion, Version.GetHotUpdateVersion(version, Number(hostingUpdateResult.hotUpdateVersion))
    );
  }, [hostingUpdateResult]);

  return {
    hasHotUpdate,
    hasHostingUpdate,
    checkUpdate,
  };
}
