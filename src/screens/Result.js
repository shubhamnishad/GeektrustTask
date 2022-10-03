import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SET_USER_INFO} from '../redux/Action';
import {post} from '../service/Services';

const Result = props => {
  const dispatch = useDispatch();
  const planet = useSelector(state => state.userInfoReducer.planet_name);
  const token = useSelector(state => state.userInfoReducer.token);
  const vehicle = useSelector(state => state.userInfoReducer.vehicle_name);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState();

  useEffect(() => {
    renderResult();
  }, []);

  const renderResult = async () => {
    const finalResult = await post('https://findfalcone.herokuapp.com/find', {
      token: token,
      planet_names: [
        planet[0]?.planet1,
        planet[1]?.planet2,
        planet[2]?.planet3,
        planet[3]?.planet4,
      ],
      vehicle_names: [
        vehicle[0]?.vehicle1,
        vehicle[1]?.vehicle2,
        vehicle[2]?.vehicle3,
        vehicle[3]?.vehicle4,
      ],
    });
    if (finalResult.status === 'success') {
      setSuccess(true);
      setResult(finalResult);
    }
    console.log('RESULT', finalResult);
  };

  const renderAgain = () => {
    dispatch({
      type: SET_USER_INFO,
      payload: {
        token: '',
      },
    });
    props.navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerFont}>Finding Falcone!</Text>
      </View>
      <View>
        {success && (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>
              Success! Congratulations on finding Falcone. King Shan is mighty
              pleased
            </Text>
            <Text>Planet Found: {result?.planet_name}</Text>
          </View>
        )}
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center', top: 400}}>
        <TouchableOpacity style={styles.button} onPress={() => renderAgain()}>
          <Text style={{fontSize: 15}}>Start Again</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
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

export default Result;
