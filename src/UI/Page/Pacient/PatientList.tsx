import * as React from 'react';
import { Appbar, Text, Button, Card, Avatar, IconButton } from 'react-native-paper';
import { fetchGetPatient } from '../../../services';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity, View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { LayoutDrawer } from '../../Components/Drawer/LayoutDrawer';
import style from '../../Components/Login/Style.Login';

const ListPatient = () => {

  const [listPatient, setListPatient] = React.useState<Array<any>>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc'); // Nuevo estado para el orden

  const itemsPerPage = 4;

  const route = useRoute();

  const id = (route.params as any)?.id;

  const navigation = useNavigation();

  React.useEffect(() => {
    fetchGetPatient()
      .then((response) => {
        setListPatient(response.pacientes);
      })
      .catch((error) => {
        console.error('Error al obtener pacientes:', error);
      });
  }, [id]);


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const sortedPatients = [...listPatient].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.username.toLowerCase().localeCompare(b.username.toLowerCase());
    } else {
      return b.username.toLowerCase().localeCompare(a.username.toLowerCase());
    }
  });

  const filteredPatients = sortedPatients
    .slice(startIndex, endIndex)
    .filter((patient) =>
      patient.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

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
      <ScrollView style={{ flex: 1, backgroundColor: 'white', width: '100%', height: '100%', margin: 'auto', paddingHorizontal: 20, paddingVertical: 20,  }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
          <Text style={{ fontSize: 25 }}>
            Lista de pacientes
          </Text>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            testID="username-input"
            style={style.passwordInput}
            placeholderTextColor="gray"
            placeholder="Buscar paciente"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
        <Button
          icon="text-short"
          style={{ borderColor: '#17C2EC', borderWidth: 1, borderRadius: 4, backgroundColor: '#17C2EC', marginTop: 20, marginBottom: 20, width: '50%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto',  }}
          onPress={toggleSortOrder}
        >
          Orden: {sortOrder === 'asc' ? 'ascendente' : 'descendente'}
        </Button>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', maxHeight: "65%", rowGap: 10 }}>
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

        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingTop: 50 }}>
          <Button
            icon="account-check"
            mode="contained"
            style={{ width: 200, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#17C2EC' }}
            onPress={() => { navigation.navigate('RegisterPatient' as never) }}
          >
            Crear paciente
          </Button>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 30 }}>
          <Button
            icon='page-previous-outline'
            style={{ borderColor: '#17C2EC', borderWidth: 1, borderRadius: 4, backgroundColor: '#17C2EC' }}
            onPress={goToPrevPage} disabled={currentPage === 1} children={undefined} >
            
          </Button>
          <Text
            style={{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 5 }}
          >
            {`Página ${currentPage}`}
          </Text>
          <Button
            icon='page-next-outline'
            style={{ borderColor: '#17C2EC', borderWidth: 1, borderRadius: 4, backgroundColor: '#17C2EC' }}
            onPress={goToNextPage} children={undefined}>
           
          </Button>
        </View>
      </ScrollView>
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

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    paddingTop: 50,
    paddingBottom: 50,
    margin: 'auto'

  },

  passwordContainer: {
    width: '80%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    borderColor: '#17C2EC',
    borderRadius: 4,
    borderWidth: 1,
    color: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    paddingLeft: 10,
    marginLeft: 'auto', marginRight: 'auto'
  },

});

export default ListPatient;