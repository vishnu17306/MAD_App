import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const RISK_CONFIG = {
  Low: {
    color: '#17B98A',
    filled: 3,
    recs: [
      'Schedule your annual check-up',
      'Reduce outdoor pollutant exposure',
      'Maintain a balanced diet & exercise',
    ],
  },
  Medium: {
    color: '#EAB500',
    filled: 5,
    recs: [
      'Consult a specialist soon',
      'Quit smoking immediately',
      'Monitor symptoms closely',
    ],
  },
  High: {
    color: '#E74C3C',
    filled: 7,
    recs: [
      'Seek medical attention urgently',
      'Book a specialist consultation',
      'Avoid all tobacco products',
    ],
  },
};

export default function ResultScreen({ route, navigation }) {
  const { result } = route.params;

  // Case-insensitive + whitespace-safe lookup
  const key = Object.keys(RISK_CONFIG).find(
    k => k.toLowerCase() === (result || '').trim().toLowerCase()
  );
  const config = RISK_CONFIG[key] || RISK_CONFIG['Low'];
  const displayResult = (result || '').trim();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTag}>— Your Results</Text>

      {/* Badge */}
      <View style={styles.badgeWrap}>
        <View style={[styles.badgeRing, { borderColor: config.color }]}>
          <View style={[styles.badgeInnerRing, { borderColor: config.color }]} />
          <Text style={[styles.badgeLevel, { color: config.color }]}>
            {displayResult}
          </Text>
        </View>
        <Text style={styles.badgeSub}>Risk Level Detected</Text>
      </View>

      {/* Risk Gauge */}
      <View style={styles.gaugeWrap}>
        <Text style={styles.gaugeLabel}>Risk spectrum</Text>
        <View style={styles.gaugeBar}>
          {[...Array(7)].map((_, i) => {
            const isFilled = i < config.filled;
            let segColor = '#1E2D47';
            if (isFilled) {
              if (i < 3) segColor = '#17B98A';
              else if (i < 5) segColor = '#EAB500';
              else segColor = '#E74C3C';
            }
            return <View key={i} style={[styles.seg, { backgroundColor: segColor }]} />;
          })}
        </View>
        <View style={styles.gaugeLabelsRow}>
          <Text style={styles.gaugeLabelText}>Low</Text>
          <Text style={styles.gaugeLabelText}>Medium</Text>
          <Text style={styles.gaugeLabelText}>High</Text>
        </View>
      </View>

      {/* Recommendations */}
      <View style={styles.recCard}>
        <Text style={[styles.recTitle, { color: config.color }]}>
          Recommendations
        </Text>
        {config.recs.map((rec, i) => (
          <View key={i} style={styles.recRow}>
            <View style={[styles.recDot, { backgroundColor: config.color }]} />
            <Text style={styles.recText}>{rec}</Text>
          </View>
        ))}
      </View>

      {/* Disclaimer */}
      <View style={styles.disclaimerCard}>
        <Text style={styles.disclaimerText}>
          ⚠ This is not a medical diagnosis. Please consult a licensed
          healthcare professional for proper evaluation.
        </Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={[styles.btnPrimary, { backgroundColor: config.color }]}
        onPress={() => {}}>
        <Text style={styles.btnPrimaryText}>Share with Doctor</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnOutline}
        onPress={() => navigation.navigate('Input')}>
        <Text style={styles.btnOutlineText}>Reassess</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  sectionTag: {
    fontSize: 11,
    fontWeight: '600',
    color: '#17B98A',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 28,
  },

  // Badge
  badgeWrap: {
    alignItems: 'center',
    marginBottom: 32,
  },
  badgeRing: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(23,185,138,0.07)',
    marginBottom: 14,
    position: 'relative',
  },
  badgeInnerRing: {
    position: 'absolute',
    width: 126,
    height: 126,
    borderRadius: 63,
    borderWidth: 1,
    borderStyle: 'dashed',
    opacity: 0.3,
  },
  badgeLevel: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  badgeSub: {
    fontSize: 13,
    color: '#6A87A8',
    letterSpacing: 0.5,
  },

  // Gauge
  gaugeWrap: {
    marginBottom: 28,
  },
  gaugeLabel: {
    fontSize: 11,
    color: '#4D6A85',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  gaugeBar: {
    flexDirection: 'row',
    gap: 4,
    height: 6,
  },
  seg: {
    flex: 1,
    borderRadius: 3,
  },
  gaugeLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  gaugeLabelText: {
    fontSize: 10,
    color: '#3A5470',
  },

  // Recommendations
  recCard: {
    backgroundColor: '#101E33',
    borderWidth: 0.5,
    borderColor: '#1E2D47',
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
  },
  recTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  recRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 12,
  },
  recDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 5,
    flexShrink: 0,
  },
  recText: {
    fontSize: 14,
    color: '#8AACCC',
    lineHeight: 20,
    flex: 1,
  },

  // Disclaimer
  disclaimerCard: {
    backgroundColor: 'rgba(30,45,71,0.5)',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#1E2D47',
    padding: 14,
    marginBottom: 24,
  },
  disclaimerText: {
    fontSize: 11,
    color: '#4D6A85',
    lineHeight: 17,
    textAlign: 'center',
  },

  // Buttons
  btnPrimary: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnPrimaryText: {
    color: '#071220',
    fontSize: 15,
    fontWeight: '700',
  },
  btnOutline: {
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#1E2D47',
  },
  btnOutlineText: {
    color: '#6A87A8',
    fontSize: 14,
    fontWeight: '500',
  },
});