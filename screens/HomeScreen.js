import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.iconRing}>
        <View style={styles.pulseRing} />
        <View style={styles.crossV} />
        <View style={styles.crossH} />
      </View>

      <Text style={styles.title}>Cancer Risk{'\n'}Predictor</Text>
      <Text style={styles.subtitle}>AI-assisted screening for early awareness</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNum}>3</Text>
          <Text style={styles.statLbl}>Risk Factors</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNum}>98%</Text>
          <Text style={styles.statLbl}>Model Accuracy</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate('Input')}>
        <Text style={styles.btnPrimaryText}>Begin Assessment</Text>
      </TouchableOpacity>

      <Text style={styles.disclaimer}>
        Not a medical diagnosis. Consult a healthcare professional.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#0B1120',
    alignItems: 'center', justifyContent: 'center', padding: 28,
  },
  iconRing: {
    width: 88, height: 88, borderRadius: 44,
    borderWidth: 1.5, borderColor: '#17B98A',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 24, position: 'relative',
  },
  pulseRing: {
    position: 'absolute', inset: -10, width: 108, height: 108,
    borderRadius: 54, borderWidth: 1, borderColor: 'rgba(23,185,138,0.2)',
    top: -10, left: -10,
  },
  crossV: {
    position: 'absolute', width: 4, height: 32,
    backgroundColor: '#17B98A', borderRadius: 2,
  },
  crossH: {
    position: 'absolute', width: 32, height: 4,
    backgroundColor: '#17B98A', borderRadius: 2,
  },
  title: {
    fontSize: 30, fontWeight: '700', color: '#E8F0F8',
    textAlign: 'center', lineHeight: 36, letterSpacing: -0.5, marginBottom: 10,
  },
  subtitle: {
    fontSize: 14, color: '#6A87A8', textAlign: 'center',
    lineHeight: 20, marginBottom: 32,
  },
  statsRow: {
    flexDirection: 'row', gap: 12, marginBottom: 32, width: '100%',
  },
  statCard: {
    flex: 1, backgroundColor: '#101E33',
    borderWidth: 0.5, borderColor: '#1E2D47',
    borderRadius: 12, padding: 16, alignItems: 'center',
  },
  statNum: { fontSize: 22, fontWeight: '700', color: '#17B98A' },
  statLbl: { fontSize: 11, color: '#4D6A85', marginTop: 4 },
  btnPrimary: {
    backgroundColor: '#17B98A', borderRadius: 14,
    paddingVertical: 15, width: '100%', alignItems: 'center', marginBottom: 12,
  },
  btnPrimaryText: { color: '#071220', fontSize: 15, fontWeight: '700' },
  disclaimer: {
    fontSize: 11, color: '#2E4560', textAlign: 'center',
    lineHeight: 17, marginTop: 16,
  },
});