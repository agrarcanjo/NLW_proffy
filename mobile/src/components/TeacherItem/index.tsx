import React, { useState } from "react";
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
import api from "../../services/api";

{/** interface do componente para exportação */}
export interface Teacher {
  avatar: string;
  bio: string;
  cost: number;
  id: number;
  name: string;
  subject: string;
  whatsapp: number;
}

{/**interface por item para agregar o teacher com favorited or not */}
interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

{/** Para ter acesso os itens de Teacher, 
preciso encapsular ele dentro de uma interface para 
assim ter acesso a um componente do tipo Teacher */}
const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }: TeacherItemProps) => {
  {/** como não usa form, utiliza um state
  
  Sempre que é necessário de uma variável que mudo o estado conforme a manipulação do usuário.
  é necessário state, e no caso, valor inicial é definido pela criação do item */}
  const [isFavorited, setIsFavorited] = useState(favorited);

  {/** função para link com whatsapp */}
  function handleLinkToWhatsapp() {
    api.post('connections', {
      user_id: teacher.id,
    });
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }

  async function handleToggleFavorite() {
    {/** busca no banco os favoritos */}
    const favorites = await AsyncStorage.getItem('favorites');
    let favoritesArray = [];

    {/** converte para um array de string */}
    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      {/** procura a posição do item */}
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
        return teacherItem.id === teacher.id;
      });
      {/** remove um conteúdo da lista (indice e quantas posições remover) */}
      favoritesArray.splice(favoriteIndex, 1);
      setIsFavorited(false);
    } else {
      favoritesArray.push(teacher);
      setIsFavorited(true);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  return (

    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri: teacher.avatar }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      <Text style={styles.bio}>
        {teacher.bio}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          {/** button de favoritos */}
          <RectButton
            style={[
              styles.favoriteButton,
              isFavorited ? styles.favorited : {}
            ]}
            onPress={handleToggleFavorite}
          >
            {/** muda o estilo do botão conforme contexto */}
            {isFavorited
              ? <Image source={unfavoriteIcon} />
              : <Image source={heartOutlineIcon} />
            }
          </RectButton>

          <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;
