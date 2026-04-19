import { NativeTabs } from "expo-router/unstable-native-tabs";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function AppTabs() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home1</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon>
          {({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          )}
        </NativeTabs.Trigger.Icon>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>Explore1</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon>
          {({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          )}
        </NativeTabs.Trigger.Icon>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
