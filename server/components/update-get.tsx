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
  Select,
  Tag
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { Update } from "@prisma/client";
import { UpdateController } from "../lib/update-controller";

type Props = {
  handleGet: (update: Pick<Update, "platform" | "hostingVersion">) => Promise<Update>
}

export const UpdateGet = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [platform, setPlatform] = useState("Android");
  const [hostingVersion, setHostingVersion] = useState("1.0.0");
  const [localVersion, setLocalVersion] = useState({
    version: "1.0.0",
    patch: "1",
  });
  const [updateInfo, setUpdateInfo] = useState<Update | null>(null);

  const handleCreateGet = () => {
    props
      .handleGet({
        platform,
        hostingVersion,
      })
      .then(res => {
        setUpdateInfo(res);
      });
  };

  const canHotUpdate = useMemo(() => {
    if (!updateInfo) {
      return false;
    }
    return UpdateController.ShouldHotUpdate(localVersion.version, updateInfo.hotUpdateVersion);
  }, [updateInfo, localVersion]);

  return <>
    <Button
      colorScheme="teal"
      type="submit"
      onClick={() => setVisible(true)}
    >
      测试
    </Button>

    <Modal
      isOpen={visible}
      onClose={() => setVisible(false)}
    >
      <ModalOverlay/>
      <ModalContent maxW="80vw">
        <ModalHeader>Test your version</ModalHeader>
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
            <FormLabel>本地基座版本</FormLabel>
            <PinInput
              value={localVersion.version}
              onChange={e => setLocalVersion(state => ({ ...state, version: e }))}
            >
              <PinInputField/>
              <PinInputField/>
              <PinInputField/>
              <PinInputField/>
              <PinInputField/>
            </PinInput>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>本地修订版本</FormLabel>
            <Input
              value={localVersion.patch}
              onChange={e => setLocalVersion(state => ({ ...state, patch: e.target.value }))}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Result</FormLabel>
            <Box>
              <Tag>Sample Tag</Tag>
              <Tag>Sample Tag</Tag>
            </Box>
          </FormControl>

        </ModalBody>

        <ModalFooter>
          <Button onClick={handleCreateGet} colorScheme="blue" mr={3}>Get</Button>
          <Button onClick={() => setVisible(false)}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>;
};
