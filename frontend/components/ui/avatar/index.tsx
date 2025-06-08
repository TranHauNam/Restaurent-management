import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface AvatarProps {
  size?: AvatarSize;
  source?: { uri: string };
  fallbackText?: string;
  style?: ViewStyle;
}

interface AvatarBadgeProps {
  style?: ViewStyle;
}

const getSizeStyle = (size: AvatarSize = 'md'): number => {
  const sizes = {
    'xs': 24,
    'sm': 32,
    'md': 48,
    'lg': 64,
    'xl': 96,
    '2xl': 128,
  } as const;
  return sizes[size];
};

const getFontSize = (size: AvatarSize = 'md'): number => {
  const sizes = {
    'xs': 10,
    'sm': 12,
    'md': 16,
    'lg': 20,
    'xl': 30,
    '2xl': 48,
  } as const;
  return sizes[size];
};

export const Avatar: React.FC<AvatarProps> = ({ 
  size = 'md', 
  source, 
  fallbackText = '', 
  style 
}) => {
  const sizeValue = getSizeStyle(size);
  
  return (
    <View style={[styles.container, { width: sizeValue, height: sizeValue }, style]}>
      {source ? (
        <Image
          source={source}
          style={[styles.image, { width: sizeValue, height: sizeValue }]}
        />
      ) : (
        <Text style={[
          styles.fallbackText,
          { fontSize: getFontSize(size) }
        ]}>
          {fallbackText.substring(0, 2).toUpperCase()}
        </Text>
      )}
    </View>
  );
};

export const AvatarBadge: React.FC<AvatarBadgeProps> = ({ style }) => {
  return <View style={[styles.badge, style]} />;
};

export const AvatarGroup: React.FC<{ children: React.ReactNode; style?: ViewStyle }> = ({ 
  children, 
  style 
}) => {
  return (
    <View style={[styles.group, style]}>
      {React.Children.map(children, (child, index) => (
        <View style={[styles.groupItem, { zIndex: -index }]}>
          {child}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 9999,
    backgroundColor: '#4F46E5', // primary-600 equivalent
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    borderRadius: 9999,
  },
  fallbackText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  badge: {
    width: 12,
    height: 12,
    backgroundColor: '#22C55E', // success-500 equivalent
    borderRadius: 9999,
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  group: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  groupItem: {
    marginLeft: -10,
  },
});
