import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator, SafeAreaView, Pressable } from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuthContext } from '../../../contexts/auth-context';
import { API_URL } from '../../../services/config';
import { Color, FontFamily, FontSize, Border } from '../../../styles/GlobalStyles';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const screenWidth = Dimensions.get('window').width;

const TABS = [
  { key: 'week', label: 'Theo tuần' },
  { key: 'year', label: 'Theo năm' },
  { key: 'range', label: 'Khoảng thời gian' },
];

export default function Statistics() {
  const { adminToken } = useAuthContext();
  const [tab, setTab] = useState('week');
  const [year, setYear] = useState(new Date().getFullYear());
  const [range, setRange] = useState({ start: new Date(), end: new Date() });
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancel = false;
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        let url = '';
        if (tab === 'week') {
          url = `${API_URL}/api/admin/revenue/weekly`;
        } else if (tab === 'year') {
          url = `${API_URL}/api/admin/revenue/yearly?year=${year}`;
        } else if (tab === 'range') {
          const startDate = range.start.toISOString().slice(0, 10);
          const endDate = range.end.toISOString().slice(0, 10);
          url = `${API_URL}/api/admin/revenue/range?startDate=${startDate}&endDate=${endDate}`;
        }
        console.log('Fetching data from:', url);
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        if (!res.ok) throw new Error('Lỗi server');
        const resData = await res.json();
        console.log('Received data:', resData);
        if (cancel) return;
        if (tab === 'week') {
          setData(resData.map((item, idx) => {
            console.log('Weekly data item:', item);
            return { ...item, label: getWeekdayLabel(idx) };
          }));
        } else if (tab === 'year') {
          setData(resData.map((item, idx) => {
            console.log('Yearly data item:', item);
            return { ...item, label: `T${idx + 1}` };
          }));
        } else {
          setData(resData.map(item => {
            console.log('Range data item:', item);
            return { ...item, label: item._id || item.date || item.month };
          }));
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Không thể tải dữ liệu.');
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => { cancel = true; };
  }, [tab, year, range, adminToken]);

  function getWeekdayLabel(idx) {
    const weekdays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    return weekdays[idx] || '';
  }

  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.total || 0),
      },
    ],
  };

  // Convert data for Gifted Charts - Fix data transformation
  const giftedData = data.map(item => ({
    value: parseFloat(item.total) || 0,  // Ensure number conversion
    label: item.label,
    frontColor: Color.primary,
    topLabelComponent: () => (
      <Text style={{ color: Color.secondary, fontSize: 10 }}>
        {(item.total || 0).toLocaleString()}đ
      </Text>
    )
  }));

  const total = data.reduce((sum, d) => sum + (d.total || 0), 0);

  // Hàm làm tròn max value lên số đẹp (5tr, 10tr, 100tr...)
  function getNiceMax(max) {
    if (max <= 0) return 1000000;
    const digits = Math.pow(10, Math.floor(Math.log10(max)));
    const rounded = Math.ceil(max / digits) * digits;
    if (rounded / digits < 2) return 2 * digits;
    if (rounded / digits < 5) return 5 * digits;
    return 10 * digits;
  }
  const maxValue = Math.max(...data.map(item => item.total || 0), 0);
  const niceMax = getNiceMax(maxValue);
  const yInterval = niceMax / 5;

  // Tính toán số liệu phụ
  let maxLabel = '';
  let avgValue = 0;
  let maxLabelTitle = '';
  let avgLabelTitle = '';
  if (tab === 'year') {
    const maxMonth = data.reduce((a, b) => (a.total > b.total ? a : b), { total: 0 });
    maxLabel = maxMonth.label || '';
    avgValue = data.length ? Math.round(total / data.length) : 0;
    maxLabelTitle = 'Tháng cao nhất';
    avgLabelTitle = 'Trung bình/tháng';
  } else {
    const maxDay = data.reduce((a, b) => (a.total > b.total ? a : b), { total: 0 });
    maxLabel = maxDay.label || '';
    avgValue = data.length ? Math.round(total / data.length) : 0;
    maxLabelTitle = 'Ngày cao nhất';
    avgLabelTitle = 'Trung bình/ngày';
  }
  const avgPerDay = data.length ? Math.round(total / data.length) : 0;
  const chartWidth = Math.max(screenWidth - 32, data.length * 60);
  const chartHeight = 350;

  const renderChart = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={Color.primary} style={{ marginTop: 40 }} />;
    }
    if (error) {
      return <Text style={styles.error}>{error}</Text>;
    }
    if (data.length === 0) {
      return <Text style={styles.empty}>Không có dữ liệu</Text>;
    }

    const commonProps = {
      data: giftedData,
      width: chartWidth,
      height: chartHeight - 50,
      hideRules: false,  // Show grid lines
      backgroundColor: Color.white,
      noOfSections: 5,
      maxValue: niceMax,
      yAxisTextStyle: { color: Color.secondary },
      xAxisTextStyle: { color: Color.secondary },
      yAxisLabelWidth: 60,
      spacing: data.length > 10 ? chartWidth / data.length : 40,
      formatYLabel: (y) => Math.round(y).toLocaleString(),
      showFractionalValues: false,
      showXAxisIndices: true,
      showYAxisIndices: true,
      xAxisIndicesHeight: 2,
      xAxisIndicesColor: Color.primary,
      yAxisIndicesWidth: 2,
      yAxisIndicesColor: Color.primary,
      yAxisThickness: 1,
      xAxisThickness: 1,
      yAxisTextNumberOfLines: 1,
      yAxisLabelPrefix: "",
      yAxisLabelSuffix: "đ",
      rulesType: 'solid',
      rulesColor: 'lightgray',
      showVerticalLines: true,
      verticalLinesColor: 'rgba(0,0,0,0.1)',
      initialSpacing: 20,
      endSpacing: 20,
    };

    if (tab === 'range') {
      return (
        <LineChart
          {...commonProps}
          curved
          color={Color.primary}
          thickness={2}
          hideDataPoints={false}
          dataPointsColor={Color.primary}
          dataPointsRadius={4}
          startFillColor={Color.primary}
          endFillColor={Color.white}
          startOpacity={0.3}
          endOpacity={0.1}
          adjustToWidth
          focusEnabled
          pressEnabled
          showDataPointOnPress
          showTextOnPress
          textShiftY={-20}
          textShiftX={-20}
          textColor={Color.primary}
        />
      );
    }

    return (
      <BarChart
        {...commonProps}
        barWidth={data.length > 10 ? (chartWidth / data.length) - 10 : 30}
        frontColor={Color.primary}
        barBorderRadius={4}
        disablePress={false}
        pressEnabled
        showGradient
        gradientColor={Color.lightsub}
        showReferenceLine1
        referenceLine1Position={avgValue}
        referenceLine1Config={{
          color: Color.secondary,
          dashWidth: 2,
          dashGap: 3,
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <FontAwesome name="bar-chart" size={22} color={Color.primary} style={styles.headerIcon} />
            <Text style={styles.title}>Thống kê doanh thu</Text>
          </View>
          <Text style={styles.subtitle}>Xem báo cáo doanh thu nhà hàng</Text>
        </View>
        <View style={styles.tabNav}>
          {TABS.map(t => (
            <Pressable
              key={t.key}
              style={[styles.tabItem, tab === t.key && styles.tabItemActive]}
              onPress={() => setTab(t.key)}
            >
              <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>{t.label}</Text>
            </Pressable>
          ))}
        </View>
        {tab === 'year' && (
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Năm:</Text>
            <TouchableOpacity onPress={() => setYear(y => y - 1)} style={styles.yearBtn}><Text style={styles.yearBtnText}>-</Text></TouchableOpacity>
            <Text style={styles.yearText}>{year}</Text>
            <TouchableOpacity onPress={() => setYear(y => y + 1)} style={styles.yearBtn}><Text style={styles.yearBtnText}>+</Text></TouchableOpacity>
          </View>
        )}
        {tab === 'range' && (
          <View style={styles.filterRow}>
            <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.dateBtn}>
              <Text>Ngày bắt đầu: <Text style={styles.dateText}>{range.start.toLocaleDateString()}</Text></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.dateBtn}>
              <Text>Ngày kết thúc: <Text style={styles.dateText}>{range.end.toLocaleDateString()}</Text></Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={range.start}
                mode="date"
                onChange={(_, date) => {
                  setShowStartPicker(false);
                  if (date) setRange(r => ({ ...r, start: date }));
                }}
              />
            )}
            {showEndPicker && (
              <DateTimePicker
                value={range.end}
                mode="date"
                onChange={(_, date) => {
                  setShowEndPicker(false);
                  if (date) setRange(r => ({ ...r, end: date }));
                }}
              />
            )}
          </View>
        )}
        {/* Biểu đồ */}
        <ScrollView horizontal contentContainerStyle={{ minWidth: screenWidth - 32, paddingHorizontal: 16 }}>
          {renderChart()}
        </ScrollView>
        {/* Tổng doanh thu, số liệu phụ */}
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Tổng doanh thu:</Text>
          <Text style={styles.totalValue}>{total.toLocaleString()} đ</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statsText}>
            {maxLabelTitle}: <Text style={styles.statsValue}>{maxLabel}</Text>
          </Text>
          <Text style={styles.statsText}>
            {avgLabelTitle}: <Text style={styles.statsValue}>{avgValue.toLocaleString()} đ</Text>
          </Text>
        </View>
      </ScrollView>
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
  tabNav: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    overflow: 'hidden',
    height: 42,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    height: 42,
    justifyContent: 'center',
  },
  tabItemActive: {
    backgroundColor: Color.primary,
  },
  tabText: {
    color: Color.secondary,
    fontWeight: '600',
    // fontSize: 16,
    // fontFamily: FontFamily.segoeUI,
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '600',
    // fontSize: 16,
    // fontFamily: FontFamily.segoeUI,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  filterLabel: {
    fontSize: FontSize.size_m,
    marginRight: 8,
    color: Color.secondary,
    fontFamily: FontFamily.segoeUI,
  },
  yearBtn: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: Color.lightsub,
    borderRadius: Border.br_9xs,
    marginHorizontal: 2,
  },
  yearBtnText: {
    fontSize: FontSize.size_l,
    color: Color.primary,
    fontFamily: FontFamily.segoeUI,
  },
  yearText: {
    fontSize: FontSize.size_m,
    fontWeight: 'bold',
    marginHorizontal: 4,
    color: Color.secondary,
    fontFamily: FontFamily.segoeUI,
  },
  dateBtn: {
    padding: 6,
    backgroundColor: Color.lightsub,
    borderRadius: Border.br_9xs,
    marginHorizontal: 4,
  },
  dateText: {
    color: Color.primary,
    fontWeight: 'bold',
    fontFamily: FontFamily.segoeUI,
  },
  chart: {
    marginVertical: 8,
    borderRadius: Border.br_8xs,
  },
  totalBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: FontSize.size_m,
    color: Color.secondary,
    marginRight: 8,
    fontFamily: FontFamily.segoeUI,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Color.primary,
    fontFamily: FontFamily.segoeUI,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 40,
    fontFamily: FontFamily.segoeUI,
  },
  empty: {
    color: Color.tertiary,
    textAlign: 'center',
    marginTop: 40,
    fontFamily: FontFamily.segoeUI,
  },
  helperText: {
    color: Color.tertiary,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    marginTop: 4,
  },
  statsText: {
    color: Color.secondary,
    fontSize: 14,
  },
  statsValue: {
    color: Color.primary,
    fontWeight: 'bold',
  },
}); 