import { useTheme } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import { tokens } from '../theme';

const LineChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = [
    {
      id: 'japan',
      color: 'hsl(175, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 34,
        },
        {
          x: 'helicopter',
          y: 183,
        },
        {
          x: 'boat',
          y: 271,
        },
        {
          x: 'train',
          y: 257,
        },
        {
          x: 'subway',
          y: 150,
        },
        {
          x: 'bus',
          y: 238,
        },
        {
          x: 'car',
          y: 195,
        },
        {
          x: 'moto',
          y: 114,
        },
        {
          x: 'bicycle',
          y: 111,
        },
        {
          x: 'horse',
          y: 285,
        },
        {
          x: 'skateboard',
          y: 280,
        },
        {
          x: 'others',
          y: 34,
        },
      ],
    },
    {
      id: 'france',
      color: 'hsl(140, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 297,
        },
        {
          x: 'helicopter',
          y: 108,
        },
        {
          x: 'boat',
          y: 27,
        },
        {
          x: 'train',
          y: 51,
        },
        {
          x: 'subway',
          y: 16,
        },
        {
          x: 'bus',
          y: 49,
        },
        {
          x: 'car',
          y: 261,
        },
        {
          x: 'moto',
          y: 247,
        },
        {
          x: 'bicycle',
          y: 118,
        },
        {
          x: 'horse',
          y: 295,
        },
        {
          x: 'skateboard',
          y: 2,
        },
        {
          x: 'others',
          y: 104,
        },
      ],
    },
    {
      id: 'us',
      color: 'hsl(61, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 33,
        },
        {
          x: 'helicopter',
          y: 200,
        },
        {
          x: 'boat',
          y: 86,
        },
        {
          x: 'train',
          y: 97,
        },
        {
          x: 'subway',
          y: 174,
        },
        {
          x: 'bus',
          y: 296,
        },
        {
          x: 'car',
          y: 66,
        },
        {
          x: 'moto',
          y: 32,
        },
        {
          x: 'bicycle',
          y: 70,
        },
        {
          x: 'horse',
          y: 233,
        },
        {
          x: 'skateboard',
          y: 96,
        },
        {
          x: 'others',
          y: 112,
        },
      ],
    },
    {
      id: 'germany',
      color: 'hsl(150, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 193,
        },
        {
          x: 'helicopter',
          y: 251,
        },
        {
          x: 'boat',
          y: 7,
        },
        {
          x: 'train',
          y: 193,
        },
        {
          x: 'subway',
          y: 97,
        },
        {
          x: 'bus',
          y: 66,
        },
        {
          x: 'car',
          y: 131,
        },
        {
          x: 'moto',
          y: 70,
        },
        {
          x: 'bicycle',
          y: 91,
        },
        {
          x: 'horse',
          y: 154,
        },
        {
          x: 'skateboard',
          y: 33,
        },
        {
          x: 'others',
          y: 211,
        },
      ],
    },
    {
      id: 'norway',
      color: 'hsl(184, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 50,
        },
        {
          x: 'helicopter',
          y: 232,
        },
        {
          x: 'boat',
          y: 122,
        },
        {
          x: 'train',
          y: 197,
        },
        {
          x: 'subway',
          y: 190,
        },
        {
          x: 'bus',
          y: 23,
        },
        {
          x: 'car',
          y: 55,
        },
        {
          x: 'moto',
          y: 151,
        },
        {
          x: 'bicycle',
          y: 283,
        },
        {
          x: 'horse',
          y: 253,
        },
        {
          x: 'skateboard',
          y: 254,
        },
        {
          x: 'others',
          y: 142,
        },
      ],
    },
  ];
  return (
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      margin={{
        top: 50, right: 110, bottom: 50, left: 60,
      }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'transportation',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
