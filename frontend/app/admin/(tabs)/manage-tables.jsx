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
  const [tableTypes, setTableTypes] = useState({}); // {id: {people, quantity}}
  const [selectedTime, setSelectedTime] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [tableData, setTableData] = useState({
    people: '',
    quantity: ''
  });
  const [selectedTableId, setSelectedTableId] = useState(null);

  // Lấy danh sách TableType của nhà hàng
  const fetchTableTypes = async (token) => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/tabletype`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Trả về dạng {id: {people, quantity}}
      const map = {};
      (res.data || []).forEach(t => {
        map[t._id] = { people: t.people, quantity: t.quantity };
      });
      setTableTypes(map);
    } catch (err) {
      setTableTypes({});
    }
  };

  // Lấy lịch bàn theo ngày
  const fetchSchedule = async (selectedDate) => {
    try {
      const token = await AsyncStorage.getItem('adminToken');
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const response = await axios.get(`${API_URL}/api/admin/table/schedule/${formattedDate}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSchedule(response.data.schedule || []);
      await fetchTableTypes(token);
    } catch (error) {
      setSchedule([]);
      if (!(error.response && error.response.status === 404)) {
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
    setEditMode(false);
    setSelectedTableId(null);
  };

  const handleTableEdit = (table) => {
    setEditMode(true);
    setSelectedTableId(table._id);
    setTableData({
      people: tableTypes[table.tableType]?.people?.toString() || '',
      quantity: tableTypes[table.tableType]?.quantity?.toString() || ''
    });
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
          tableId: selectedTableId,
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
      setSelectedTableId(null);
    } catch (error) {
      console.error('Lỗi khi cập nhật bàn:', error);
      alert('Không thể cập nhật bàn');
    }
  };

  useEffect(() => {
    fetchSchedule(date);
    // eslint-disable-next-line
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <FontAwesome name="calendar" size={22} color={Color.primary} />
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
                  <View key={index} style={styles.timeSlot}>
                    <Text style={styles.timeText}>{slot.time}</Text>
                    <View style={styles.tableInfo}>
                      {Array.isArray(slot.tables) && slot.tables.length > 0 ? (
                        slot.tables.map((table, tIndex) => (
                          <View key={tIndex} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                            <Text style={styles.tableText}>
                              {tableTypes[table.tableType]?.people || '?'} người: {tableTypes[table.tableType]?.quantity || '?'} bàn (Đã đặt: {table.booked})
                            </Text>
                            <TouchableOpacity
                              style={{ marginLeft: 10 }}
                              onPress={() => {
                                setSelectedTime(slot.time);
                                handleTableEdit(table);
                              }}
                            >
                              <FontAwesome name="edit" size={18} color={Color.primary} />
                            </TouchableOpacity>
                          </View>
                        ))
                      ) : (
                        <Text style={styles.tableText}>Không có loại bàn</Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={{ textAlign: 'center', color: 'gray', marginTop: 20 }}>
                Không có lịch cho ngày này
              </Text>
            )
          ) : (
            <View style={styles.editContainer}>
              <Text style={styles.editTitle}>Cập nhật bàn</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Số người/bàn:</Text>
                <View style={styles.inputWrapper}>
                  <FontAwesome name="users" size={20} color={Color.sub} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={tableData.people}
                    onChangeText={(text) => setTableData({ ...tableData, people: text })}
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
                    onChangeText={(text) => setTableData({ ...tableData, quantity: text })}
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
                    setSelectedTableId(null);
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
    fontSize: wp('5.5%'),
    color: Color.primary,
    fontFamily: FontFamily.segoeUI,
    fontWeight: '700',
    marginLeft: wp('2%'),
  },
  subtitle: {
    fontSize: wp("4%"),
    color: Color.sub,
    fontFamily: FontFamily.segoeUI,
    marginLeft: wp("0.5%"),
    marginTop: hp("0.5%"),
  },
  form: {
    padding: wp('5%'),
  },
  inputGroup: {
    marginBottom: hp('2.5%'),
  },
  label: {
    fontSize: wp('4.5%'),
    color: Color.secondary,
    fontFamily: FontFamily.segoeUI,
    marginBottom: hp('1%'),
    fontWeight: '600',
    marginLeft: hp('0.5%'),
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
    fontSize: wp('4.5%'),
    color: Color.primary,
    fontWeight: '700',
    marginBottom: hp('2%'),
    fontFamily: FontFamily.segoeUI,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 2,
    borderBottomColor: Color.primary,
    paddingVertical: hp('1%'),
    // marginHorizontal: wp('4%'),
    backgroundColor: '#fffbe7',
    borderRadius: 4,
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