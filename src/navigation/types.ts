import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  EditProfile: undefined;
};

export type RootStackNavigation =
  NativeStackNavigationProp<
    RootStackParamList
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends RootStackParamList {}
  }
}