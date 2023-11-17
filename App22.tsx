import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import moment from 'moment';

const App22: React.FC = () => {

    const [datetime, setDatetime] = useState<Date>(new Date());
    const [time, setTime] = useState(moment().format('LTS'));

    const saveDatetime = () => {
        const currentdate = new Date();
        setDatetime(currentdate);
        setTime(moment().format('LTS'));
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text> {moment(datetime).format('YYYY-MM-DD ')} {time}</Text>
            <Button title="Guardar" onPress={saveDatetime} />
        </View>
    );
}

export default App22;