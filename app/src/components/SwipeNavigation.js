import React from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

export default function SwipeNavigation({ children, onSwipeLeft, onSwipeRight }) {
    const panGesture = Gesture.Pan()
        .onEnd((event) => {
            if (event.translationX < -120 && onSwipeLeft) {
                onSwipeLeft();   // geser kiri
            }
            if (event.translationX > 120 && onSwipeRight) {
                onSwipeRight();  // geser kanan
            }
        });

    return <GestureDetector gesture={panGesture}>{children}</GestureDetector>;
}
