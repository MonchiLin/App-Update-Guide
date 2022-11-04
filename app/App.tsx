import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, ToastAndroid } from 'react-native';
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastProvider } from "react-native-toast-notifications";
import { Home } from "./Home";
import { hotUpdateUrl } from './api-config.json'

export default function () {
  useEffect(() => {
    // fetch(hotUpdateUrl + `?runtime-version=app-1-0&platform=android`)
    //   .then(res => res.formData())
    //   .then(res => {
    //     ToastAndroid.show("1 ok", ToastAndroid.LONG)
    //   })
    //   .catch(err => {
    //     ToastAndroid.show("1 fail", ToastAndroid.LONG)
    //   })
    // fetch((hotUpdateUrl.replace("http://192.168.31.35:3000", "http://10.0.2.2:3000")) + `?runtime-version=app-1-0&platform=android`)
    //   .then(res => res.formData())
    //   .then(res => {
    //     ToastAndroid.show("2 ok", ToastAndroid.LONG)
    //   })
    //   .catch(err => {
    //     ToastAndroid.show("2 fail", ToastAndroid.LONG)
    //   })
    // fetch((hotUpdateUrl.replace("http://192.168.31.35:3000", "http://localhost:3000")) + `?runtime-version=app-1-0&platform=android`)
    //   .then(res => res.formData())
    //   .then(res => {
    //     ToastAndroid.show("3 ok", ToastAndroid.LONG)
    //   })
    //   .catch(err => {
    //     ToastAndroid.show("3 fail", ToastAndroid.LONG)
    //   })
  }, [])

  return <ToastProvider style={{ transform: [{ translateY: 40 }] }} placement={"top"}>
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: "#f2f2f2" }}>
        <Home/>
      </SafeAreaView>
      <StatusBar style="auto"/>
    </SafeAreaProvider>
  </ToastProvider>;
}

