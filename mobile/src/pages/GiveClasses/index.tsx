import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import giveCLassesBgImage from '../../assets/images/give-classes-background.png';

function GiveClasses() {
  const { goBack } = useNavigation();

  {/** metodo do navigation para voltar */}
  function handleNavigateBack() {
    goBack();
  }

  return (
    <View style={styles.container}>
      {/** insere uma imagem em background q obriga um style */}
      <ImageBackground
      {/** indica para manter o conteúdo do background todo dentro do elemento */}
        resizeMode="contain"
        source={giveCLassesBgImage}
        style={styles.content}
      >
        <Text style={styles.title}>
          Quer ser um Proffy?
        </Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa plataforma web.
        </Text>
      </ImageBackground>
      {/** botão para voltar */}
      <RectButton 
        style={styles.okButton}
        onPress={handleNavigateBack}
      >
        <Text style={styles.okButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  );
}

export default GiveClasses;
