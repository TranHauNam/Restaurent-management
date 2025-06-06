import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Alert, Modal, StyleSheet, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { API_URL } from "../../../services/config";
import { useAuthContext } from "../../../contexts/auth-context";
import { Color, FontFamily, Border, FontSize } from '../../../styles/GlobalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const emptyForm = {
    name: '',
    price: '',
    description: '',
    image: '',
};

export default function ManageFood() {
    const { adminToken } = useAuthContext();
    const [foods, setFoods] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [showDeleteId, setShowDeleteId] = useState(null);

    useEffect(() => {
        fetchFoods();
    }, []);

    const fetchFoods = async (q = '') => {
        setLoading(true);
        try {
            let url = `${API_URL}/api/admin/food`;
            if (q) url = `${API_URL}/api/admin/food/search?q=${encodeURIComponent(q)}`;
            const res = await fetch(url, {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            const data = await res.json();
            setFoods(Array.isArray(data) ? data : data.foods || []);
        } catch (err) {
            //
        }
        setLoading(false);
    };

    const handleSearch = () => {
        fetchFoods(search);
    };

    const handleEdit = (food) => {
        setForm({
            name: food.name,
            price: String(food.price),
            description: food.description,
            image: food.image,
        });
        setEditingId(food._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}/api/admin/food/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            fetchFoods();
        } catch (err) {}
        setShowDeleteId(null);
    };

    const handleSave = async () => {
        if (!form.name || !form.price) {
            Alert.alert('Lỗi', 'Vui lòng nhập tên và giá món ăn');
            return;
        }
        try {
            const method = editingId ? 'PUT' : 'POST';
            const url = editingId ? `${API_URL}/api/admin/food/${editingId}` : `${API_URL}/api/admin/food`;
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${adminToken}`,
                },
                body: JSON.stringify({
                    name: form.name,
                    price: Number(form.price),
                    description: form.description,
                    image: form.image,
                }),
            });
            setShowForm(false);
            setForm(emptyForm);
            setEditingId(null);
            fetchFoods();
        } catch (err) {}
    };

    const handleAdd = () => {
        setForm(emptyForm);
        setEditingId(null);
        setShowForm(true);
    };

    const renderFood = ({ item }) => (
        <View style={styles.foodItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.foodImage} />
                ) : (
                    <View style={styles.foodImagePlaceholder}>
                        <FontAwesome name="cutlery" size={24} color={Color.sub} />
                    </View>
                )}
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.foodName}>{item.name}</Text>
                    <Text style={styles.foodPrice}>Giá: {item.price?.toLocaleString()} VND</Text>
                    <Text style={styles.foodDesc} numberOfLines={2}>{item.description}</Text>
                </View>
            </View>
            <View style={styles.foodActions}>
                <Pressable style={styles.actionBtn} onPress={() => handleEdit(item)}>
                    <FontAwesome name="pencil" size={16} color={Color.primary} style={{marginRight: 4}} />
                    <Text style={styles.actionText}>Chỉnh sửa</Text>
                </Pressable>
                <Pressable style={styles.actionBtnDelete} onPress={() => setShowDeleteId(item._id)}>
                    <FontAwesome name="trash" size={16} color="#fff" style={{marginRight: 4}} />
                    <Text style={styles.actionTextDelete}>Xóa</Text>
                </Pressable>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <FontAwesome name="cutlery" size={22} color={Color.primary} style={styles.headerIcon} />
                        <Text style={styles.title}>Quản lý món ăn</Text>
                    </View>
                    <Text style={styles.subtitle}>Thêm, sửa, xóa món ăn của nhà hàng</Text>
                </View>
                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm kiếm món ăn..."
                        value={search}
                        onChangeText={setSearch}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                        placeholderTextColor={Color.sub}
                    />
                    <TouchableOpacity onPress={handleSearch} style={styles.searchBtn}>
                        <FontAwesome name="search" size={18} color={Color.white} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleAdd} style={styles.addBtn}>
                        <FontAwesome name="plus" size={18} color={Color.white} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={foods}
                    keyExtractor={item => item._id}
                    renderItem={renderFood}
                    refreshing={loading}
                    onRefresh={() => fetchFoods(search)}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 30, color: Color.sub }}>Không có món ăn nào</Text>}
                />
            </ScrollView>
            {/* Form thêm/sửa món ăn */}
            <Modal visible={showForm} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <ScrollView>
                            <Text style={styles.modalTitle}>{editingId ? 'Chỉnh sửa món ăn' : 'Thêm món ăn'}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Tên món ăn"
                                value={form.name}
                                onChangeText={v => setForm(f => ({ ...f, name: v }))}
                                placeholderTextColor={Color.sub}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Giá món ăn"
                                value={form.price}
                                onChangeText={v => setForm(f => ({ ...f, price: v.replace(/[^0-9]/g, '') }))}
                                keyboardType="numeric"
                                placeholderTextColor={Color.sub}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Mô tả"
                                value={form.description}
                                onChangeText={v => setForm(f => ({ ...f, description: v }))}
                                multiline
                                placeholderTextColor={Color.sub}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Link hình ảnh (URL)"
                                value={form.image}
                                onChangeText={v => setForm(f => ({ ...f, image: v }))}
                                placeholderTextColor={Color.sub}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <Pressable style={styles.saveBtn} onPress={handleSave}>
                                    <FontAwesome name="save" size={16} color={Color.white} style={{marginRight: 4}} />
                                    <Text style={styles.saveBtnText}>Lưu</Text>
                                </Pressable>
                                <Pressable style={styles.cancelBtn} onPress={() => { setShowForm(false); setEditingId(null); }}>
                                    <FontAwesome name="times" size={16} color={Color.white} style={{marginRight: 4}} />
                                    <Text style={styles.cancelBtnText}>Hủy</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            {/* Xác nhận xóa */}
            <Modal visible={!!showDeleteId} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.confirmBox}>
                        <Text style={{ fontSize: FontSize.size_l, marginBottom: 20, color: Color.secondary, fontFamily: FontFamily.segoeUI }}>Bạn có chắc muốn xóa món ăn này?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Pressable style={styles.saveBtn} onPress={() => handleDelete(showDeleteId)}>
                                <FontAwesome name="trash" size={16} color={Color.white} style={{marginRight: 4}} />
                                <Text style={styles.saveBtnText}>Xóa</Text>
                            </Pressable>
                            <Pressable style={styles.cancelBtn} onPress={() => setShowDeleteId(null)}>
                                <FontAwesome name="times" size={16} color={Color.white} style={{marginRight: 4}} />
                                <Text style={styles.cancelBtnText}>Hủy</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

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
    headerIcon: {
        marginRight: wp('2%'),
        marginTop: 2,
    },
    title: {
        fontSize: wp('5.5%'),
        color: Color.primary,
        fontFamily: FontFamily.segoeUI,
        fontWeight: '700',
    },
    subtitle: {
        fontSize: wp('4%'),
        color: Color.sub,
        fontFamily: FontFamily.segoeUI,
        marginLeft: wp('0.5%'),
        marginTop: hp('0.5%'),
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16,
        backgroundColor: Color.lightsub,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: FontSize.size_m,
        fontFamily: FontFamily.segoeUI,
        color: Color.secondary,
    },
    searchBtn: {
        backgroundColor: Color.primary,
        padding: 8,
        borderRadius: 6,
        marginLeft: 6,
    },
    addBtn: {
        backgroundColor: Color.primary,
        padding: 8,
        borderRadius: 6,
        marginLeft: 6,
    },
    foodItem: {
        backgroundColor: Color.lightPrimary,
        borderRadius: 10,
        marginHorizontal: 16,
        marginVertical: 6,
        padding: 12,
        borderWidth: 1,
        borderColor: Color.primary,
        shadowColor: Color.primary,
        shadowOpacity: 0.04,
        shadowRadius: 2,
        elevation: 1,
    },
    foodImage: { width: 56, height: 56, borderRadius: 8, backgroundColor: Color.lightsub },
    foodImagePlaceholder: {
        width: 56, height: 56, borderRadius: 8, backgroundColor: Color.lightsub, alignItems: 'center', justifyContent: 'center',
    },
    foodName: { fontSize: FontSize.size_l, fontWeight: 'bold', color: Color.secondary, fontFamily: FontFamily.segoeUI },
    foodPrice: { fontSize: FontSize.size_m, color: Color.primary, marginTop: 2, fontFamily: FontFamily.segoeUI },
    foodDesc: { fontSize: FontSize.size_s, color: Color.tertiary, marginTop: 2, fontFamily: FontFamily.segoeUI },
    foodActions: { flexDirection: 'row', marginTop: 8 },
    actionBtn: {
        backgroundColor: Color.lightPrimary,
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Color.primary,
    },
    actionBtnDelete: {
        backgroundColor: '#FF3B30',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        color: Color.primary,
        fontWeight: '600',
        fontSize: FontSize.size_s,
        fontFamily: FontFamily.segoeUI,
    },
    actionTextDelete: {
        color: '#fff',
        fontWeight: '600',
        fontSize: FontSize.size_s,
        fontFamily: FontFamily.segoeUI,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: Color.white,
        borderRadius: 12,
        padding: 20,
        shadowColor: Color.primary,
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        maxHeight: '80%',
    },
    modalTitle: { fontSize: FontSize.size_xl, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', color: Color.primary, fontFamily: FontFamily.segoeUI },
    input: {
        borderWidth: 1,
        borderColor: Color.divider,
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
        fontSize: FontSize.size_m,
        backgroundColor: Color.lightsub,
        color: Color.secondary,
        fontFamily: FontFamily.segoeUI,
    },
    saveBtn: {
        backgroundColor: Color.primary,
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 8,
    },
    saveBtnText: {
        color: Color.white,
        fontWeight: 'bold',
        fontSize: FontSize.size_m,
        fontFamily: FontFamily.segoeUI,
    },
    cancelBtn: {
        backgroundColor: Color.sub,
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
    },
    cancelBtnText: {
        color: Color.white,
        fontWeight: 'bold',
        fontSize: FontSize.size_m,
        fontFamily: FontFamily.segoeUI,
    },
    confirmBox: {
        width: 280,
        backgroundColor: Color.white,
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
        shadowColor: Color.primary,
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
}); 