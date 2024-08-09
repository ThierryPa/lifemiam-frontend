import { View,Image,StyleSheet ,Text,TextInput,SafeAreaView,KeyboardAvoidingView, TouchableOpacity, Animated} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState, useRef } from 'react';

function Resume(){

    const URL = 'https://lifemiam-backend.vercel.app';
    const token = '0T_J7O73PtSOoUiD5Ntm_PNoFKKH5iOf';

    const [isMenuListVisible, setIsMenuListVisible] = useState(false);
    const [menusResume,setMenusResume] = useState([]);

    const animatedHeight = useRef(new Animated.Value(60)).current;

    useEffect(() => {
        fetch(`${URL}/menus/getMenus`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token: token})
          })
          .then((response) => response.json())
          .then((data) => {
            if(Array.isArray(data))
              setMenusResume(data);
          })
    }, [])

    // Ouvre le résumé du menu (sans animation)
    const handleMenuList = () => {
        Animated.timing(animatedHeight,{
            toValue: isMenuListVisible ? 60 : menusResume.length*90,
            duration: 300,
            useNativeDriver: false,
        }).start();
        setIsMenuListVisible(!isMenuListVisible)
    }

    const handleClickMenu = (menuId) => {
        // ${URL}/menus/${menuId}
        fetch(`${URL}/menus/${menuId}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token: token})
          })
          .then((response) => response.json())
          .then((data) => {
            if(Array.isArray(data))
              setMenusResume(data);
        });
    }
    
    // Map le menuResume pour afficher tous les menus dans le résumé
    const menusDisplay = menusResume && menusResume.map((data, i) => {
        return (
          <View key={i} style={styles.menuCont}>
                <Text style={styles.menuTxt}>{`${data.name}`}</Text>
            <TouchableOpacity  onPress={() => handleClickMenu(`${data._id}`)}>
                <FontAwesome name={"info-circle"} style={styles.menuListInfo} size={25} color={"#E7D37F"}/>
            </TouchableOpacity>
          </View>
        )
    })

    //Modifie l'affichage de la modale (sans animation)
    const Container = (
        <Animated.View style={[
            styles.container,
            {
                height: animatedHeight,
            }
        ]}>
            <View style={styles.align}>
            <TouchableOpacity style={styles.button} onPress={handleMenuList}>
                <FontAwesome 
                    name={isMenuListVisible ? "caret-down" : "caret-up"} 
                    style={styles.caret} 
                    size={25} 
                    color={"#E7D37F"}
                />
            </TouchableOpacity>
            <Text style={styles.resumeText}>Résumé du menu</Text>
        </View>
        <View style={styles.menusDisplay}>{menusDisplay}</View>
            </Animated.View>
    )


    return (
        <View style={styles.mainCont}>{Container}</View>
    )
}

const styles = StyleSheet.create({
    mainCont:{
        width: "100%",
    },
    container: {
        alignItems: "flex-start",
        backgroundColor: "#81A263",
        width: "100%",
        marginBottom: 2,
        overflow: "hidden"
    },
    containerOff:{
        alignItems: "flex-start",
        backgroundColor: "#81A263",
        width: "100%",
        height: 60,
        borderWidth: 1,
        marginBottom: 1,
    },
    containerOn:{
        alignItems: "flex-start",
        backgroundColor: "#81A263",
        width: "100%",
        height: "80%",
        marginBottom: 1,
        marginTop: "38%"
    },
    align:{
        flexDirection: "row",
        alignItems: "center",
    },
    button:{
      backgroundColor: '#365E32',
      borderRadius: 10,
      width: 45,
      height: 45,
      alignItems: "center",
      justifyContent: "center",
      marginTop: "2%",
      marginLeft: "2%",
    },
    resumeText:{
        color: "white",
        marginLeft: "16%",
        fontSize: 25,
        fontWeight:'700',
    },
    menusDisplay:{
        width: "90%",
        height: "auto",
        marginTop: 10,
    },
    menuCont:{
        flexDirection:"row",
        marginTop: 5,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor:'#365E32',
        height: 50,
        alignItems: "center",
        justifyContent: 'space-between',
        paddingLeft: 30,
    },
    menuTxt:{
        color:'#E7D37F',
        fontSize: 18,
        fontWeight:'700',
    },
    menuListInfo: {
        marginRight: 20,
    }
})

export default Resume;