import { ConfigContext, ExpoConfig } from '@expo/config';
import { version, patch } from './version.json'

function getVersionObject(version: string, patchIncrease: number = 0) {
  let [majorStr, minorStr, patchStr] = version.split(".");
  const major = Number(majorStr);
  const minor = Number(minorStr);
  const patch = Number(patchStr);

  return {
    major,
    minor,
    patch: patch + patchIncrease,
  }
}

function getBuildNumber(version: string, patchIncrease: number = 0) {
  let [majorStr, minorStr, patchStr] = version.split(".");
  const major = Number(majorStr);
  const minor = Number(minorStr);
  const patch = Number(patchStr);

  return (major * 1000000) + (minor * 10000) + (patch * 100 + patchIncrease);
}

export const buildNumber = getBuildNumber(version, patch);
export const versionObject = getVersionObject(version, patch);

const configs = {
  updateURL: "http://localhost:3000/api/manifest",
  packageName: "com.kiki.example.update",
  runtimeVersion: "app" + "-" + versionObject.major + "-" + versionObject.minor
}

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    name: "UpdateApp",
    slug: "update-app",
    version: version,
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0,
      // If the target is android, the URL should be 10.0.2.2
      // ref: https://stackoverflow.com/questions/5528850/how-do-you-connect-localhost-in-the-android-emulator
      url: configs.updateURL,
    },
    // It will be app-1-1 or app-1-2 or app-2-0 etc..
    runtimeVersion: configs.runtimeVersion,
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      bundleIdentifier: configs.packageName,
      buildNumber: buildNumber.toString(),
      supportsTablet: true
    },
    android: {
      package: configs.packageName,
      versionCode: buildNumber,
      adaptiveIcon: {
        foregroundImage: "./assets/ic_launcher_foreground.png",
        backgroundColor: "#FFFFFF"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    }
  };
}
