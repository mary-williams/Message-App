import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { colors } from "../styles/commonStyles";
import Icon from "./Icon";
import { useTheme } from "../contexts/themeContext";

const platforms = [
  { id: "all", name: "All", icon: "apps" },
  { id: "discord", name: "Discord", icon: "chatbubbles" },
  { id: "groupme", name: "GroupMe", icon: "location" },
  { id: "remind", name: "Remind", icon: "notifications" },
  { id: "slack", name: "Slack", icon: "briefcase" },
];

export default function FilterBar({ selectedPlatform, onPlatformChange }) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.backgroundAlt,
    },
    section: {
      marginBottom: 8,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
      marginHorizontal: 16,
    },
    filterScroll: {
      paddingHorizontal: 16,
    },
    filterChip: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.backgroundAlt,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 8,
      borderWidth: 1,
      borderColor: colors.backgroundAlt,
    },
    filterChipActive: {
      backgroundColor: colors.accent,
      borderColor: colors.accent,
    },
    filterIcon: {
      color: colors.grey,
      marginRight: 6,
    },
    filterIconActive: {
      color: "white",
    },
    filterText: {
      fontSize: 14,
      color: colors.grey,
      fontWeight: "500",
    },
    filterTextActive: {
      color: "white",
      fontWeight: "600",
    },
  });

  return (
    <View style={styles.container}>
      {/* Platform Filters */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filter by Platform</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {platforms.map((platform) => (
            <TouchableOpacity
              key={platform.id}
              style={[
                styles.filterChip,
                selectedPlatform === platform.id && styles.filterChipActive,
              ]}
              onPress={() => onPlatformChange(platform.id)}
            >
              <Icon
                name={platform.icon}
                size={16}
                style={[
                  styles.filterIcon,
                  selectedPlatform === platform.id && styles.filterIconActive,
                ]}
              />
              <Text
                style={[
                  styles.filterText,
                  selectedPlatform === platform.id && styles.filterTextActive,
                ]}
              >
                {platform.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
