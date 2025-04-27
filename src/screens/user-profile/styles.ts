import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#4F46E5',
  },
  placeholderCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    backgroundColor: '#4F46E5', // same nice blue
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#111827',
  },
  email: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 5,
  },
  role: {
    fontSize: 18,
    fontWeight: '500',
    color: '#374151',
    marginTop: 8,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 8,
  },
  retryText: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 8,
  },
});

export default styles;