import React from 'react';
import {} from 'react-native';
// import from library
import {SafeAreaView} from 'react-native-safe-area-context';
// import from alias
import {
  BottomSheetPicker,
  FlatButton,
  BottomSheetSequencePicker,
} from '@components';

import {withHotRedux} from '@hocs';
// localImport
import {usePickerSampleModel} from './PickerSample.hooks';
import {pickerSampleSlice} from './PickerSample.slice';
import {pickerSampleEpic} from './PickerSample.epic';
import {PickerSampleProps} from './types';
import {styles} from './PickerSample.style';

const _PickerSample: React.FC<PickerSampleProps> = (props) => {
  const {} = props;
  const {} = usePickerSampleModel();

  const [selected, setSelected] = React.useState('');
  const [sSelected, setSSelected] = React.useState({});

  return (
    <SafeAreaView style={[styles.container]}>
      <BottomSheetPicker
        data={[
          {id: '1', title: 'Item test 1'},
          {id: '2', title: 'Item test 2'},
          {id: '3', title: 'Item test 3'},
        ]}
        onSelect={(item) => setSelected(item.id)}
        selectedId={selected}>
        <FlatButton title={`Select item id ${selected}`} />
      </BottomSheetPicker>

      <BottomSheetSequencePicker
        data={[
          {
            name: 'Pick Ward',
            data: [
              {id: '1', title: 'Item test 1'},
              {id: '2', title: 'Item test 2'},
              {id: '3', title: 'Item test 3'},
            ],
          },
          {
            name: 'Pick District',
            data: [
              {id: '1', title: 'Item test 1'},
              {id: '2', title: 'Item test 2'},
              {id: '3', title: 'Item test 3'},
            ],
          },
          {
            name: 'Pick Country',
            data: [
              {id: '1', title: 'Item test 1'},
              {id: '2', title: 'Item test 2'},
              {id: '3', title: 'Item test 3'},
            ],
          },
        ]}
        selected={sSelected}
        onSelect={(item, scheme) =>
          setSSelected({...sSelected, [scheme.name]: item.id})
        }>
        <FlatButton title={`Select item id ${selected}`} />
      </BottomSheetSequencePicker>
    </SafeAreaView>
  );
};

export const PickerSample = withHotRedux(
  pickerSampleSlice.name,
  pickerSampleSlice.reducer,
  pickerSampleEpic,
)(_PickerSample);
