import React, { Component } from "react";
import { 
    View,
    Text,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    Dimensions,
    Animated
} from "react-native";

import Category from '../components/Explore/Category';
import Home from '../components/Explore/Home';
import Tag from '../components/Explore/Tag';

import Icon from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');
class Explore extends Component{

    componentWillMount() {
        this.scrollY = new Animated.Value(0);

        this.startHeaderHeight = 80;
        this.endHeaderHeight = 50;
        if(Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight;
            this.endHeaderHeight = 70 + StatusBar.currentHeight;
        }

        this.animatedHeaderHeight = this.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [this.startHeaderHeight, this.endHeaderHeight],
            extrapolate: 'clamp'
        });

        this.animatedOpacity = this.animatedHeaderHeight.interpolate({
            inputRange:[this.endHeaderHeight, this.startHeaderHeight],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })

        this.animatedTagTop = this.animatedHeaderHeight.interpolate({
            inputRange:[this.endHeaderHeight, this.startHeaderHeight],
            outputRange: [-30, 0],
            extrapolate: 'clamp'
        })
    }

    render() {
        return (
        <SafeAreaView style={{ flex: 1 }} scrollEventThrottle={16} >
            <View style={{ flex: 1 }}>
                <Animated.View style={{ height: this.animatedHeaderHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: "#dddddd" }}>
                    <View style={{ flexDirection: 'row', padding: 10, backgroundColor: 'white', marginHorizontal: 20, shadowOffset: { width: 0, height: 0}, shadowColor: 'black', shadowOpacity: 0.2, elevation: 1, marginTop: Platform.OS == 'android' ? 50 : null }}>
                        <Icon name="ios-search" size={20} />
                        <TextInput
                            underlineColorAndroid="transparent" 
                            placeholder="Try New Delhi"
                            placeholderTextColor="grey"
                            style={{ flex: 1, fontWeight: '700',
                                backgroundColor: 'white' }} />
                    </View>
                    <Animated.View
                        style={{
                            flexDirection: 'row',
                            marginHorizontal: 20,
                            position: 'relative',
                            top: this.animatedTagTop,
                            opacity: this.animatedOpacity
                        }}>
                        <Tag name="Guests" />
                        <Tag name="Dates" />
                    </Animated.View>   
                </Animated.View>
                <ScrollView 
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [
                            {nativeEvent: {contentOffset: {y: this.scrollY}}}
                        ]
                    )}>
                    <View style={{
                        flex: 1,
                        backgroundColor: 'white', 
                        paddingTop: 20 }}>
                        <Text style = {{
                            fontSize: 24,
                            fontWeight: '700',
                            paddingHorizontal: 20
                            }}>
                            What can we help you find, Varun ?
                        </Text>
                        <View style={{height: 130, margin: 20 }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <Category 
                                    imageUri={require('../assets/home.jpg')}
                                    name="Home" />
                                <Category
                                    imageUri={require('../assets/experiences.jpg')} 
                                    name="Experiences" />
                                <Category 
                                    imageUri={require('../assets/restaurant.jpg')} 
                                    name="Restaurant" />
                            </ScrollView>
                        </View>
                        <View style={{marginTop: 40, paddingHorizontal: 20}}>
                            <Text style={{fontSize:24, fontWeight:'700'}}>
                                Introducing Airbnb Plus
                            </Text>
                            <Text style={{fontWeight: '100', marginTop: 10}}>
                                A new selection of homes verified for quality & comfort
                            </Text>
                            <View style={{width: width - 40, height: 200, marginTop: 20 }}>
                                <Image 
                                    style={{
                                        flex:1,
                                        height: null, 
                                        width:null, 
                                        resizeMode: "cover", 
                                        borderRadius: 5, 
                                        borderWidth: 1, 
                                        borderColor:'#dddddd'}} 
                                    source={require('../assets/home.jpg')} />
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: 40}}>
                        <Text style={{fontSize:24, fontWeight: '700', paddingHorizontal: 20}}>
                            Homes around the world
                        </Text>
                        <View style={{paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            <Home width={width}
                                uri={require('../assets/home.jpg')} 
                                name="The Cozy Place"
                                type="PRIVATE ROOM - 2"
                                price={82}
                                rating={4}
                                />
                            <Home width={width} 
                                uri={require('../assets/home3.jpg')} 
                                name="The Palace of Thunder"
                                type="PRIVATE ROOM - 5"
                                price={82}
                                rating={4}
                                />
                            <Home width={width} 
                                uri={require('../assets/home2.jpg')} 
                                name="Mystical Lands"
                                type="PRIVATE ROOM - 3"
                                price={82}
                                rating={4}
                                />
                        </View>
                    </View>
                </ScrollView>
            </View> 
        </SafeAreaView>
        ); 
    }
}
export default Explore;
