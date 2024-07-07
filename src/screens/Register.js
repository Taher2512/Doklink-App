import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Modal, Portal, Text, useTheme} from 'react-native-paper';
import Animated, {
  Easing,
  FadeInLeft,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const steps = [
  {
    image: require('../assets/icons/bed-booking.png'),
    title: 'BED\nBOOKING',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores soluta',
  },
  {
    image: require('../assets/icons/doctor-appointment.png'),
    title: 'DOCTOR\nAPPOINTMENT',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores soluta',
  },
  {
    image: require('../assets/icons/get-started.png'),
    title: 'GET\nSTARTED!',
    description: '',
  },
];

const Register = () => {
  const [visible, setVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState('forward');

  const theme = useTheme();

  const progressPosition = useSharedValue(0);

  useEffect(() => {
    progressPosition.value = currentStep / (steps.length - 1);
  }, [currentStep]);

  const progressAnimatedStyle = useAnimatedStyle(() => {
    return {
      left: withSpring(progressPosition.value * 70 + 2.5 + '%', {
        damping: 15,
        stiffness: 100,
      }),
    };
  });

  const hideModal = () => setVisible(false);

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection('forward');
      setCurrentStep(currentStep + 1);
    } else {
      hideModal();
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setDirection('backward');
      setCurrentStep(currentStep - 1);
    }
  };

  const skipToLastStep = () => {
    setDirection('forward');
    setCurrentStep(steps.length - 1);
  };

  const getEnteringAnimation = () => {
    return direction === 'forward'
      ? FadeInRight.duration(350)
      : FadeInLeft.duration(350);
  };

  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            flex: 1,
            backgroundColor: '#fff',
          }}>
          <View
            className="w-full justify-center items-center"
            style={{height: '55%'}}>
            <Animated.View
              className="w-full h-full"
              entering={getEnteringAnimation()}
              key={currentStep}>
              <Image
                source={steps[currentStep].image}
                style={{width: '100%', height: '100%', resizeMode: 'contain'}}
              />
            </Animated.View>
          </View>
          <View
            className="w-full items-center"
            style={{
              borderTopLeftRadius: 80,
              borderTopRightRadius: 80,
              backgroundColor: theme.colors.secondary,
              height: '45%',
            }}>
            <Animated.View
              entering={getEnteringAnimation()}
              key={`text-${currentStep}`}>
              <Text
                className="text-white text-3xl font-bold mt-6 text-center flex-wrap"
                style={{lineHeight: 48}}>
                {steps[currentStep].title}
              </Text>
              {/* {steps[currentStep].description && ( */}
              <Text className="text-white text-base mt-4 text-center flex-wrap px-6">
                {steps[currentStep].description}
              </Text>
              {/* )} */}
            </Animated.View>
            <View className="bg-slate-300 h-3.5 w-20 mt-5 rounded-full justify-center">
              <Animated.View
                className="h-2.5 w-5 rounded-full absolute"
                style={[
                  progressAnimatedStyle,
                  {backgroundColor: theme.colors.secondary},
                ]}
              />
            </View>
            <View className="w-full flex-row justify-between items-center px-1">
              <Button
                icon="chevron-left"
                mode="text"
                className="mt-11"
                labelStyle={{fontSize: 15}}
                contentStyle={{opacity: currentStep === 0 ? 0.5 : 0.8}}
                onPress={goToPreviousStep}
                disabled={currentStep === 0}>
                Back
              </Button>
              {currentStep === steps.length - 1 ? (
                <View>
                  <Button
                    icon="login"
                    mode="outlined"
                    className="mt-11"
                    contentStyle={{
                      flexDirection: 'row-reverse',
                    }}
                    labelStyle={{fontSize: 17}}
                    onPress={goToNextStep}>
                    LOGIN
                  </Button>
                  <Button
                    icon="account"
                    mode="outlined"
                    className="mt-3.5"
                    contentStyle={{
                      flexDirection: 'row-reverse',
                    }}
                    labelStyle={{fontSize: 17}}
                    onPress={goToNextStep}>
                    SIGN UP
                  </Button>
                </View>
              ) : (
                <Button
                  icon="arrow-right"
                  mode="outlined"
                  className="mt-11"
                  contentStyle={{
                    flexDirection: 'row-reverse',
                  }}
                  labelStyle={{fontSize: 17}}
                  onPress={goToNextStep}>
                  NEXT
                </Button>
              )}

              <Button
                icon="skip-next"
                mode="text"
                className="mt-11"
                contentStyle={{
                  flexDirection: 'row-reverse',
                  opacity: currentStep === steps.length - 1 ? 0.5 : 0.6,
                }}
                labelStyle={{fontSize: 14}}
                onPress={skipToLastStep}
                disabled={currentStep === steps.length - 1}>
                Skip
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
