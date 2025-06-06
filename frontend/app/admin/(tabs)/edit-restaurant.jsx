import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, TextInput, Alert, ScrollView, SafeAreaView } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../../../styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { useAuthContext } from "../../../contexts/auth-context";
import { API_URL } from "../../../services/config";
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const TABS = [
  { key: "info", label: "Thông tin cơ bản" },
  { key: "table", label: "Loại bàn" },
  { key: "timeslot", label: "Khung giờ" }
];

const EditRestaurant = () => {
  const router = useRouter();
  const { adminToken, logout } = useAuthContext();
  const [restaurant, setRestaurant] = useState({
    name: "",
    address: "",
    openTime: "",
    closeTime: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [tableTypes, setTableTypes] = useState([]);
  const [tableForm, setTableForm] = useState({ people: '', quantity: '', booked: 0 });
  const [editingId, setEditingId] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [slotForm, setSlotForm] = useState({ time: '', tableType: '' });
  const [editingSlotId, setEditingSlotId] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempTime, setTempTime] = useState(new Date());

  useEffect(() => {
    const fetchRestaurantData = async () => {
      if (!adminToken) {
        Alert.alert("Lỗi", "Phiên đăng nhập đã hết hạn", [
          {
            text: "OK",
            onPress: () => {
              logout();
              router.replace("/admin/sign-in");
            }
          }
        ]);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/admin/restaurant/update`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Restaurant data:", data);

        if (data.restaurant) {
          setRestaurant(prev => ({
            ...prev,
            name: data.restaurant.name || "",
            address: data.restaurant.address || "",
            openTime: data.restaurant.openTime || "",
            closeTime: data.restaurant.closeTime || "",
            description: data.restaurant.description || ""
          }));
        }
      } catch (error) {
        console.error("Error fetching restaurant:", error);
        Alert.alert("Lỗi", "Không thể tải thông tin nhà hàng");
      }
    };

    fetchRestaurantData();
  }, [adminToken]);

  useEffect(() => {
    if (activeTab === "table") fetchTableTypes();
  }, [activeTab]);

  const fetchTableTypes = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/tabletype`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      const data = await res.json();
      setTableTypes(data);
    } catch (err) {
      Alert.alert("Lỗi", "Không thể tải loại bàn");
    }
  };

  const handleEditTableType = (type) => {
    setTableForm({ people: String(type.people), quantity: String(type.quantity), booked: type.booked || 0 });
    setEditingId(type._id);
  };

  const handleDeleteTableType = async (id) => {
    try {
      await fetch(`${API_URL}/api/admin/tabletype/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      fetchTableTypes();
    } catch (err) {
      Alert.alert("Lỗi", "Không thể xóa loại bàn");
    }
  };

  const handleSaveTableType = async () => {
    if (!tableForm.people || !tableForm.quantity) {
      Alert.alert("Vui lòng nhập đủ thông tin");
      return;
    }
    try {
      if (editingId) {
        // Sửa
        await fetch(`${API_URL}/api/admin/tabletype/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`
          },
          body: JSON.stringify({
            people: Number(tableForm.people),
            quantity: Number(tableForm.quantity)
          })
        });
      } else {
        // Thêm mới
        await fetch(`${API_URL}/api/admin/tabletype`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`
          },
          body: JSON.stringify({
            people: Number(tableForm.people),
            quantity: Number(tableForm.quantity)
          })
        });
      }
      setTableForm({ people: '', quantity: '', booked: 0 });
      setEditingId(null);
      fetchTableTypes();
    } catch (err) {
      Alert.alert("Lỗi", "Không thể lưu loại bàn");
    }
  };

  const handleCancelTableType = () => {
    setTableForm({ people: '', quantity: '', booked: 0 });
    setEditingId(null);
  };

  useEffect(() => {
    if (activeTab === "timeslot") fetchTimeSlots();
  }, [activeTab]);

  const fetchTimeSlots = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/timeslot`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      const data = await res.json();
      setTimeSlots(data);
    } catch (err) {
      Alert.alert("Lỗi", "Không thể tải khung giờ");
    }
  };

  const handleEditTimeSlot = (slot) => {
    setSlotForm({ time: slot.time, tableType: slot.tables[0]?._id || '' });
    setEditingSlotId(slot._id);
  };

  const handleDeleteTimeSlot = async (id) => {
    try {
      await fetch(`${API_URL}/api/admin/timeslot/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      fetchTimeSlots();
    } catch (err) {
      Alert.alert("Lỗi", "Không thể xóa khung giờ");
    }
  };

  const handleSaveTimeSlot = async () => {
    if (!slotForm.time) {
      Alert.alert("Vui lòng nhập đủ thông tin");
      return;
    }
    try {
      if (editingSlotId) {
        // Sửa
        await fetch(`${API_URL}/api/admin/timeslot/${editingSlotId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`
          },
          body: JSON.stringify({
            time: slotForm.time,
            tables: [slotForm.tableType]
          })
        });
      } else {
        // Thêm mới
        await fetch(`${API_URL}/api/admin/timeslot`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`
          },
          body: JSON.stringify({
            time: slotForm.time,
            tables: [slotForm.tableType]
          })
        });
      }
      setSlotForm({ time: '', tableType: '' });
      setEditingSlotId(null);
      fetchTimeSlots();
    } catch (err) {
      Alert.alert("Lỗi", "Không thể lưu khung giờ");
    }
  };

  const handleCancelTimeSlot = () => {
    setSlotForm({ time: '', tableType: '' });
    setEditingSlotId(null);
  };

  const handleTimeChange = (event, selectedDate) => {
    setShowTimePicker(false);
    if (selectedDate) {
      const hours = selectedDate.getHours().toString().padStart(2, '0');
      const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
      setSlotForm(f => ({ ...f, time: `${hours}:${minutes}` }));
      setTempTime(selectedDate);
    }
  };

  const handleUpdate = async () => {
    if (!adminToken) {
      Alert.alert("Lỗi", "Phiên đăng nhập đã hết hạn", [
        {
          text: "OK",
          onPress: () => {
            logout();
            router.replace("/admin/sign-in");
          }
        }
      ]);
      return;
    }

    if (!restaurant.name || !restaurant.address || !restaurant.openTime || !restaurant.closeTime) {
      Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/restaurant/update`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: restaurant.name,
          address: restaurant.address,
          openTime: restaurant.openTime,
          closeTime: restaurant.closeTime,
          description: restaurant.description || ''
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        Alert.alert("Thành công", "Cập nhật thông tin nhà hàng thành công");
      } else if (response.status === 401 || response.status === 403) {
        Alert.alert("Lỗi", "Phiên đăng nhập đã hết hạn", [
          {
            text: "OK",
            onPress: () => {
              logout();
              router.replace("/admin/sign-in");
            }
          }
        ]);
      } else {
        Alert.alert("Lỗi", data.message || "Có lỗi xảy ra khi cập nhật");
      }
    } catch (error) {
      console.error("Error updating restaurant:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi cập nhật thông tin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <FontAwesome name="edit" size={22} color={Color.primary} style={styles.headerIcon} />
            <Text style={styles.title}>Chỉnh sửa thông tin nhà hàng</Text>
          </View>
          <Text style={styles.subtitle}>Cập nhật thông tin của nhà hàng</Text>
        </View>

        <View style={styles.tabNav}>
          {TABS.map(tab => (
            <Pressable
              key={tab.key}
              style={[
                styles.tabItem,
                activeTab === tab.key && styles.tabItemActive
              ]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab.key && styles.tabTextActive
              ]}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.tabContent}>
          {activeTab === "info" && (
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tên nhà hàng <Text style={styles.required}>*</Text></Text>
                <View style={styles.inputWrapper}>
                  <FontAwesome name="home" size={20} color={Color.sub} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={restaurant.name}
                    onChangeText={(text) => setRestaurant(prev => ({ ...prev, name: text }))}
                    placeholder="Nhập tên nhà hàng"
                    placeholderTextColor={Color.sub}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Địa chỉ <Text style={styles.required}>*</Text></Text>
                <View style={styles.inputWrapper}>
                  <FontAwesome name="map-marker" size={20} color={Color.sub} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={restaurant.address}
                    onChangeText={(text) => setRestaurant(prev => ({ ...prev, address: text }))}
                    placeholder="Nhập địa chỉ"
                    placeholderTextColor={Color.sub}
                  />
                </View>
              </View>

              <View style={styles.timeContainer}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                  <Text style={styles.label}>Giờ mở cửa <Text style={styles.required}>*</Text></Text>
                  <View style={styles.inputWrapper}>
                    <FontAwesome name="clock-o" size={20} color={Color.sub} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={restaurant.openTime}
                      onChangeText={(text) => setRestaurant(prev => ({ ...prev, openTime: text }))}
                      placeholder="HH:MM"
                      placeholderTextColor={Color.sub}
                    />
                  </View>
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Giờ đóng cửa <Text style={styles.required}>*</Text></Text>
                  <View style={styles.inputWrapper}>
                    <FontAwesome name="clock-o" size={20} color={Color.sub} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={restaurant.closeTime}
                      onChangeText={(text) => setRestaurant(prev => ({ ...prev, closeTime: text }))}
                      placeholder="HH:MM"
                      placeholderTextColor={Color.sub}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mô tả</Text>
                <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                  <FontAwesome name="file-text-o" size={20} color={Color.sub} style={[styles.inputIcon, {marginTop: 10}]} />
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={restaurant.description}
                    onChangeText={(text) => setRestaurant(prev => ({ ...prev, description: text }))}
                    placeholder="Nhập mô tả về nhà hàng của bạn"
                    placeholderTextColor={Color.sub}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>
              </View>

              <Pressable 
                style={[styles.updateButton, loading && styles.disabledButton]} 
                onPress={handleUpdate}
                disabled={loading}
              >
                <FontAwesome name="save" size={20} color={Color.white} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>
                  {loading ? "Đang cập nhật..." : "Cập nhật thông tin"}
                </Text>
              </Pressable>
            </View>
          )}
          {activeTab === "table" && (
            <View>
              {tableTypes.map((type, idx) => (
                <View key={type._id} style={[styles.tableTypeItem, editingId === type._id && styles.tableTypeItemEditing]}>
                  <View style={styles.tableTypeRow}>
                    <FontAwesome name="users" size={18} color={Color.primary} style={{marginRight: 8}} />
                    <Text style={styles.tableTypeText}>
                      <Text style={{fontWeight: '700'}}>Loại bàn {idx + 1}:</Text>
                    </Text>
                    <View style={styles.tableTypeBadges}>
                      <View style={styles.badge}>
                        <FontAwesome name="user" size={12} color={Color.primary} style={{marginRight: 4}} />
                        <Text style={styles.badgeText}>{type.people} người</Text>
                      </View>
                      <View style={styles.badge}>
                        <FontAwesome name="table" size={12} color={Color.primary} style={{marginRight: 4}} />
                        <Text style={styles.badgeText}>{type.quantity} bàn</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.tableTypeActions}>
                    <Pressable style={styles.editBtn} onPress={() => handleEditTableType(type)}>
                      <FontAwesome name="pencil" size={14} color="#fff" style={{marginRight: 4}} />
                      <Text style={styles.actionText}>Chỉnh sửa</Text>
                    </Pressable>
                    <Pressable style={styles.deleteBtn} onPress={() => handleDeleteTableType(type._id)}>
                      <FontAwesome name="trash" size={14} color="#fff" style={{marginRight: 4}} />
                      <Text style={styles.actionText}>Xóa</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
              <View style={styles.tableTypeForm}>
                <Text style={styles.formTitle}>{editingId ? "Chỉnh sửa loại bàn" : "Thêm loại bàn mới"}</Text>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Số người ngồi:</Text>
                  <View style={styles.inputWrapper}>
                    <FontAwesome name="user" size={16} color={Color.sub} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={tableForm.people}
                      onChangeText={text => setTableForm(f => ({ ...f, people: text }))}
                      keyboardType="numeric"
                      placeholder="Nhập số người"
                    />
                  </View>
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Số lượng bàn:</Text>
                  <View style={styles.inputWrapper}>
                    <FontAwesome name="table" size={16} color={Color.sub} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={tableForm.quantity}
                      onChangeText={text => setTableForm(f => ({ ...f, quantity: text }))}
                      keyboardType="numeric"
                      placeholder="Nhập số lượng bàn"
                    />
                  </View>
                </View>
                <View style={styles.formActions}>
                  <Pressable style={styles.saveBtn} onPress={handleSaveTableType}>
                    <FontAwesome name="save" size={16} color="#fff" style={{marginRight: 4}} />
                    <Text style={styles.actionText}>Lưu</Text>
                  </Pressable>
                  <Pressable style={styles.cancelBtn} onPress={handleCancelTableType}>
                    <FontAwesome name="times" size={16} color="#fff" style={{marginRight: 4}} />
                    <Text style={styles.actionText}>Hủy</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
          {activeTab === "timeslot" && (
            <View>
              {timeSlots.map((slot, idx) => (
                <View key={slot._id} style={[styles.timeSlotItem, editingSlotId === slot._id && styles.timeSlotItemEditing]}>
                  <View style={styles.timeSlotRow}>
                    <FontAwesome name="clock-o" size={18} color={Color.primary} style={{marginRight: 8}} />
                    <Text style={styles.timeSlotText}>
                      <Text style={{fontWeight: '700'}}>Khung giờ {idx + 1}:</Text>
                    </Text>
                    <View style={styles.timeSlotBadges}>
                      <View style={styles.badge}>
                        <FontAwesome name="clock-o" size={12} color={Color.primary} style={{marginRight: 4}} />
                        <Text style={styles.badgeText}>{slot.time}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.timeSlotActions}>
                    <Pressable style={styles.editBtn} onPress={() => handleEditTimeSlot(slot)}>
                      <FontAwesome name="pencil" size={14} color="#fff" style={{marginRight: 4}} />
                      <Text style={styles.actionText}>Chỉnh sửa</Text>
                    </Pressable>
                    <Pressable style={styles.deleteBtn} onPress={() => handleDeleteTimeSlot(slot._id)}>
                      <FontAwesome name="trash" size={14} color="#fff" style={{marginRight: 4}} />
                      <Text style={styles.actionText}>Xóa</Text>
                    </Pressable>
                  </View>
                </View>
              ))}

              <View style={styles.timeSlotForm}>
                <Text style={styles.formTitle}>{editingSlotId ? "Chỉnh sửa khung giờ" : "Thêm khung giờ mới"}</Text>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Thời gian:</Text>
                  <Pressable
                    style={[styles.inputWrapper, { flex: 1 }]}
                    onPress={() => setShowTimePicker(true)}
                  >
                    <FontAwesome name="clock-o" size={16} color={Color.sub} style={styles.inputIcon} />
                    <Text style={styles.input}>
                      {slotForm.time ? slotForm.time : "Chọn thời gian"}
                    </Text>
                  </Pressable>
                  {showTimePicker && (
                    <DateTimePicker
                      value={tempTime}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={handleTimeChange}
                    />
                  )}
                </View>
                <View style={styles.formActions}>
                  <Pressable style={styles.saveBtn} onPress={handleSaveTimeSlot}>
                    <FontAwesome name="save" size={16} color="#fff" style={{marginRight: 4}} />
                    <Text style={styles.actionText}>Lưu</Text>
                  </Pressable>
                  <Pressable style={styles.cancelBtn} onPress={handleCancelTimeSlot}>
                    <FontAwesome name="times" size={16} color="#fff" style={{marginRight: 4}} />
                    <Text style={styles.actionText}>Hủy</Text>
                  </Pressable>
                </View>
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
    padding: wp("5%"),
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp("1%"),
  },
  headerIcon: {
    marginRight: wp("2%"),
    marginTop: 2,
  },
  title: {
    fontSize: wp("5.5%"),
    color: Color.primary,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    
  },
  subtitle: {
    fontSize: wp("4%"),
    color: Color.sub,
    fontFamily: FontFamily.segoeUI,
    marginLeft: wp("0.5%"),
    marginTop: hp("0.5%"),
  },
  form: {
    padding: wp("5%"),
  },
  inputGroup: {
    marginBottom: hp("2.5%"),
  },
  label: {
    fontSize: wp("4.5%"),
    color: Color.secondary,
    fontFamily: FontFamily.segoeUI,
    marginBottom: hp("1%"),
    fontWeight: "600",
    marginLeft: hp("0.5%"),
  },
  required: {
    color: '#FF3B30',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: Border.br_9xs,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: wp("3%"),
  },
  inputIcon: {
    marginRight: wp("2%"),
  },
  input: {
    flex: 1,
    padding: wp("3%"),
    fontSize: wp("4%"),
    fontFamily: FontFamily.segoeUI,
    color: Color.secondary,
  },
  textAreaWrapper: {
    alignItems: 'flex-start',
    paddingVertical: wp("2%"),
  },
  textArea: {
    height: hp("15%"),
    paddingTop: 0,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  updateButton: {
    backgroundColor: Color.primary,
    borderRadius: Border.br_9xs,
    padding: wp("4%"),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp("2%"),
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonIcon: {
    marginRight: wp("2%"),
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: Color.white,
    fontSize: wp("4%"),
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
  },
  tabNav: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    overflow: "hidden",
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  tabItemActive: {
    backgroundColor: Color.primary,
  },
  tabText: {
    color: Color.secondary,
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#fff",
  },
  tabContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  tableTypeItem: {
    backgroundColor: "#fffbe7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f4d27a",
  },
  tableTypeItemEditing: {
    borderColor: Color.primary,
    backgroundColor: '#fff3e0',
    shadowColor: Color.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  tableTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  tableTypeText: {
    fontWeight: "600",
    marginBottom: 4
  },
  tableTypeActions: {
    flexDirection: "row",
    gap: 12
  },
  editBtn: {
    backgroundColor: Color.primary,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8
  },
  deleteBtn: {
    backgroundColor: "#FF3B30",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  actionText: {
    color: "#fff",
    fontWeight: "600"
  },
  tableTypeForm: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 16,
    marginTop: 16
  },
  formTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 8
  },
  formActions: {
    flexDirection: "row",
    marginTop: 12,
    gap: 12
  },
  saveBtn: {
    backgroundColor: Color.primary,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8
  },
  cancelBtn: {
    backgroundColor: "#aaa",
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  tableTypeBadges: {
    flexDirection: 'row',
    gap: 0,
    marginBottom: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3e0',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Color.primary,
    marginLeft: 14
  },
  badgeText: {
    color: Color.primary,
    fontWeight: '600',
    fontSize: 13
  },
  timeSlotItem: {
    backgroundColor: "#fffbe7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f4d27a",
  },
  timeSlotItemEditing: {
    borderColor: Color.primary,
    backgroundColor: '#fff3e0',
    shadowColor: Color.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  timeSlotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  timeSlotText: {
    fontWeight: "600",
    marginBottom: 4
  },
  timeSlotBadges: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  timeSlotActions: {
    flexDirection: "row",
    marginTop: 4,
    gap: 12
  },
  timeSlotForm: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 16,
    marginTop: 16
  },
});

export default EditRestaurant; 