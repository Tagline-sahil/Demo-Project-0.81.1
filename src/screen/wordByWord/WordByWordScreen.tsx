import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const HumaOnboarding = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [displayedText, setDisplayedText] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
  const fadeAnim = useState(new Animated.Value(1))[0];

  const screens = [
    {
      lines: [
        {
          text: "Hi, I'm Huma.",
          words: ['Hi,', "I'm", 'Huma.'],
          highlights: {},
        },
      ],
    },
    {
      lines: [
        {
          text: "I'll be your companion on this journey with Vasana toward better wellbeing.",
          words: [
            "I'll",
            'be',
            'your',
            'companion',
            'on',
            'this',
            'journey',
            'with',
            'Vasana',
            'toward',
            'better',
            'wellbeing.',
          ],
          highlights: { Vasana: true, 'wellbeing.': true },
        },
      ],
    },
    {
      lines: [
        {
          text: 'I help you thrive with daily check-ins and simple practices to build healthy habits.',
          words: [
            'I',
            'help',
            'you',
            'thrive',
            'with',
            'daily check-ins',
            'and',
            'simple practices',
            'to',
            'build',
            'healthy habits.',
          ],
          pills: ['daily check-ins', 'simple practices', 'healthy habits.'],
        },
      ],
    },
    {
      lines: [
        {
          text: "To support you better, I'll ask eight quick questions about your daily habits. It'll only take a minute.",
          words: [
            'To',
            'support',
            'you',
            'better,',
            "I'll",
            'ask',
            'eight quick',
            'questions',
            'about',
            'your',
            'daily',
            'habits.',
            "It'll",
            'only',
            'take',
            'a',
            'minute.',
          ],
          highlights: { 'eight quick': true, questions: true },
        },
      ],
    },
  ];

  useEffect(() => {
    const screen = screens[currentScreen];
    const currentLine = screen.lines[0];

    if (wordIndex < currentLine.words.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => [...prev, currentLine.words[wordIndex]]);
        setWordIndex(wordIndex + 1);
      }, 350);

      return () => clearTimeout(timer);
    } else if (currentScreen < screens.length - 1) {
      // Only fade out and move to next screen if not on last screen
      const fadeTimer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            setCurrentScreen(currentScreen + 1);
            setDisplayedText([]);
            setWordIndex(0);
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }).start();
          }, 100);
        });
      }, 2500);

      return () => clearTimeout(fadeTimer);
    }
    // If on last screen and all words displayed, do nothing (stop)
  }, [wordIndex, currentScreen]);

  const renderText = () => {
    const screen = screens[currentScreen];
    const currentLine = screen.lines[0];

    return (
      <Text style={styles.textContainer}>
        {displayedText.map((word, index) => {
          const isPill = currentLine.pills && currentLine.pills.includes(word);
          const isHighlight =
            currentLine.highlights && currentLine.highlights[word];

          if (isPill) {
            return (
              <View key={index} style={styles.pillContainer}>
                <View style={styles.pill}>
                  <Text style={styles.pillText}>{word}</Text>
                </View>
                <Text style={styles.mainText}> </Text>
              </View>
            );
          }

          if (isHighlight) {
            return (
              <Text key={index} style={styles.highlightText}>
                {word}{' '}
              </Text>
            );
          }

          return (
            <Text key={index} style={styles.mainText}>
              {word}{' '}
            </Text>
          );
        })}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.textWrapper, { opacity: fadeAnim }]}>
          {renderText()}
        </Animated.View>

        {/* <View style={styles.progressContainer}>
          {screens.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentScreen && styles.progressDotActive,
              ]}
            />
          ))}
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  content: {
    width: width * 0.85,
    maxWidth: 400,
    alignItems: 'center',
  },
  textWrapper: {
    width: '100%',
    minHeight: 200,
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  mainText: {
    color: '#000000',
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 42,
  },
  highlightText: {
    color: '#F59E0B',
    fontSize: 28,
    fontWeight: '400',
    lineHeight: 42,
  },
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pill: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  pillText: {
    color: '#1F2937',
    fontSize: 18,
    fontWeight: '500',
  },
  dots: {
    color: '#000000',
    fontSize: 28,
    fontWeight: '300',
    marginTop: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    gap: 8,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
  },
  progressDotActive: {
    width: 24,
    backgroundColor: '#6B7280',
  },
});

export default HumaOnboarding;
