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
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Select,
  Tag
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { HotUpdate, LastestVersion } from "@prisma/client";
import { UpdateController } from "../lib/update-controller";
import useDebouncedEffect from 'use-debounced-effect';
import { Version } from "../lib/version";

type Props = {
  handleGetUpdate: (hotUpdate: Pick<HotUpdate, "platform" | "hostingVersion">) => Promise<HotUpdate>,
  latestVersion: {
    android: LastestVersion | null
    ios: LastestVersion | null
  } | null
}

export const UpdateTest = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [platform, setPlatform] = useState("Android");
  const [clientVersion, setClientVersion] = useState({
    hostingVersion: "1.0.0",
    hotfixes: "1",
  });
  const [updateInfo, setUpdateInfo] = useState<HotUpdate | null>(null);

  const canHotUpdate = useMemo(() => {
    if (!updateInfo) {
      return false;
    }
    return UpdateController.ShouldHotUpdate(clientVersion.hostingVersion, updateInfo.hotUpdateVersion);
  }, [updateInfo, clientVersion]);

  const canUpdate = useMemo(() => {
    if (!updateInfo) {
      return false;
    }
    const lastestVersion = platform.toLowerCase() === "android" ? props.latestVersion?.android : props.latestVersion?.ios;
    if (!lastestVersion) {
      return false;
    }
    return UpdateController.ShouldHostingUpdate(clientVersion.hostingVersion, lastestVersion.hostingVersion);
  }, [clientVersion, platform, props.latestVersion]);

  useDebouncedEffect(() => {
    if (!Version.isVersion(clientVersion.hostingVersion)) {
      return;
    }
    props
      .handleGetUpdate({
        platform,
        hostingVersion: clientVersion.hostingVersion,
      })
      .then(res => {
        setUpdateInfo(res);
      });
  }, { timeout: 200 }, [clientVersion, platform]);

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
      <ModalContent alignSelf="flex-end" maxW="80vw">
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
            <FormLabel>客户端基座版本</FormLabel>
            <PinInput
              value={clientVersion.hostingVersion}
              onChange={e => setClientVersion(state => ({ ...state, hostingVersion: e }))}
            >
              <PinInputField/>
              <PinInputField/>
              <PinInputField/>
              <PinInputField/>
              <PinInputField/>
            </PinInput>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>客户端热更新版本</FormLabel>
            <Input
              value={clientVersion.hotfixes}
              onChange={e => setClientVersion(state => ({ ...state, hotfixes: e.target.value }))}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Result</FormLabel>
            <Box display={"flex"}>
              <Tag>是否可以热更新: {canHotUpdate ? "Yes" : "No"}</Tag>
              <Box ml={2}/>
              <Tag>是否可以更新基座: {canUpdate ? "Yes" : "No"}</Tag>
            </Box>
          </FormControl>

        </ModalBody>

      </ModalContent>
    </Modal>
  </>;
};
