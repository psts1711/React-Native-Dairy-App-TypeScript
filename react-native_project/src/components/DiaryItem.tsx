import * as React from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomText from './CustomText';
import {PrimaryTheme} from '../styles/Themes';
import {Utils} from '../utils/utils';
import {Spacing} from '../styles/Global';
import {DiaryItem as diaryItem} from '../models/DiaryItem';
import moment from 'moment';
import DateNTime from './DateNTime';

export interface Props {
  diaryItem: diaryItem;
  onPress: any;
}
const DiaryItem = (props: Props) => {
    const [imageExist, updateImageExist] = React.useState(true);
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.6}
      style={{marginBottom: Spacing.regular.marginBottom, padding: 15}}>
      {/*// date and time view (this is comment out code)*/}
      <DateNTime timeStamp={props.diaryItem.timeStamp} />
      {/*// row view (this is comment out code)*/}
      <View style={{flexDirection: 'row'}}>
        {/*// subject and description view (this is comment out code)*/}
        <View
          style={{
            width: wp('70%'),
            marginRight: Spacing.extraLarge.marginRight,
          }}>
          <CustomText
            style={{color: PrimaryTheme.$ACCENT_COLOR, fontWeight: 'bold'}}>
            {props.diaryItem.subject}
          </CustomText>
          <CustomText style={{marginRight: Spacing.extraLarge.marginRight}}>
            {props.diaryItem.description}
          </CustomText>
        </View>
        {/*// Our image (this is comment out code)*/}
        <Image onError={()=>updateImageExist(false)}
          style={{height: hp('10%'), borderRadius: 5, width: wp('22%')}}
          source={imageExist ? {uri: props.diaryItem.images ? props.diaryItem.images[0] : 'aasasa'} : Utils.images.DIARY_THUMBNAIL}
          //source={Utils.images.DIARY_THUMBNAIL}
        />
      </View>
    </TouchableOpacity>
  );
};
DiaryItem.defaultProps = {};

const styles = StyleSheet.create({});
export default DiaryItem;
