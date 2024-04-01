import { useFocusEffect } from '@react-navigation/native';
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { useCallback, useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import app from "../firebase";

export default function GalleryContainer() {

    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [msg, setMsg] = useState(null);

    async function getPhotos() {
        try {
            const firebaseStorage = getStorage(app);
            const photosRef = ref(firebaseStorage);
            const list = await listAll(photosRef);
            const urls = [...photos];
            for (let fileRef of list.items) {
                const photoRef = ref(firebaseStorage, fileRef);
                const url = await getDownloadURL(photoRef);
                if (!urls.includes(url))
                    urls.push(url);
            }
            setPhotos(urls);
        } catch (error) {
            setMsg(error.message)
        }
    }

    useFocusEffect(useCallback(() => {getPhotos()}, []));

    return (
        <View style={styles.container}>
            {msg && <Text>{msg}</Text>}
            <Text style={styles.text}>{photos.length}</Text>
            <View style={styles.photoContainer}>
                {photos.map((uri, index) => (
                    <TouchableOpacity key={index} onPress={() => setSelectedPhoto(uri)}>
                        <Image style={styles.photo} source={{ uri }} />
                    </TouchableOpacity>
                ))}
            </View>
            <Modal
                visible={selectedPhoto}
                transparent={true}
                onRequestClose={() => setSelectedPhoto(null)}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedPhoto(null)}>
                        <Text style={styles.closeButtonText}>Fechar</Text>
                    </TouchableOpacity>
                    <Image style={styles.expandedPhoto} source={{ uri: selectedPhoto }} />
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
    },
    photoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    photo: {
        width: 100,
        height: 100,
        margin: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    expandedPhoto: {
        width: 300,
        height: 300,
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        fontSize: 16,
        color: 'black',
    },
});
