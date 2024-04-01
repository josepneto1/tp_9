import { Camera } from "expo-camera";
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from "react";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import app from '../firebase';

export default function CameraContainer(){
    const [permission, setPermission] = useState(false);
    const [camera, setCamera] = useState(null);
    const [uri, setUri] = useState(null);
    const [msg, setMsg] = useState(null);

    async function requestCamera() {
        const permission = await Camera.requestCameraPermissionsAsync();
        const { status } = permission;
        if(status == 'granted') {
            setPermission(true)
        }
    }

    async function takePicture() {
        if (camera) {
            const photo = await camera.takePictureAsync();
            const { uri } = photo;
            setUri(uri);
        }
    }

    async function savePhoto(){
        try {
            const firebaseStorage = getStorage(app);
            const name = `photo${new Date().getTime()}.jpeg`;
            const photoRef = ref(firebaseStorage, name);
            uploadPhoto(photoRef);
        } catch (error) {
            setMsg(error.message);
        }
    }

    async function uploadPhoto(photoRef) {
        const response = await fetch(uri);
        const photo = await response.blob();
        const uploadResult = await uploadBytes(photoRef, photo);
        if (uploadResult) setUri(null);
        else setMsg("Algo deu errado!");
    }

    useEffect(() => {
        requestCamera();
    }, []);

    return (
        <View style={styles.container}>
            {msg && <Text>{msg}</Text>}
            {!uri &&  <>
                <Camera 
                    ref={(ref) => setCamera(ref)}
                    style={styles.camera}
                />
                <Pressable
                    style={styles.button}
                    onPress={() => takePicture()}>
                    <Text style={styles.buttonText}>Tirar foto</Text>
                </Pressable>
            </>}
            {uri &&  <>
                <Image 
                    style={styles.photo}
                    source={{ uri }}
                />
                <View style={styles.buttonGroup}>
                    <Pressable
                        style={[styles.button, styles.saveButton]}
                        onPress={() => savePhoto()}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.deleteButton]}
                        onPress={() => setUri(null)}>
                        <Text style={styles.buttonText}>Excluir</Text>
                    </Pressable>
                </View>
            </>}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    photo: {
        flex: 1,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        margin: 20,
        borderRadius: 10,
        ...Platform.select({
            android: {
              backgroundColor: '#52796f',
            },
            ios: {
              backgroundColor: '#4a4e69',
            },
            default: {
              backgroundColor: '#353535',
            }
          }),
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: 'green',
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
    },
});
