import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "./Icon";
import { useTheme } from "../contexts/themeContext";
import { commonStyles } from "../styles/commonStyles";

const platformIcons = {
  discord: "chatbubbles",
  groupme: "location",
  remind: "notifications",
  slack: "briefcase",
  telegram: "paper-plane",
  whatsapp: "logo-whatsapp",
};

const platformColors = {
  discord: "#5865F2",
  groupme: "#4CAF50",
  remind: "#FF9800",
  slack: "#4A154B",
  telegram: "#0088cc",
  whatsapp: "#25D366",
};

export default function MessageCard({ message, onPress }) {
  const { colors } = useTheme();

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const truncateMessage = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const platformColor = platformColors[message.platform] || colors.accent;
  const platformIcon = platformIcons[message.platform] || "chatbubble";

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.backgroundAlt,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.backgroundAlt,
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      elevation: 2,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    platformInfo: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    platformIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    iconStyle: {
      color: "white",
    },
    senderInfo: {
      flex: 1,
    },
    senderName: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 2,
    },
    platformName: {
      fontSize: 12,
      color: colors.grey,
      textTransform: "capitalize",
    },
    timeInfo: {
      alignItems: "flex-end",
    },
    timestamp: {
      fontSize: 12,
      color: colors.grey,
      marginBottom: 4,
    },
    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.accent,
    },
    content: {
      marginBottom: 8,
    },
    subject: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 6,
    },
    messageText: {
      fontSize: 14,
      color: colors.grey,
      lineHeight: 20,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: colors.background,
    },
    attachmentInfo: {
      flexDirection: "row",
      alignItems: "center",
    },
    attachmentIcon: {
      color: colors.grey,
      marginRight: 4,
    },
    attachmentText: {
      fontSize: 12,
      color: colors.grey,
    },
    priorityBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.backgroundAlt,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    priorityIcon: {
      color: "white",
      marginRight: 4,
    },
    priorityText: {
      fontSize: 10,
      color: "white",
      fontWeight: "600",
    },
  });

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.platformInfo}>
          <View
            style={[styles.platformIcon, { backgroundColor: platformColor }]}
          >
            <Icon name={platformIcon} size={16} style={styles.iconStyle} />
          </View>
          <View style={styles.senderInfo}>
            <Text style={styles.senderName}>{message.sender}</Text>
            <Text style={styles.platformName}>{message.platform}</Text>
          </View>
        </View>
        <View style={styles.timeInfo}>
          <Text style={styles.timestamp}>{formatTime(message.timestamp)}</Text>
          {message.unread && <View style={styles.unreadDot} />}
        </View>
      </View>

      {/* Message Content */}
      <View style={styles.content}>
        {message.subject && (
          <Text style={styles.subject} numberOfLines={1}>
            {message.subject}
          </Text>
        )}
        <Text style={styles.messageText} numberOfLines={3}>
          {truncateMessage(message.content)}
        </Text>
      </View>

      {/* Footer */}
      {(message.attachments > 0 || message.priority === "high") && (
        <View style={styles.footer}>
          {message.attachments > 0 && (
            <View style={styles.attachmentInfo}>
              <Icon name="attach" size={14} style={styles.attachmentIcon} />
              <Text style={styles.attachmentText}>
                {message.attachments} attachment
                {message.attachments > 1 ? "s" : ""}
              </Text>
            </View>
          )}
          {message.priority === "high" && (
            <View style={styles.priorityBadge}>
              <Icon name="warning" size={12} style={styles.priorityIcon} />
              <Text style={styles.priorityText}>High Priority</Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}
