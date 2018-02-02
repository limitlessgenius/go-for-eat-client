import { StyleSheet } from 'react-native';

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
    borderRadius: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#2ECC71',
    fontSize: 20,
  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  powered: {},
  listView: {
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    top: 44,
    shadowColor: '#444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
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
