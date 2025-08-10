import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Image,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import Icon from "../components/Icon";
import Button from "../components/Button";
import { useTheme } from "../contexts/themeContext";
import { commonStyles } from "../styles/commonStyles";

const platformIcons = {
  discord: require("assets/images/discord.png"),
  groupme: require("assets/images/groupme.png"),
  remind: require("assets/images/remind.png"),
  slack: require("assets/images/slack.png"),
};

export default function SettingsScreen() {
  const [platforms, setPlatforms] = useState([
    {
      id: "discord",
      name: "Discord",
      icon: "discord",
      connected: true,
      description: "Direct messages and server notifications",
    },
    {
      id: "groupme",
      name: "GroupMe",
      icon: "groupme",
      connected: true,
      description: "Personal and group messages",
    },
    {
      id: "remind",
      name: "Remind",
      icon: "remind",
      connected: false,
      description: "Educational announcements and assignments",
    },
    {
      id: "slack",
      name: "Slack",
      icon: "slack",
      connected: true,
      description: "Workplace messages and notifications",
    },
  ]);

  const { isDarkMode, toggleTheme, colors } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const togglePlatform = (platformId) => {
    try {
      console.log("Toggling platform:", platformId);
      setPlatforms((prev) =>
        prev.map((platform) =>
          platform.id === platformId
            ? { ...platform, connected: !platform.connected }
            : platform
        )
      );
    } catch (error) {
      console.error("Error toggling platform:", error);
    }
  };

  const connectedCount = platforms.filter((p) => p.connected).length;

  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.backgroundAlt,
    },
    backButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: colors.backgroundAlt,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
    placeholder: {
      width: 40,
    },
    content: {
      flex: 1,
    },
    scrollContainer: {
      padding: 16,
      paddingBottom: 32,
    },
    summaryCard: {
      backgroundColor: colors.backgroundAlt,
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.accent,
    },
    summaryHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    summaryIcon: {
      marginRight: 12,
      color: colors.accent,
    },
    summaryTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
    },
    summaryText: {
      fontSize: 16,
      color: colors.grey,
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
    },
    sectionDescription: {
      fontSize: 14,
      color: colors.grey,
      marginBottom: 16,
      lineHeight: 20,
    },
    platformCard: {
      backgroundColor: colors.backgroundAlt,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    platformInfo: {
      flex: 1,
    },
    platformHeader: {
      flexDirection: "row",
      alignItems: "center",
    },
    platformIcon: {
      marginRight: 12,
      color: colors.accent,
    },
    platformDetails: {
      flex: 1,
    },
    platformName: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 4,
    },
    platformDescription: {
      fontSize: 14,
      color: colors.grey,
      lineHeight: 18,
    },
    settingCard: {
      backgroundColor: colors.backgroundAlt,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    settingInfo: {
      flex: 1,
    },
    settingName: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 4,
    },
    settingDescription: {
      fontSize: 14,
      color: colors.grey,
      lineHeight: 18,
    },
    syncButton: {
      backgroundColor: colors.accent,
      marginBottom: 16,
    },
    clearButton: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: "#ff6b6b",
      borderRadius: 8,
      padding: 16,
      alignItems: "center",
    },
    clearButtonText: {
      color: "#ff6b6b",
      fontSize: 16,
      fontWeight: "600",
    },
    infoSection: {
      alignItems: "center",
      marginTop: 24,
      paddingTop: 24,
      borderTopWidth: 1,
      borderTopColor: colors.backgroundAlt,
    },
    infoText: {
      fontSize: 12,
      color: colors.grey,
      marginBottom: 4,
    },
  });

  return (
    <View
      style={[commonStyles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.settingCard}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingName}>Dark Mode</Text>
            <Text style={styles.settingDescription}>
              Switch between light and dark theme
            </Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.backgroundAlt, true: colors.accent }}
            thumbColor={isDarkMode ? colors.primary : colors.grey}
          />
        </View>
        {/* Connected Platforms Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Icon name="link-outline" size={24} style={styles.summaryIcon} />
            <Text style={styles.summaryTitle}>Connected Platforms</Text>
          </View>
          <Text style={styles.summaryText}>
            {connectedCount} of {platforms.length} platforms connected
          </Text>
        </View>

        {/* Platform Connections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Platform Connections</Text>
          <Text style={styles.sectionDescription}>
            Connect your messaging platforms to aggregate messages in one place
          </Text>
          {platforms.map((platform) => (
            <View key={platform.id} style={styles.platformCard}>
              <View style={styles.platformInfo}>
                <View style={styles.platformHeader}>
                  <Image
                    source={platformIcons[platform.icon]}
                    style={[styles.platformIcon, { width: 32, height: 32 }]}
                    resizeMode="contain"
                  />
                  <View style={styles.platformDetails}>
                    <Text style={styles.platformName}>{platform.name}</Text>
                    <Text style={styles.platformDescription}>
                      {platform.description}
                    </Text>
                  </View>
                </View>
              </View>
              <Switch
                value={platform.connected}
                onValueChange={() => togglePlatform(platform.id)}
                trackColor={{
                  false: colors.backgroundAlt,
                  true: colors.accent,
                }}
                thumbColor={platform.connected ? colors.primary : colors.grey}
              />
            </View>
          ))}
        </View>

        {/* General Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General Settings</Text>

          <View style={styles.settingCard}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>Push Notifications</Text>
              <Text style={styles.settingDescription}>
                Receive notifications for new messages
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.backgroundAlt, true: colors.accent }}
              thumbColor={notificationsEnabled ? colors.primary : colors.grey}
            />
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>Auto Sync</Text>
              <Text style={styles.settingDescription}>
                Automatically sync messages every 5 minutes
              </Text>
            </View>
            <Switch
              value={autoSync}
              onValueChange={setAutoSync}
              trackColor={{ false: colors.backgroundAlt, true: colors.accent }}
              thumbColor={autoSync ? colors.primary : colors.grey}
            />
          </View>
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <Button
            text="Sync All Messages Now"
            onPress={() => {
              console.log("Manual sync triggered");
              // In a real app, this would trigger a sync
            }}
            style={styles.syncButton}
          />

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear All Messages</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>Message Aggregator v1.0.0</Text>
          <Text style={styles.infoText}>Built with React Native & Expo</Text>
        </View>
      </ScrollView>
    </View>
  );
}
