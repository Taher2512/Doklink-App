import {StyleSheet, View} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';

const DateSelector = ({label, placeholder, onChange, value: date}) => {
  const [open, setOpen] = useState(false);
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const theme = useTheme();

  // Updated value prop to handle null date
  const formattedDate = date
    ? `${date.getDate()}-${month[date.getMonth()]}-${date.getFullYear()}`
    : '';

  return (
    <View style={styles.inputContainer}>
      <DatePicker
        modal
        open={open}
        date={date || new Date()} // Provide a default date when opening the picker
        mode="date"
        onConfirm={date => {
          setOpen(false);
          onChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <TextInput
        mode="flat"
        label={label}
        placeholder={placeholder}
        underlineColor="#045c34"
        caretHidden
        onPressOut={() => setOpen(true)}
        value={formattedDate}
        theme={{colors: {primary: theme.colors.secondary}}}
        className="bg-slate-100 rounded-lg text-gray-300 w-full mt-3"
      />
    </View>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 3,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
