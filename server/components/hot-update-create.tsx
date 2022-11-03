import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Select,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HotUpdate, LastestVersion } from "@prisma/client";
import { Version } from "../lib/version";

type Props = {
  handleCreateUpdate: (update: Partial<HotUpdate>) => Promise<void>
  latestVersion: {
    android: LastestVersion | null
    ios: LastestVersion | null
  } | null
}

export const HotUpdateCreate = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [platform, setPlatform] = useState("Android");
  const [hostingVersion, setHostingVersion] = useState("1.0.0");
  const [hotUpdateVersion, setHotUpdateVersion] = useState("1000000");
  const toast = useToast();

  useEffect(() => {
    if (hostingVersion) {
      const buildNumber = Version.GetHotUpdateVersion(hostingVersion);
      setHotUpdateVersion(buildNumber.toString());
    }
  }, [hostingVersion]);

  const handleCreateUpdate = () => {
    props
      .handleCreateUpdate({
        platform,
        hostingVersion,
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
      创建热更新
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
            <FormLabel>热更新版本</FormLabel>
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
