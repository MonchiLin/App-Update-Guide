import {
  Box,
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
  Select, Tag,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LastestVersion } from "@prisma/client";
import { Version } from "../lib/version";

type Props = {
  handleCreateLatestVersion: (update: Partial<LastestVersion>) => Promise<void>
  latestVersion: {
    android: LastestVersion | null
    ios: LastestVersion | null
  } | null
}

export const LatestVersionCreate = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [platform, setPlatform] = useState("Android");
  const [hostingVersion, setHostingVersion] = useState("1.0.0");
  const [hotUpdateVersion, setHotUpdateVersion] = useState("1000000");
  const toast = useToast();

  const handleCreateUpdate = () => {
    props
      .handleCreateLatestVersion({
        platform,
        hostingVersion,
        hotUpdateVersion,
      })
      .then(res => {
        toast({
          title: 'Latest version created.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: "top"
        });
        setVisible(false);
      });
  };

  useEffect(() => {
    if (hostingVersion) {
      const buildNumber = Version.GetHotUpdateVersion(hostingVersion);
      setHotUpdateVersion(buildNumber.toString());
    }
  }, [hostingVersion]);

  return <>
    <Box flexDirection={"row"} justifyContent={"center"} alignItems={"center"} display={"flex"}>
      <Button
        colorScheme="teal"
        type="submit"
        onClick={() => setVisible(true)}
      >
        更新最新版本
      </Button>
      <Box flexDirection={"column"} ml={2} display={"flex"}>
        <Tag>Android: {(props.latestVersion?.android) ? `${props.latestVersion.android.hostingVersion}+${props.latestVersion.android.hotUpdateVersion}` : "null"}</Tag>
        <Box mt={2}/>
        <Tag>iOS: {(props.latestVersion?.ios) ? `${props.latestVersion.ios.hostingVersion}+${props.latestVersion.ios.hotUpdateVersion}` : "null"}</Tag>
      </Box>
    </Box>

    <Modal
      isOpen={visible}
      onClose={() => setVisible(false)}
    >
      <ModalOverlay/>
      <ModalContent maxW="80vw">
        <ModalHeader>Create your latest version</ModalHeader>
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
