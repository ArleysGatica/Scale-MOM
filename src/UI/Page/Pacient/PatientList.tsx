import * as React from 'react';
import { Appbar, Text, Button, Card, Avatar, IconButton } from 'react-native-paper';
import { fetchGetPatient } from '../../../services';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import { LayoutDrawer } from '../../Components/Drawer/LayoutDrawer';
import style from '../../Components/Login/Style.Login';

const ListPatient = () => {

  const [listPatient, setListPatient] = React.useState<Array<any>>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 4;

  const route = useRoute();

  const id = (route.params as any)?.id;

  const navigation = useNavigation();

  React.useEffect(() => {
    fetchGetPatient().then((response) => {
      setListPatient(response.pacientes);
    })
  }, [id]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredPatients = listPatient
    .slice(startIndex, endIndex)
    .filter((patient) =>
      patient.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

  React.useEffect(() => {
    fetchGetPatient().then((response) => {
      setListPatient(response.pacientes);
    });
  }, [currentPage, itemsPerPage, id]);

  const goToNextPage = () => {
    const totalPages = Math.ceil(listPatient.length / itemsPerPage);

    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <LayoutDrawer>
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
        <Text style={{ fontSize: 25 }}>
          Lista de pacientes
        </Text>
      </View>
      <View style={style.passwordContainer}>
        <TextInput
          testID="username-input"
          style={style.passwordInput}
          placeholderTextColor="gray"
          placeholder="Buscar paciente"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', maxHeight: "70%", rowGap: 10 }}>
        {
          filteredPatients.map((patient) => (
            //@ts-ignore 
            <TouchableOpacity onPress={() => { navigation.navigate('ProfilePatient', { id: patient.id }); }} key={patient.id}>
              <View style={styles.containerCard}>
                <Card.Title
                  style={{ width: '95%' }}
                  title={patient.username}
                  titleStyle={{ fontSize: 20, fontWeight: 'bold', width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}
                  subtitle={patient.edad}
                  subtitleStyle={{ fontSize: 15, width: '100%', justifyContent: 'center', alignItems: 'center' }}
                  left={(props) => <Avatar.Icon {...props} icon="account" style={{ backgroundColor: '#17C2EC' }} />}
                  right={(props) => <IconButton {...props} icon="dots-vertical" />}
                />
              </View>
            </TouchableOpacity>
          ))
        }
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
        <Button
          style={{ borderColor: '#17C2EC', borderWidth: 1, borderRadius: 4, backgroundColor: '#17C2EC' }}
          onPress={goToPrevPage} disabled={currentPage === 1}>
          Página Anterior
        </Button>
        <Text
          style={{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 5 }}
        >
          {`Página ${currentPage}`}
        </Text>
        <Button
          style={{ borderColor: '#17C2EC', borderWidth: 1, borderRadius: 4, backgroundColor: '#17C2EC' }}
          onPress={goToNextPage}>
          Página Siguiente
        </Button>
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
        <Button
          icon="account-check"
          mode="contained"
          style={{ width: 200, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#17C2EC' }}
          onPress={() => { navigation.navigate('RegisterPatient' as never) }}
        >
          Crear paciente
        </Button>
      </View>
    </LayoutDrawer>
  )
}

const styles = StyleSheet.create({
  containerCard: {
    width: '85%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(23, 194, 236, 0.10)',
    // flexDirection: 'row',
    borderRadius: 18,
    borderColor: '#17C2EC',
    borderWidth: 1,

  },

});

export default ListPatient;