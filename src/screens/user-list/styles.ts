import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flex:1 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20 },
  switch: { flexDirection: 'row', marginBottom: 16 },
  button: { padding: 10, borderRadius: 8, marginRight: 10, backgroundColor: '#eee' },
  activeButton: { backgroundColor: '#dbeafe' },
  text: { color: '#333' },
  activeText: { color: '#2563eb', fontWeight: 'bold' },
  listContainer: { marginTop:16 },
  searchInput: {
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 8,
  padding: 10,
  marginBottom: 12,
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