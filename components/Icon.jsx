import { View, StyleSheet, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function Icon({
  name,
  source,
  size = 40,
  color = "#333",
  style
}) {
  return (
    <View style={[styles.iconContainer, style]}>
      {name ? (
        <Ionicons name={name} size={size} color={color} />
      ) : source ? (
        <Image
          source={source}
          style={{ width: size, height: size }}
          resizeMode="contain"
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center"
  }
})
