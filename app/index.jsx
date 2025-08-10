import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from "react-native"
import { router } from "expo-router"
import { useState, useEffect } from "react"
import Icon from "../components/Icon"
import MessageCard from "../components/MessageCard"
import FilterBar from "../components/FilterBar"
import { mockMessages } from "../data/mockMessages"
import { useTheme } from "../contexts/themeContext";
import { commonStyles } from "../styles/commonStyles";

export default function InboxScreen() {
  const { colors } = useTheme();
  const [messages, setMessages] = useState([])
  const [filteredMessages, setFilteredMessages] = useState([])
  const [selectedPlatform, setSelectedPlatform] = useState("all")

  useEffect(() => {
    console.log("Loading mock messages...")
    setMessages(mockMessages)
    setFilteredMessages(mockMessages)
  }, [])

  useEffect(() => {
    console.log("Filtering messages by platform:", selectedPlatform)
    let filtered =
      selectedPlatform === "all"
        ? [...messages]
        : messages.filter(msg => msg.platform === selectedPlatform)

    // Always sort by time (newest first)
    filtered.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    })

    setFilteredMessages(filtered)
  }, [messages, selectedPlatform])

  const handlePlatformFilter = platform => {
    console.log("Platform filter changed to:", platform)
    setSelectedPlatform(platform)
  }


const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundAlt
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text
  },
  settingsButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.backgroundAlt
  },
  messagesList: {
    flex: 1
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 32
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.5
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8
  },
  emptyText: {
    fontSize: 16,
    color: colors.grey,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 32
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.backgroundAlt,
    backgroundColor: colors.background
  },
  footerText: {
    fontSize: 14,
    color: colors.grey,
    textAlign: "center"
  }
})

  return (
    <View style={[commonStyles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Message Inbox</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => router.push("/settings")}
        >
          <Icon name="settings-outline" size={24} />
        </TouchableOpacity>
      </View>

      {/* Filter Bar */}
      <FilterBar
        selectedPlatform={selectedPlatform}
        onPlatformChange={handlePlatformFilter}
      />

      {/* Messages List */}
      <ScrollView
        style={styles.messagesList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContainer}
      >
        {filteredMessages.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="mail-outline" size={64} style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>No Messages</Text>
            <Text style={styles.emptyText}>
              {selectedPlatform === "all"
                ? "No messages found. Connect your apps in settings to start receiving messages."
                : `No messages from ${selectedPlatform}. Try selecting a different platform.`}
            </Text>
          </View>
        ) : (
          filteredMessages.map(message => (
            <MessageCard
              key={message.id}
              message={message}
              onPress={() => console.log("Message pressed:", message.id)}
            />
          ))
        )}
      </ScrollView>

      {/* Stats Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {filteredMessages.length} message
          {filteredMessages.length !== 1 ? "s" : ""}
          {selectedPlatform !== "all" && ` from ${selectedPlatform}`}
          {" • Sorted by time"}
        </Text>
      </View>
    </View>
  )
}
