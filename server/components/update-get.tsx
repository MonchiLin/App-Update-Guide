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
  handleGet: (update: Pick<Update, "platform" | "hostingVersion">) => Promise<void>
}

export const UpdateGet = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [platform, setPlatform] = useState("Android");
  const [hostingVersion, setHostingVersion] = useState("1.0.0");
  const [localVersion, setLocalVersion] = useState({
    version: "1.0.0",
    patch: "1",
  });

  const toast = useToast();

  const handleCreateGet = () => {
    props
      .handleGet({
        platform,
        hostingVersion,
      })
      .then(res => {
      });
  };

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

        </ModalBody>

        <ModalFooter>
          <Button onClick={handleCreateGet} colorScheme="blue" mr={3}>Get</Button>
          <Button onClick={() => setVisible(false)}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>;
};
