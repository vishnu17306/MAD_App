import Slider from '@react-native-community/slider';
import { useState } from 'react';
import {
  Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';

const SECTIONS = [
  {
    title: 'Personal Info',
    fields: [
      { key: 'Age', label: 'Age', min: 1, max: 100, step: 1, leftLabel: 'Young', rightLabel: 'Old', default: 30 },
    ],
  },
  {
    title: 'Lifestyle',
    fields: [
      { key: 'Smoking',       label: 'Smoking',        min: 1, max: 8, step: 1, leftLabel: 'Never', rightLabel: 'Heavy' },
      { key: 'Alcohol_use',   label: 'Alcohol Use',    min: 1, max: 8, step: 1, leftLabel: 'None',  rightLabel: 'Heavy' },
      { key: 'Obesity',       label: 'Obesity Level',  min: 1, max: 8, step: 1, leftLabel: 'Low',   rightLabel: 'High'  },
      { key: 'Balanced_Diet', label: 'Balanced Diet',  min: 1, max: 8, step: 1, leftLabel: 'Poor',  rightLabel: 'Good'  },
      { key: 'Passive_Smoker',label: 'Passive Smoker', min: 1, max: 8, step: 1, leftLabel: 'Never', rightLabel: 'Often' },
    ],
  },
  {
    title: 'Environment',
    fields: [
      { key: 'Air_Pollution',       label: 'Air Pollution',       min: 1, max: 8, step: 1, leftLabel: 'Low',  rightLabel: 'High' },
      { key: 'Dust_Allergy',        label: 'Dust Allergy',        min: 1, max: 8, step: 1, leftLabel: 'None', rightLabel: 'High' },
      { key: 'Occupational_Hazards',label: 'Occupational Hazards',min: 1, max: 8, step: 1, leftLabel: 'Low',  rightLabel: 'High' },
    ],
  },
  {
    title: 'Medical & Genetic',
    fields: [
      { key: 'Genetic_Risk',        label: 'Genetic Risk',         min: 1, max: 8, step: 1, leftLabel: 'Low',  rightLabel: 'High' },
      { key: 'chronic_Lung_Disease',label: 'Chronic Lung Disease', min: 1, max: 8, step: 1, leftLabel: 'None', rightLabel: 'High' },
    ],
  },
  {
    title: 'Symptoms',
    fields: [
      { key: 'Chest_Pain',              label: 'Chest Pain',               min: 1, max: 9, step: 1, leftLabel: 'None', rightLabel: 'Severe' },
      { key: 'Coughing_of_Blood',       label: 'Coughing of Blood',        min: 1, max: 9, step: 1, leftLabel: 'None', rightLabel: 'Often'  },
      { key: 'Fatigue',                 label: 'Fatigue',                  min: 1, max: 9, step: 1, leftLabel: 'None', rightLabel: 'Severe' },
      { key: 'Weight_Loss',             label: 'Weight Loss',              min: 1, max: 8, step: 1, leftLabel: 'None', rightLabel: 'High'   },
      { key: 'Shortness_of_Breath',     label: 'Shortness of Breath',      min: 1, max: 9, step: 1, leftLabel: 'None', rightLabel: 'Severe' },
      { key: 'Wheezing',                label: 'Wheezing',                 min: 1, max: 8, step: 1, leftLabel: 'None', rightLabel: 'Often'  },
      { key: 'Swallowing_Difficulty',   label: 'Swallowing Difficulty',    min: 1, max: 8, step: 1, leftLabel: 'None', rightLabel: 'High'   },
      { key: 'Clubbing_of_Finger_Nails',label: 'Clubbing of Finger Nails', min: 1, max: 9, step: 1, leftLabel: 'None', rightLabel: 'High'   },
      { key: 'Frequent_Cold',           label: 'Frequent Cold',            min: 1, max: 7, step: 1, leftLabel: 'None', rightLabel: 'Often'  },
      { key: 'Dry_Cough',               label: 'Dry Cough',                min: 1, max: 7, step: 1, leftLabel: 'None', rightLabel: 'Often'  },
      { key: 'Snoring',                 label: 'Snoring',                  min: 1, max: 7, step: 1, leftLabel: 'None', rightLabel: 'Often'  },
    ],
  },
];

const buildDefaults = () => {
  const d = { Gender: 1 };
  SECTIONS.forEach(s => s.fields.forEach(f => { d[f.key] = f.default ?? f.min; }));
  return d;
};

export default function InputScreen({ navigation }) {
  const [gender, setGender] = useState(1);
  const [values, setValues] = useState(buildDefaults());

  const setValue = (key, val) => setValues(prev => ({ ...prev, [key]: val }));

  const handlePredict = async () => {
    try {
      const payload = { ...values, Gender: gender };
      const response = await fetch('http://192.168.1.9:5001/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      navigation.navigate('Result', { result: data.prediction });
    } catch {
      Alert.alert('Connection Error', 'Cannot reach the prediction server.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTag}>— Risk Assessment</Text>

      {/* Progress bar */}
      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>

      {/* Gender toggle */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Biological sex</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, gender === 1 && styles.toggleActive]}
            onPress={() => setGender(1)}>
            <Text style={[styles.toggleText, gender === 1 && styles.toggleTextActive]}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, gender === 2 && styles.toggleActive]}
            onPress={() => setGender(2)}>
            <Text style={[styles.toggleText, gender === 2 && styles.toggleTextActive]}>Female</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* All sections */}
      {SECTIONS.map(section => (
        <View key={section.title}>
          <Text style={styles.sectionHeader}>{section.title}</Text>
          {section.fields.map(field => (
            <View key={field.key} style={styles.fieldGroup}>
              <View style={styles.fieldHeader}>
                <Text style={styles.fieldLabel}>{field.label}</Text>
                <Text style={styles.sliderVal}>{values[field.key]}</Text>
              </View>
              <Slider
                minimumValue={field.min}
                maximumValue={field.max}
                step={field.step}
                value={values[field.key]}
                onValueChange={val => setValue(field.key, val)}
                minimumTrackTintColor="#17B98A"
                maximumTrackTintColor="#1E2D47"
                thumbTintColor="#17B98A"
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabelText}>{field.leftLabel}</Text>
                <Text style={styles.sliderLabelText}>{field.rightLabel}</Text>
              </View>
            </View>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.btnPrimary} onPress={handlePredict}>
        <Text style={styles.btnText}>Analyze Risk</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B1120' },
  content: { padding: 24, paddingBottom: 48 },
  sectionTag: {
    fontSize: 11, fontWeight: '600', color: '#17B98A',
    letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16,
  },
  progressBar: {
    height: 3, backgroundColor: '#101E33',
    borderRadius: 2, marginBottom: 28, overflow: 'hidden',
  },
  progressFill: { height: '100%', width: '100%', backgroundColor: '#17B98A', borderRadius: 2 },
  sectionHeader: {
    fontSize: 13, fontWeight: '700', color: '#E8F0F8',
    marginBottom: 16, marginTop: 8,
    paddingBottom: 8, borderBottomWidth: 0.5, borderBottomColor: '#1E2D47',
  },
  fieldGroup: { marginBottom: 20 },
  fieldHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'baseline', marginBottom: 4,
  },
  fieldLabel: {
    fontSize: 11, color: '#4D6A85',
    letterSpacing: 1, textTransform: 'uppercase',
  },
  sliderVal: { fontSize: 18, fontWeight: '700', color: '#E8F0F8' },
  sliderLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 },
  sliderLabelText: { fontSize: 10, color: '#3A5470' },
  toggleRow: { flexDirection: 'row', gap: 10 },
  toggleBtn: {
    flex: 1, paddingVertical: 12, borderRadius: 10,
    borderWidth: 0.5, borderColor: '#1E2D47', alignItems: 'center',
  },
  toggleActive: { backgroundColor: 'rgba(23,185,138,0.1)', borderColor: '#17B98A' },
  toggleText: { fontSize: 14, color: '#6A87A8', fontWeight: '500' },
  toggleTextActive: { color: '#17B98A', fontWeight: '700' },
  btnPrimary: {
    backgroundColor: '#17B98A', borderRadius: 14,
    paddingVertical: 16, alignItems: 'center', marginTop: 16,
  },
  btnText: { color: '#071220', fontSize: 15, fontWeight: '700' },
});