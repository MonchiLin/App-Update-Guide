import { StyleSheet, Text, View } from 'react-native';
import Lottie from "lottie-react-native";
import React, { useRef } from "react";
import { hotfixes, version } from "./version.json";
import { useUpdate } from "./lib/use-update";
import { ThemedButton } from "react-native-really-awesome-button";
import { useToast } from "react-native-toast-notifications";
import * as Updates from "expo-updates";
import * as DevClient from "expo-dev-client";

export function Home() {
  const ref = useRef<Lottie>();
  const updateState = useUpdate();
  const toast = useToast();
  const handleProgress = (release) => {
    updateState.checkUpdate()
      .then(() => {
        release();
      });
  };
  const handleUpdate = () => {
    if (updateState.hasHotUpdate) {
      if (DevClient.isDevelopmentBuild()) {
        return Promise.reject("Only support release app");
      }
      toast.show("检测到热更新, 开始更新...");
      return Updates.checkForUpdateAsync()
        .then(res => {
          if (res?.isAvailable) {
            return Updates.fetchUpdateAsync()
              .then(() => {
                toast.show("更新完成, 重启 app 生效", { type: "success" });
              });
          } else {
            return Promise.reject(res);
          }
        })
        .catch(err => {
          console.log("Error is", err);
          toast.show("未检查到更新资源, 检查 app/api-config hotUpdateUrl 是否正确", { type: "danger" });
        });
    }
    if (updateState.hasHostingUpdate) {
      toast.show("检测到基座更新, 下载最新版本");
      return Promise.resolve();
    }

    return Promise.reject();
  };

  // 可以更新, 或者可以热更新
  const canUpdate = updateState.hasHotUpdate || updateState.hasHostingUpdate;

  return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <View style={styles.container}>
      <Lottie
        ref={ref}
        loop
        autoPlay
        source={require('./assets/lolo.json')}
      />
    </View>

    <Text style={{ color: "#959595" }}>VersionCode: {version}</Text>
    <Text style={{ color: "#959595" }}>BuildNumber: {hotfixes}</Text>
    <View>
      <ThemedButton
        progress
        name="bruce"
        type="primary"
        onPress={handleProgress}
        style={{ marginTop: 30 }}
      >
        Check Update
      </ThemedButton>

      <ThemedButton
        name="bruce"
        type="danger"
        disabled={!canUpdate}
        style={{ marginTop: 10 }}
        onPressOut={handleUpdate}
      >
        {updateState.hasHotUpdate ? "Hot Update" : "Update"}
      </ThemedButton>
    </View>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    flex: 1,
  },
});
