import React from "react";
import { Platform } from "react-native";

import AppTabs from "@/components/app-tabs";

export default function TabLayout() {
  const marging = Platform.OS === "android" ? 20 : 10;
  return <AppTabs style={{ margin: marging }} />;
}
