import React from 'react';
import { PieChart, PieChartData as RNChartPieChartData } from 'react-native-svg-charts';
import { Text, G } from 'react-native-svg';
import { View } from 'react-native';

interface PieChartData extends RNChartPieChartData {
    key: number;
    amount: number;
    name?: string;
    svg: {
        fill: string;
    };
}

interface IBarChartExampleProps {
    data: PieChartData[]
}

interface LabelsProps {
    slices?: Array<{
        labelCentroid?: [number, number];
        pieCentroid?: [number, number];
        data?: PieChartData;
    }>;
}

export const BarChartExample = ({data}:IBarChartExampleProps) => {

    const Labels: React.FC<LabelsProps> = ({ slices }) => {
        return slices?.map((slice, index) => {
            const { pieCentroid, data } = slice;
            return (
                <G key={index} transform={`translate(${pieCentroid![0]}, ${pieCentroid![1]})`}>
                    <Text
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={16}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {data?.name}
                    </Text>
                    <Text
                        fill={data?.svg.fill}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        fontWeight="bold"
                    >
                        {/* {data?.amount} */}
                    </Text>
                </G>
            );
        });
    };

    return (
        <PieChart
            style={{ height: '100%', width: '100%' }}
            valueAccessor={({ item }) => item.amount as number}
            data={data}
            padAngle={0}
            outerRadius={'95%'}
        >
            <Labels />
        </PieChart>
    );
};
