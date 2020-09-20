import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    /** Ocupa todo o espaço disponível em tela */
    flex: 1,
    backgroundColor: '#8257e5',
    justifyContent: 'center',
    /**distanciar para a direita */
    padding: 40,
  },
  
  /** Estilo da imagem ocupando todo o espaço com contain que usa toda a imagem */
  banner: {
    width: '100%',
    resizeMode: 'contain',
  },

  /** titulo da tela com fonte do google instalada*/
  title: {
    fontFamily: 'Poppins_400Regular',
    color: '#FFF',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 80,
  },

  titleBold: {
    fontFamily: 'Poppins_600SemiBold',
  },

  /** para ficar um do lado do outro */
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
  },

  button: {
    height: 150,
    width: '48%',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 24,
    justifyContent: 'space-between',
  },

  buttonText: {
    color: '#fff',
    fontFamily: 'Archivo_700Bold',
    fontSize: 20,
  },

  buttonPrimary: {
    backgroundColor: '#9871f5',
  },
  
  buttonSecondary: {
    backgroundColor: '#04d361',
  },

  totalConnections: {
    fontFamily: 'Poppins_400Regular',
    color: '#d4c2ff',
    fontSize: 12,
    lineHeight: 20,
    maxWidth: 140,
    marginTop: 40,
  },
});

export default styles;
