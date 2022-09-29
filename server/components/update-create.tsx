import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel, Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Select, useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { Update } from "@prisma/client";

type Props = {
  handleCreateUpdate: (update: Partial<Update>) => Promise<void>
}

export const UpdateCreate = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [platform, setPlatform] = useState("Android");
  const [hostingVersion, setHostingVersion] = useState("1.0.0");
  const [latestVersion, setLatestVersion] = useState("1.0.0+1000000");
  const [hotUpdateVersion, setHotUpdateVersion] = useState("1.0.0+1000000");
  const formState = useState({});
  const toast = useToast();

  const validate = () => {

  };


  const handleCreateUpdate = () => {
    props
      .handleCreateUpdate({
        platform,
        hostingVersion,
        latestVersion,
        hotUpdateVersion,
      })
      .then(res => {
        toast({
          title: 'Update created.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: "top"
        });
        setVisible(false);
      });
  };

  return <>
    <Button
      colorScheme="teal"
      type="submit"
      onClick={() => setVisible(true)}
    >
      新增
    </Button>

    <Modal
      isOpen={visible}
      onClose={() => setVisible(false)}
    >
      <ModalOverlay/>
      <ModalContent maxW="80vw">
        <ModalHeader>Create your Update</ModalHeader>
        <ModalCloseButton/>
        <ModalBody pb={6}>
          <FormControl isInvalid={false}>
            <FormLabel>平台</FormLabel>
            <Select
              placeholder="Select platform"
              value={platform}
              onChange={e => setPlatform(e.target.value)}
            >
              <option value="Android">Android</option>
              <option value="iOS">iOS</option>
            </Select>
            {/*<FormErrorMessage>{"asdasdasd"}</FormErrorMessage>*/}
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>基座版本</FormLabel>
            <PinInput value={hostingVersion} onChange={setHostingVersion}>
              <PinInputField/>
              <PinInputField/>
              <PinInputField/>
              <PinInputField/>
              <PinInputField/>
            </PinInput>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>最新版本</FormLabel>
            <Input value={latestVersion} onChange={e => setLatestVersion(e.target.value)}/>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>基座最新版本</FormLabel>
            <Input value={hotUpdateVersion} onChange={e => setHotUpdateVersion(e.target.value)}/>
          </FormControl>

        </ModalBody>

        <ModalFooter>
          <Button onClick={handleCreateUpdate} colorScheme="blue" mr={3}>Save</Button>
          <Button onClick={() => setVisible(false)}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>;
};
