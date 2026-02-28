import { StatusBar } from "expo-status-bar";
import { useState, useTransition } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
} from "react-native";

const API_URL = "http://localhost:3000";

export default function App() {
	const [url, setUrl] = useState("");
	const [message, setMessage] = useState("");
	const [isPending, startTransition] = useTransition();

	const handleSubmit = () => {
		if (!url.trim()) return;
		startTransition(async () => {
			try {
				const res = await fetch(`${API_URL}/ask`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ url: url.trim() }),
				});
				const data = await res.json();
				setMessage(data.message);
			} catch {
				setMessage("サーバーに接続できませんでした");
			}
		});
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView contentContainerStyle={styles.content}>
				<TextInput
					style={styles.input}
					placeholder="URLを入力..."
					value={url}
					onChangeText={setUrl}
					autoCapitalize="none"
					autoCorrect={false}
					keyboardType="url"
				/>
				<Pressable
					style={({ pressed }) => [
						styles.button,
						pressed && styles.buttonPressed,
					]}
					onPress={handleSubmit}
					disabled={isPending || !url.trim()}
				>
					<Text style={styles.buttonText}>
						{isPending ? "送信中..." : "送信"}
					</Text>
				</Pressable>
				{message !== "" && <Text style={styles.message}>{message}</Text>}
			</ScrollView>
			<StatusBar style="auto" />
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	content: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	input: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 12,
		padding: 14,
		fontSize: 16,
		marginBottom: 16,
	},
	button: {
		backgroundColor: "#007AFF",
		paddingVertical: 14,
		paddingHorizontal: 32,
		borderRadius: 12,
	},
	buttonPressed: {
		opacity: 0.7,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	message: {
		marginTop: 24,
		fontSize: 16,
		textAlign: "left",
		color: "#333",
		width: "100%",
		lineHeight: 24,
	},
});
