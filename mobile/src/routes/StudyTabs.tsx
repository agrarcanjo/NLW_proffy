import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Favorites from '../pages/Favorites';
import TeacherList from '../pages/TeacherList';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          /** retirar sombras ANDROID e IOS*/
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          /** retira capacitade de ocupar o maior estado possível */
          flex: 0,
          width: 20,
          height: 20,
        },
        labelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 13,
          marginLeft: 16,
        },
        inactiveBackgroundColor: '#fafafc',
        activeBackgroundColor: '#ebebf5',
        /** fontes das abas ativas e inativas */
        inactiveTintColor: '#c1bccc',
        activeTintColor: '#32264d',
      }}
    >
      {/** criando abas na tela */}
       {/** options = com label e os barIcon passando como parametro automaticamente a desestruturação realizada.
        * color padrão = inactiveTintColor
       */}
      <Screen
        name="TeacherList"
        component={TeacherList}       
        options={{          
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons name="ios-easel" size={size} color={focused ? '#8257e5' : color} />
            );
          }
        }}
      />
       {/** options = nome da activeBackgroundColor */}
      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons name="ios-heart" size={size} color={focused ? '#8257e5' : color} />
            );
          }
        }}
      />
    </Navigator>
  )
}

export default StudyTabs;
