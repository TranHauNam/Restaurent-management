import React from "react";
import { View, Text } from "react-native";

import { styles } from "@/styles/history-view/booked-history/history-booked-detail";
import { Typography } from "@/styles/Typography";

export const BookingDetailInfo = ({
  code,
  bookingCode,
  date,
  time,
  people,
  name,
  phone,
  email,
  note,
}) => {
  const infoList = [
    { label: "Mã đặt bàn", value: code },
    { label: "Mã code", value: bookingCode },
    { label: "Thời gian đặt bàn", value: `${date} - ${time}` },
    { label: "Số lượng người", value: `${people} người` },
    { label: "Họ tên", value: name },
    { label: "Số điện thoại", value: phone },
    { label: "Email", value: email },
    { label: "Ghi chú", value: note },
  ];

  return (
    <>
      {infoList.map((item, idx) => (
        <View style={styles.detailRow} key={idx}>
          <Text style={[Typography.label, styles.detailLabel]}>{item.label}</Text>
          <Text style={[Typography.paragraph, styles.detailValue]}>{item.value}</Text>
        </View>
      ))}
    </>
  );
};