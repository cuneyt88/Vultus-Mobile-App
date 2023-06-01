import { Pressable, StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../constants/styles';

function Button({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.image}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    height:47,
    width:240,
    backgroundColor: GlobalStyles.SystemColors.blue300,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    justifyContent:'center'
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    alignItems:'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});