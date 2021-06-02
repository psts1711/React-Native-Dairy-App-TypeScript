import React, {Component} from 'react';
import {View} from 'react-native'
import Container from "../components/Container";
import CustomText from "../components/CustomText";
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface Props {
}

interface State {
}

const dairyData = [
    {
    subject:'my subject 1',
    description:'this is dummy description of my app, ' +
        'this is dummy description of my app,this is dummy description of my app ',
    },
    {
        subject:'my subject 2',
        description:'this is dummy description of my app, ' +
            'this is dummy description of my app,this is dummy description of my app ',
    }, {
        subject:'my subject 3',
        description:'this is dummy description of my app, ' +
            'this is dummy description of my app,this is dummy description of my app ',
    },
]

class Dashboard extends React.Component<Props, State> {
    constructor(props){
        super(props);
        this.state={};
    }
    render() {
        return (
            <Container containerStyle={{justifyContent:'flex-start', marginTop: hp('2%')}}>

                {dairyData.map((dairyItem:{subject: string, description:string}, index: number)=>{
                    return <View style={{marginBottom:hp('1%')}} key={index}>
                        <CustomText>{dairyItem.subject}</CustomText>
                        <CustomText>{dairyItem.description}</CustomText>
                    </View>
                })}

            </Container>
        );
    }

    componentDidMount(): void {
    }
}

export default Dashboard;