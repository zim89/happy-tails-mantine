import { Table } from '@mantine/core';

import { sizingInfo } from '../lib/data';
import { useMediaQuery } from '@mantine/hooks';

export function SizingTable() {
  const isMobile = useMediaQuery('(max-width: 768px)') ?? false;

  const rows = sizingInfo.map((item) => (
    <Table.Tr key={item.size} className="text-xs leading-[18px] text-center">
      <Table.Td>{item.size}</Table.Td>
      <Table.Td>{item.bodyLength}</Table.Td>
      <Table.Td>{item.chestVolume}</Table.Td>
      <Table.Td>{item.weight}</Table.Td>
      <Table.Td className='text-start'>{item.breeds}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table withColumnBorders withTableBorder striped stripedColor='yellow' borderColor='#787878' bgcolor='#F7F7F7'>
      <Table.Thead>
        <Table.Tr classNames={{tr: "font-bold text-sm"}}>
          <Table.Th classNames={{ th: 'text-center' }} w={40}>Size</Table.Th>
          <Table.Th classNames={{ th: 'text-center' }} w={isMobile ? 80 : 109}>
            {'"A" Body length (cm)'}
          </Table.Th>
          <Table.Th classNames={{ th: 'text-center' }} w={isMobile ? 80 : 124}>
            {'"B" Chest volume (cm)'}
          </Table.Th>
          <Table.Th w={isMobile ? 68 : 86} classNames={{ th: 'text-center' }}>
            {'Weight (kg)'}
          </Table.Th>
          <Table.Th w={isMobile ? 115 : 196}>Recommended breeds</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
