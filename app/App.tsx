import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastProvider } from "react-native-toast-notifications";
import { Home } from "./Home";
import { hotUpdateUrl } from './api-config.json'

export default function () {
  // useEffect(() => {
  //   fetch(hotUpdateUrl + `?runtime-version=app-1-0&platform=android`)
  //     .then(res => res.formData())
  //     .then(res => {
  //       console.log('请求 res', res)
  //     })
  // }, [])

  return <ToastProvider style={{ transform: [{ translateY: 40 }] }} placement={"top"}>
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: "#f2f2f2" }}>
        <Home/>
      </SafeAreaView>
      <StatusBar style="auto"/>
    </SafeAreaProvider>
  </ToastProvider>;
}

