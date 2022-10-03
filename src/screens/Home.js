import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import DropdownComponent from '../components/DropdownComponent';
import RadioButtonComponent from '../components/RadioButtonComponent';
import {SUBMIT_VEHICLE, SUBMIT_PLANET, SET_USER_INFO} from '../redux/Action';
import {getAll, post} from '../service/Services';

const Home = props => {
  const dispatch = useDispatch();
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedPlanets, setSelectedPlanets] = useState([
    {id: 'p1', planet1: ''},
    {id: 'p2', planet2: ''},
    {id: 'p3', planet3: ''},
    {id: 'p4', planet4: ''},
  ]);
  const [selectedVehicles, setSelectedVehicles] = useState([
    {id: 'v1', vehicle1: ''},
    {id: 'v2', vehicle2: ''},
    {id: 'v3', vehicle3: ''},
    {id: 'v4', vehicle4: ''},
  ]);

  useEffect(() => {
    renderGetPlanets();
    renderGetVehicles();
  }, []);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const token = await post('https://findfalcone.herokuapp.com/token');
    console.log('TOKEN', token);
    dispatch({
      type: SET_USER_INFO,
      payload: {
        token: token.token,
      },
    });
  };

  const renderGetPlanets = async () => {
    const plan = await getAll('https://findfalcone.herokuapp.com/planets');
    setPlanets(plan);
  };

  const renderGetVehicles = async () => {
    const veh = await getAll('https://findfalcone.herokuapp.com/vehicles');
    setVehicles(veh);
  };

  const updatePlanets = (p, value) => {
    const copyPlanetArray = [...selectedPlanets];
    let index = copyPlanetArray.findIndex(item => item.id === p);
    if (index === 0) {
      copyPlanetArray[index] = {...copyPlanetArray[index], planet1: value};
    } else if (index === 1) {
      copyPlanetArray[index] = {...copyPlanetArray[index], planet2: value};
    } else if (index === 2) {
      copyPlanetArray[index] = {...copyPlanetArray[index], planet3: value};
    } else {
      copyPlanetArray[index] = {...copyPlanetArray[index], planet4: value};
    }
    setSelectedPlanets(copyPlanetArray);
  };

  const updateVehicle = (v, value) => {
    const copyVehicleArray = [...selectedVehicles];
    let index = copyVehicleArray.findIndex(item => item.id === v);
    if (index === 0) {
      copyVehicleArray[index] = {...copyVehicleArray[index], vehicle1: value};
    } else if (index === 1) {
      copyVehicleArray[index] = {...copyVehicleArray[index], vehicle2: value};
    } else if (index === 2) {
      copyVehicleArray[index] = {...copyVehicleArray[index], vehicle3: value};
    } else {
      copyVehicleArray[index] = {...copyVehicleArray[index], vehicle4: value};
    }
    setSelectedVehicles(copyVehicleArray);
  };

  const renderSubmit = () => {
    dispatch({
      type: SUBMIT_PLANET,
      payload: {
        planet: selectedPlanets,
      },
    });
    dispatch({
      type: SUBMIT_VEHICLE,
      payload: {
        vehicle: selectedVehicles,
      },
    });
    props.navigation.navigate('Result');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerFont}>Finding Falcone!</Text>
        <Text style={styles.subTitle}>
          Select Planets you want to search in :
        </Text>
        {/* <Text style={styles.time}>Time taken:</Text> */}
      </View>
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper1}>
          <View>
            <Text style={styles.centerAlign}>Destination 1</Text>
          </View>
          <DropdownComponent
            data={
              planets && planets.length
                ? planets.map(item => ({
                    label: `${item.name}`,
                    value: item.name,
                  }))
                : []
            }
            label={'p1'}
            onChange={updatePlanets}
            value={selectedPlanets[0]?.planet1}
          />

          {selectedPlanets[0]?.planet1 &&
            vehicles?.map((item, index) => {
              return (
                <View style={styles.radioWrapper} key={index}>
                  <RadioButtonComponent
                    value={item.name}
                    checked={selectedVehicles[0]?.vehicle1}
                    setChecked={() => updateVehicle('v1', item.name)}
                  />
                  <Text>
                    {item.name} ({item.total_no})
                  </Text>
                </View>
              );
            })}
        </View>
        <View style={styles.wrapper1}>
          <View>
            <Text style={styles.centerAlign}>Destination 2</Text>
          </View>
          <DropdownComponent
            data={
              planets && planets.length
                ? planets.map(item => ({
                    label: `${item.name}`,
                    value: item.name,
                  }))
                : []
            }
            label="p2"
            onChange={updatePlanets}
            value={selectedPlanets[1]?.planet2}
          />

          {selectedPlanets[1]?.planet2 &&
            vehicles?.map((item, index) => {
              return (
                <View style={styles.radioWrapper} key={index}>
                  <RadioButtonComponent
                    value={item.name}
                    checked={selectedVehicles[1]?.vehicle2}
                    setChecked={() => updateVehicle('v2', item.name)}
                  />
                  <Text>
                    {item.name} ({item.total_no})
                  </Text>
                </View>
              );
            })}
        </View>
        <View style={styles.wrapper1}>
          <View>
            <Text style={styles.centerAlign}>Destination 3</Text>
          </View>
          <DropdownComponent
            data={
              planets && planets.length
                ? planets.map(item => ({
                    label: `${item.name}`,
                    value: item.name,
                  }))
                : []
            }
            label="p3"
            onChange={updatePlanets}
            value={selectedPlanets[2]?.planet3}
          />

          {selectedPlanets[2]?.planet3 &&
            vehicles?.map((item, index) => {
              return (
                <View style={styles.radioWrapper} key={index}>
                  <RadioButtonComponent
                    value={item.name}
                    checked={selectedVehicles[2]?.vehicle3}
                    setChecked={() => updateVehicle('v3', item.name)}
                  />
                  <Text>
                    {item.name} ({item.total_no})
                  </Text>
                </View>
              );
            })}
        </View>
        <View style={styles.wrapper2}>
          <View>
            <Text style={styles.centerAlign}>Destination 4</Text>
          </View>
          <DropdownComponent
            data={
              planets && planets.length
                ? planets.map(item => ({
                    label: `${item.name}`,
                    value: item.name,
                  }))
                : []
            }
            label="p4"
            onChange={updatePlanets}
            value={selectedPlanets[3]?.planet4}
          />

          {selectedPlanets[3]?.planet4 &&
            vehicles?.map((item, index) => {
              return (
                <View style={styles.radioWrapper} key={index}>
                  <RadioButtonComponent
                    value={item.name}
                    checked={selectedVehicles[3]?.vehicle4}
                    setChecked={() => updateVehicle('v4', item.name)}
                  />
                  <Text>
                    {item.name} ({item.total_no})
                  </Text>
                </View>
              );
            })}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => renderSubmit()}>
        <Text style={{fontSize: 15}}>Find Falcone!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollViewContainer: {
    backgroundColor: 'white',
    height: '100%',
    margin: 10,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  headerFont: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  subTitle: {
    marginTop: 10,
    fontSize: 15,
  },
  centerAlign: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginVertical: 10,
  },
  radioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapper1: {
    // borderBottomColor: 'lightgrey',
    // borderBottomWidth: 1,
    marginBottom: 10,
  },
  wrapper2: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 10,
  },
  button: {
    alignSelf: 'center',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'lightgrey',
    borderWidth: 1,
    width: 110,
    height: 50,
  },
});

export default Home;
