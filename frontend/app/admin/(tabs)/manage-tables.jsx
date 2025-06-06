import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Pressable, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import axios from 'axios';
import { API_URL } from '../../../services/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Color, Border, FontSize, FontFamily } from '../../../styles/GlobalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome } from '@expo/vector-icons';

const ManageTables = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [tableData, setTableData] = useState({
    people: '',
    quantity: ''
  });

  const fetchSchedule = async (selectedDate) => {
    try {
      const token = await AsyncStorage.getItem('adminToken');
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const response = await axios.get(`${API_URL}/api/admin/table/schedule/${formattedDate}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSchedule(response.data.schedule || []);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSchedule([]);
      } else {
        setSchedule([]);
        console.error('Lỗi khi lấy lịch:', error);
        alert('Không thể lấy thông tin lịch');
      }
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      fetchSchedule(selectedDate);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setEditMode(true);
  };

  const handleUpdateTable = async () => {
    try {
      const token = await AsyncStorage.getItem('adminToken');
      const formattedDate = format(date, 'yyyy-MM-dd');
      
      await axios.patch(
        `${API_URL}/admin/table/single-table`,
        {
          date: formattedDate,
          time: selectedTime,
          people: parseInt(tableData.people),
          quantity: parseInt(tableData.quantity)
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert('Cập nhật bàn thành công');
      fetchSchedule(date);
      setEditMode(false);
      setTableData({ people: '', quantity: '' });
    } catch (error) {
      console.error('Lỗi khi cập nhật bàn:', error);
      alert('Không thể cập nhật bàn');
    }
  };

  useEffect(() => {
    fetchSchedule(date);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <FontAwesome name="calendar" size={24} color={Color.primary} />
            <Text style={styles.title}>Quản lý bàn</Text>
          </View>
          <Text style={styles.subtitle}>Xem và chỉnh sửa lịch bàn theo ngày</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Chọn ngày</Text>
            <Pressable style={styles.inputWrapper} onPress={() => setShowDatePicker(true)}>
              <FontAwesome name="calendar-o" size={20} color={Color.sub} style={styles.inputIcon} />
              <Text style={styles.input}>{format(date, 'dd/MM/yyyy')}</Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                onChange={handleDateChange}
              />
            )}
          </View>

          <Text style={styles.scheduleTitle}>Lịch bàn ngày: {format(date, 'dd/MM/yyyy')}</Text>

          {!editMode ? (
            Array.isArray(schedule) && schedule.length > 0 ? (
              <View style={styles.timeSlotContainer}>
                {schedule.map((slot, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.timeSlot}
                    onPress={() => handleTimeSelect(slot.time)}
                  >
                    <Text style={styles.timeText}>{slot.time}</Text>
                    <View style={styles.tableInfo}>
                      {slot.tables.map((table, tIndex) => (
                        <Text key={tIndex} style={styles.tableText}>
                          {table.people} người: {table.quantity} bàn (Đã đặt: {table.booked})
                        </Text>
                      ))}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={{ textAlign: 'center', color: 'gray', marginTop: 20 }}>
                Không có lịch cho ngày này
              </Text>
            )
          ) : (
            <View style={styles.editContainer}>
              <Text style={styles.editTitle}>Cập nhật bàn - {selectedTime}</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Số người/bàn:</Text>
                <View style={styles.inputWrapper}>
                  <FontAwesome name="users" size={20} color={Color.sub} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={tableData.people}
                    onChangeText={(text) => setTableData({...tableData, people: text})}
                    keyboardType="numeric"
                    placeholder="Nhập số người/bàn"
                    placeholderTextColor={Color.sub}
                  />
                </View>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Số lượng bàn:</Text>
                <View style={styles.inputWrapper}>
                  <FontAwesome name="table" size={20} color={Color.sub} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={tableData.quantity}
                    onChangeText={(text) => setTableData({...tableData, quantity: text})}
                    keyboardType="numeric"
                    placeholder="Nhập số lượng bàn"
                    placeholderTextColor={Color.sub}
                  />
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[styles.button, styles.updateButton]}
                  onPress={handleUpdateTable}
                >
                  <FontAwesome name="save" size={20} color={Color.white} style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Cập nhật</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => {
                    setEditMode(false);
                    setTableData({ people: '', quantity: '' });
                  }}
                >
                  <FontAwesome name="times" size={20} color={Color.white} style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Hủy</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.white,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: wp('5%'),
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  title: {
    fontSize: wp('6%'),
    color: Color.primary,
    fontFamily: FontFamily.segoeUI,
    fontWeight: '700',
    marginLeft: wp('2%'),
  },
  subtitle: {
    fontSize: wp('3.5%'),
    color: Color.sub,
    fontFamily: FontFamily.segoeUI,
  },
  form: {
    padding: wp('5%'),
  },
  inputGroup: {
    marginBottom: hp('2.5%'),
  },
  label: {
    fontSize: wp('4%'),
    color: Color.secondary,
    fontFamily: FontFamily.segoeUI,
    marginBottom: hp('1%'),
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: Border.br_9xs,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: wp('3%'),
  },
  inputIcon: {
    marginRight: wp('2%'),
  },
  input: {
    flex: 1,
    padding: wp('3%'),
    fontSize: wp('4%'),
    fontFamily: FontFamily.segoeUI,
    color: Color.secondary,
  },
  scheduleTitle: {
    fontSize: FontSize.size_l,
    color: Color.secondary,
    fontWeight: '700',
    marginBottom: hp('2%'),
    fontFamily: FontFamily.segoeUI,
    textAlign: 'center',
  },
  timeSlotContainer: {
    gap: hp('1.5%'),
  },
  timeSlot: {
    backgroundColor: Color.lightPrimary,
    padding: hp('2%'),
    borderRadius: Border.br_8xs,
    marginBottom: hp('1.2%'),
    borderWidth: 1,
    borderColor: Color.sub,
  },
  timeText: {
    fontSize: FontSize.size_l,
    fontWeight: '700',
    color: Color.secondary,
    marginBottom: hp('1%'),
    fontFamily: FontFamily.segoeUI,
  },
  tableInfo: {
    gap: hp('0.5%'),
  },
  tableText: {
    fontSize: FontSize.size_m,
    color: Color.tertiary,
    fontFamily: FontFamily.segoeUI,
  },
  editContainer: {
    padding: hp('2%'),
    backgroundColor: Color.lightsub,
    borderRadius: Border.br_8xs,
  },
  editTitle: {
    fontSize: FontSize.size_xl,
    fontWeight: '700',
    color: Color.primary,
    marginBottom: hp('2%'),
    fontFamily: FontFamily.segoeUI,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: wp('3%'),
    marginTop: hp('2%'),
  },
  button: {
    flex: 1,
    paddingVertical: hp('1.2%'),
    borderRadius: Border.br_9xs,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  updateButton: {
    backgroundColor: Color.primary,
  },
  cancelButton: {
    backgroundColor: Color.sub,
  },
  buttonIcon: {
    marginRight: wp('2%'),
  },
  buttonText: {
    color: Color.white,
    fontSize: wp('4%'),
    fontFamily: FontFamily.segoeUI,
    fontWeight: '700',
  },
});

export default ManageTables; 