import { Image, Pressable, Text, View, StyleSheet,ToastAndroid  } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import IconButton from "../../UI/IconButton";
import { deletePlace, fetchAgainPlace } from "../../util/database";

const PlaceItem = ({ place, onSelect  }) => {

  const handleDeletePlace = () => {
    deletePlace(place.id)
      .then(() => {
        console.log('Yer başarıyla silindi');
        // Silme işlemi tamamlandıktan sonra veritabanından kalan yerleri yeniden yükle
        return fetchAgainPlace();
        
      })
      .then(() => {
        // Güncellenmiş yer listesini kullanarak UI'yı güncelle
        ToastAndroid.show('Place Deleted Successfully', ToastAndroid.SHORT);
        // UI'nızı güncelleyin
        // ...
      })
      .catch((error) => {
        console.error('Yer silinirken bir hata oluştu:', error);
      });
  };

  return (
    <Pressable style={({ pressed }) => [styles.item, pressed && styles.pressed]} onPress={onSelect.bind(this, place.id)}>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.location}> Lng - Lat: {place.location.lat.toFixed(4)}</Text>
        <Text style={styles.address}>{place.address}</Text>
        <View style={styles.trash}>
          <IconButton onPress={handleDeletePlace} icon="trash" size={18} color={GlobalStyles.SystemColors.grey300} />
        </View>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    marginHorizontal: 10,
    backgroundColor: GlobalStyles.SystemColors.green300,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.8,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: '100%',
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
    color: GlobalStyles.SystemColors.blue400,
  },
  address: {
    fontSize: 12,
    color: GlobalStyles.TextColors.textGreen,
  },
  location: {
    fontSize: 14,
    color: GlobalStyles.TextColors.textGreen,
    fontStyle: 'italic',
    marginTop:5
  },
  trash: {
    alignItems: 'flex-end',
  },
});
