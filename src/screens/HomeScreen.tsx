
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import useControllers from '../controllers/index';
import { usePromiseTracker } from 'react-promise-tracker';
import { HomeScreenProps } from '../types/home';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // promise tracker
  const { promiseInProgress } = usePromiseTracker();

  // controllers
  const { useHomeController } = useControllers();
  const { fetchJoke, joke, error } = useHomeController();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Chuck Norris Joke</Text>

        <View style={styles.content}>
          {promiseInProgress && (
            <ActivityIndicator size="large" color="#0066cc" />
          )}

          {error && (
            <Text style={styles.error}>{error}</Text>
          )}

          {joke && !promiseInProgress && (
            <Text style={styles.jokeText}>{joke}</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={fetchJoke} disabled={promiseInProgress}>
            <Text style={styles.buttonText}>{'Get New Joke'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.navigate('Form')}>
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>Go to Form</Text>
          </TouchableOpacity>
        </View>
      </View >
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  content: {
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  jokeText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    textAlign: 'center',
  },
  error: {
    color: '#dc2626',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#0066cc',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0066cc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#0066cc',
  },
});


export default HomeScreen;
