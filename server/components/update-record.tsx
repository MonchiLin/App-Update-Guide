import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { Update } from "@prisma/client";

type Props = {
  updates: Update[],
  handleDelete: (update: Update) => Promise<void>
}

export const UpdateRecord = (props: Props) => {
  const toast = useToast();

  const handleDelete = (update: Update) => {
    props.handleDelete(update)
      .then(res => {
        toast({
          title: 'Update deleted.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      });
  };

  return <TableContainer>
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Id</Th>
          <Th>平台</Th>
          <Th>最新版本</Th>
          <Th>基座版本</Th>
          <Th>基座最新版本</Th>
          <Th>更新时间</Th>
          <Th>更新内容</Th>
          <Th>下载链接</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          props.updates.map(update => {
            return <Tr key={update.id}>
              <Td>{update.id}</Td>
              <Td>{update.platform}</Td>
              <Td>{update.latestVersion}</Td>
              <Td>{update.hostingVersion}</Td>
              <Td>{update.hotUpdateVersion}</Td>
              <Td>{update.updatedAt.toString()}</Td>
              <Td>{update.content}</Td>
              <Td>{update.distributionLink}</Td>
              <Td>
                <Popover>
                  <PopoverTrigger>
                    <Button colorScheme="red">删除</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow/>
                    <PopoverCloseButton/>
                    <PopoverHeader>确认删除?</PopoverHeader>

                    <PopoverBody>
                      <Button onClick={() => handleDelete(update)} size={"sm"} colorScheme="blue">确认</Button>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Td>
            </Tr>;
          })
        }
      </Tbody>
    </Table>
  </TableContainer>;
};
