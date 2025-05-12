import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import axios from 'axios';
import { API_URL } from '../../../services/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      const response = await axios.get(`${API_URL}/admin/tables/schedule/${formattedDate}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSchedule(response.data.schedule);
    } catch (error) {
      console.error('Lỗi khi lấy lịch:', error);
      alert('Không thể lấy thông tin lịch');
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quản lý bàn</Text>
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>
            {format(date, 'dd/MM/yyyy')}
          </Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={handleDateChange}
        />
      )}

      {!editMode ? (
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
        <View style={styles.editContainer}>
          <Text style={styles.editTitle}>Cập nhật bàn - {selectedTime}</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Số người/bàn:</Text>
            <TextInput
              style={styles.input}
              value={tableData.people}
              onChangeText={(text) => setTableData({...tableData, people: text})}
              keyboardType="numeric"
              placeholder="Nhập số người/bàn"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Số lượng bàn:</Text>
            <TextInput
              style={styles.input}
              value={tableData.quantity}
              onChangeText={(text) => setTableData({...tableData, quantity: text})}
              keyboardType="numeric"
              placeholder="Nhập số lượng bàn"
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.updateButton]}
              onPress={handleUpdateTable}
            >
              <Text style={styles.buttonText}>Cập nhật</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                setEditMode(false);
                setTableData({ people: '', quantity: '' });
              }}
            >
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  timeSlotContainer: {
    gap: 12,
  },
  timeSlot: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tableInfo: {
    gap: 4,
  },
  tableText: {
    fontSize: 16,
  },
  editContainer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  editTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: '#007AFF',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ManageTables; 