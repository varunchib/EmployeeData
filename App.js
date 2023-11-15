import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput } from 'react-native';

const API_URL = 'https://mocki.io/v1/3a4b56bd-ad05-4b12-a181-1eb9a4f5ac8d';

const EmployeeCard = ({ employee }) => {
  return (
    <View style={[styles.card, { backgroundColor: employee.backgroundColor }]}>
      <Text style={styles.name}>{employee.name}</Text>
      <Text>Email: {employee.email}</Text>
      <Text>Phone: {employee.phone}</Text>
      <Text>Manager: {employee.parentId ? `Employee ${employee.parentId}` : 'None'}</Text>
    </View>
  );
};

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [isListMode, setIsListMode] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeEmail, setNewEmployeeEmail] = useState('');
  const [newEmployeePhone, setNewEmployeePhone] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setIsListMode(false);
  };

  const handleToggleViewMode = () => {
    setIsListMode(!isListMode);
  };

  const handleAddEmployee = () => {
    const newEmployee = {
      id: Math.random().toString(36).substr(2, 9),
      name: newEmployeeName,
      email: newEmployeeEmail,
      phone: newEmployeePhone,
      backgroundColor: '#f5f5f5',
    };

    setEmployees([...employees, newEmployee]);
    setNewEmployeeName('');
    setNewEmployeeEmail('');
    setNewEmployeePhone('');
  };

  return (
    <View style={styles.container}>
      {isListMode ? (
        <View>
          <Button title="Switch to Single View" onPress={handleToggleViewMode} />
          <FlatList
            data={employees}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Button
                title={item.name}
                onPress={() => handleEmployeeSelect(item)}
              />
            )}
          />
        </View>
      ) : (
        <View>
          <EmployeeCard employee={selectedEmployee} />
          <Button title="Switch to List View" onPress={handleToggleViewMode} />
        </View>
      )}

      <Text style={styles.heading}>Add Employee</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter employee name"
        value={newEmployeeName}
        onChangeText={(text) => setNewEmployeeName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter employee email"
        value={newEmployeeEmail}
        onChangeText={(text) => setNewEmployeeEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter employee phone"
        value={newEmployeePhone}
        onChangeText={(text) => setNewEmployeePhone(text)}
      />
      <Button title="Add Employee" onPress={handleAddEmployee} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 200,
    paddingBottom: 200,
  },
  card: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    width: '90%',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default App;

