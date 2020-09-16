import {LightTheme} from '@resources';
import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listHeader: {
    backgroundColor: 'white',
  },
  avatar: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    borderRadius: Dimensions.get('window').width * 0.2,
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: LightTheme.colorScheme.secondary,
  },
  listView: {
    flex: 1,
  },
  friendImage: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,

    borderWidth: 2,
    borderColor: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
});
