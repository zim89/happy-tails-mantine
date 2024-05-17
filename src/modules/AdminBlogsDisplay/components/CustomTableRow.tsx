import { Table } from "@mantine/core";
import Image from "next/image";

import { formatPostDateFromNumber } from '@/shared/lib/helpers';
import { Post } from "@/shared/types/types";
import { CustomBadge } from '@/components/Badge';
import { Actions } from './Actions';

type Props = {
	row: Post
}

export const CustomTableRow = ({ row }: Props) => {
	return (
		<Table.Tr className="flex px-4 py-3 items-center">
			<Table.Td className="relative min-w-[120px] min-h-[120px] mr-8">
				<Image
		          src={row.posterImgSrc}
		          layout="fill"
		          className="object-cover"
		          alt={row.title}
		        />
			</Table.Td>
			<Table.Td className="max-w-[760px]">
				<hgroup>
		          <h3 className='text-lg whitespace-nowrap overflow-hidden text-ellipsis w-full max-w-[600px] mb-2'>{row.title}</h3>
		          <p className='font-light'>
		            {formatPostDateFromNumber(row.createdAt)}
		          </p>
		        </hgroup>
			</Table.Td>
			<Table.Td>
				<CustomBadge
			        color={row.postStatus.toLowerCase()}
			        name={row.postStatus}
			        palette={{
			          published: '#389B48',
			          draft: '#FBBC04',
			          archived: '#B4B4B4',
			        }}
			      />
			</Table.Td>
			<Table.Td className="pl-11 ml-auto">
				<Actions ctx={row} />
			</Table.Td>
		</Table.Tr>
	);
}