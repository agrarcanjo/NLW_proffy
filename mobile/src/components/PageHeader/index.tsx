import React, { ReactNode } from 'react';
import { View, Text, Image } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

import styles from './styles';

{/** criada a interface para reutilização da page header 
a criação de um objeto do tipo ReactNode possibilita trabalhar com tags React passando como
referencia para outros componentes*/}
interface PageHeaderProps {
  title: string;
  headerRight?: ReactNode;
  children?: ReactNode;
}

{/** necessário passar como parametro function components <>  */}
const PageHeader: React.FC<PageHeaderProps> = ({ title, headerRight, children }: PageHeaderProps) => {
  const { navigate } = useNavigation();

  function handleGoBack() {
    navigate('Landing');
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        {/** criar botão estilizado  */}
        <BorderlessButton onPress={handleGoBack}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>

        <Image source={logoImg} resizeMode="contain" />
      </View>

      {/** passado o title como parametro 
       * também passado o header a direita como parametro, caso ele tenha, será inserido o elemento
       * aqui
      */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {headerRight}
      </View>

      {children}
    </View>
  );
}

export default PageHeader;
