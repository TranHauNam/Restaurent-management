module.exports = (strTime) => {
    const [h, m] = strTime.split(':').map(Number);
    return h * 60 + m;
}
// 18:00