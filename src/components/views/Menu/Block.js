import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, Image} from 'react-native';
import pubImage from '../../../assets/images/Pub/pub.jpg';




export function Block (props){

    
 
    const itemText = (item) => (
        <View style={styles.itemTextContainer}>
            <Text style={styles.itemTextTitle}>
                {item.name}
            </Text>
            
            <Text style={styles.itemTextPrice}>
                 {item.price} TND
            </Text>
            
         
        </View>
    )

    const itemImage = (itemPlat) => (
       
        <View>
            <Image
                resizeMode={"cover"}
                style={styles.itemImage}
                //source={{uri:'https://minilik.000webhostapp.com/restaurant/image1.jpg'}}
                //source={item.url}
                source={{uri:itemPlat.url}}

            />
        </View>
    )

/*
    const itemImagePub = (itemPub) => (
       
        <View>
            <Image
                resizeMode={"cover"}
                style={styles.itemImagePub}
                //source={{uri:'https://minilik.000webhostapp.com/restaurant/image1.jpg'}}
                //source={item.url}
                source={{uri:itemPub.url}}

            />
        </View>
    )
*/


    const itemImagePub = (itemPub) => (
        itemPub  === undefined ?     
            <View>     
            <Image
            resizeMode={"cover"}
            style={styles.itemImagePub}
            source={pubImage}
            />
            </View>
        :
            <View>     
            <Image
            resizeMode={"cover"}
            style={styles.itemImagePub}
            source={
                {uri:itemPub.url}}
                />
             </View>
        
              
    )











    const bloc = (props) => (
        <View style={styles.blockRow}>


            <TouchableOpacity
                onPress={()=> 
                props.onPress(props.item.blockOne, props.restaurant, props.pubOne, props.pubTwo )
                }
                style={{flex:0.65}}
            >
                <View style={[
                        styles.blockGridStyle, 
                        styles.blockGridStyleLeft,
                        styles.shadow
                    ]}
                >
                   {itemImage(props.item.blockOne)}
                    {itemText(props.item.blockOne)}

                 
                </View>
            </TouchableOpacity>


            <View
                style={{flex:0.35}}
            >
                <View
                     style={[
                        styles.blockGridStyle, 
                        styles.blockGridStyleRight
                    ]}
                >
                    <View style={[
                      styles.shadow,
                      ]}>
                    {itemImagePub(props.item.blockTwo)}
                    </View>
                   
                </View>
            </View>
        </View>
    )



   
 return (
        <View> 
           {bloc (props)} 
        </View>
        )
    
 }


const styles = StyleSheet.create({ 
    blockRow:{
        flex:1,
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'space-between',
        backgroundColor:'#f6f7f8', 

        
    },
    shadow:{
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    itemImage:{
        width:'100%',
        height:165,
    },
    itemImagePub:{
        width:'100%',
        height:215,
      
    },
    addressImage:{
        width:29,
        height:29,
    },
    itemTextContainer:{
        padding:5,
       // borderLeftWidth: 4,
        //borderLeftColor: '#FF6444',
        height:50,

    },
    itemTextTitle: {
        fontFamily: 'Roboto-Black',
        fontSize: 17,
        fontWeight: 'bold',
        color:'#000',
        marginBottom: 2
    },
    itemTextPrice: {
        fontFamily: 'Roboto-Black',
        fontSize: 14,
        color: '#808080',
        marginBottom: 3,
       // padding:5,
    },
    blockGridStyle:{
        backgroundColor: '#fff'
    },
    blockGridStyleLeft:{
        marginRight: 3,
       // marginLeft: 30,
    },
    blockGridStyleRight:{
        marginLeft: 3,
       // marginRight: 30,
    },
    addressContainer:{
        //padding:10,
        flex:1,
        flexDirection: 'row',
        //justifyContent: 'space-between'
      }

})

