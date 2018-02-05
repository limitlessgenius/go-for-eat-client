import { StyleSheet, PixelRatio, Dimensions } from 'react-native';

const WINDOW = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  textInputContainer: {
    height: 44,
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    height: '100%',
    width: WINDOW.with - 40,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 0,
    borderBottomWidth: 5 / PixelRatio.get(),
    borderBottomColor: '#2ECC71',
    fontSize: 20,
  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  powered: {},
  listViewContainer: {
    width: WINDOW.with - 36,
    marginLeft: 18,
    marginRight: 18,
    position: 'absolute',
    top: 44,
    maxHeight: WINDOW.height * 0.6,
    overflow: 'hidden',
  },
  listView: {
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 2,
    shadowColor: '#444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: .5,
    shadowRadius: 1,
    overflow: 'visible',

  },
  row: {
    paddingTop: 13,
    paddingBottom: 13,
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
  rowLeft: {
    width: '72%',
    marginLeft: '4%',
  },
  rowRight: {
    width: '10%',
    marginRight: '4%',
  },
  PlaceListItemName: {
    fontSize: 18,
    marginBottom: 3,
  },
  PlaceListItemAddress: {
    fontSize: 15,
    color: '#2ECC71',
  },
  PlaceListItemDistance: {
    textAlign: 'center',
    fontSize: 16,
  },
  separator: {
    // height: StyleSheet.hairlineWidth,
    height: 1,
    backgroundColor: '#2ECC71',
  },
  description: {
    backgroundColor: 'red',
  },
  loader: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
    backgroundColor: 'blue',
  },
  androidLoader: {
    marginRight: -15,
  },
});
