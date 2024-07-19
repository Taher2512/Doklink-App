import React, { useState, useEffect } from 'react';
import { 
  View, 
  Keyboard, 
  Platform, 
  Dimensions,
  StyleSheet,
  Animated,
  LayoutAnimation,
  UIManager
} from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const KeyboardAwareLayout = ({ children }) => {
  const [layoutHeight, setLayoutHeight] = useState(Dimensions.get('window').height);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const updateLayoutHeight = () => {
      const { height } = Dimensions.get('window');
      setLayoutHeight(height);
    };

    const keyboardWillShow = (event) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setKeyboardHeight(event.endCoordinates.height);
    };

    const keyboardWillHide = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setKeyboardHeight(0);
    };

    const dimensionsListener = Dimensions.addEventListener('change', updateLayoutHeight);
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      keyboardWillShow
    );
    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      keyboardWillHide
    );

    updateLayoutHeight();

    return () => {
      dimensionsListener.remove();
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  return (
    <View style={[styles.container, { height: layoutHeight }]}>
      <Animated.View style={[styles.content, { marginBottom: keyboardHeight }]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default KeyboardAwareLayout;