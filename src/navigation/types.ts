import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

/** Rotas do app. Login/Register aparecem deslogado, Profile/EditProfile logado. */
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  EditProfile: undefined;
};

export type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;

/**
 * Deixa o useNavigation() tipado em qualquer tela sem precisar passar genérico.
 * Ex.: const navigation = useNavigation(); navigation.navigate('Register');
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
