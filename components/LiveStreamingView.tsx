import React, { useState } from "react";
import { Platform, StyleSheet, Image, Text } from "react-native";
import WebView from "react-native-webview";

const screenshotWidth = 250;
const loadingThreshold = Platform.OS === 'ios' ? 0.88 : 0.78;
const JAVASCRIPT_TO_DISABLE_ZOOM = `
  (function() {
    const meta = document.createElement('meta');
    meta.setAttribute('content', 'width=${screenshotWidth}, user-scalable=no');
    meta.setAttribute('name', 'viewport');
    document.getElementsByTagName('head')[0].appendChild(meta);
  })();
`;

export function LiveStreamingView() {
    const [progress, setProgress] = useState(0);
    const [isError, setIsError] = useState(false);
    const uri = "http://118.71.204.107:5016/camera1";

    if (isError) {
        return <Text>ERROR</Text>;
    }

    if (Platform.OS === 'web') {
        return (
            <Image
                source={{ uri }}
                style={styles.image}
                onError={() => setIsError(true)}
            />
        );
    }

    return (
        <WebView
            source={{ uri }}
            style={styles.image}
            startInLoadingState
            onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
            renderLoading={() => progress < loadingThreshold ? <Text>LOADING</Text> : null}
            onError={() => setIsError(true)}
            bounces={false}
            scrollEnabled={false}
            setBuiltInZoomControls={false}
            injectedJavaScript={JAVASCRIPT_TO_DISABLE_ZOOM}
            onMessage={() => { }}
        />
    );
}

const styles = StyleSheet.create({
    image: {
        width: screenshotWidth,
        height: screenshotWidth * (3 / 4),
    },
});
