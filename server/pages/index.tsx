import type { NextPage } from 'next';
import { HotUpdateRecord } from "../components/hot-update-record";
import { HotUpdate, LastestVersion } from '@prisma/client';
import { useEffect, useState } from "react";
import { Box, Flex, Heading, Highlight } from "@chakra-ui/react";
import { HotUpdateCreate } from "../components/hot-update-create";
import { UpdateTest } from "../components/update-test";
import { LatestVersionCreate } from "../components/latest-version-create";
import { omit } from "@chakra-ui/utils";

const Home: NextPage = () => {
  const [updates, setUpdates] = useState<HotUpdate[]>([]);
  const [latestVersion, setLatestVersion] = useState<{
    android: LastestVersion | null
    ios: LastestVersion | null
  } | null>(null);
  useEffect(() => {
    getUpdates();
    getLatestVersion();
  }, []);

  const getUpdates = () => {
    fetch("/api/hot-update")
      .then(res => res.json())
      .then(res => {
        setUpdates(res);
      });
  };

  const handleCreateUpdate = (update: Partial<HotUpdate>) => {
    return fetch("/api/hot-update", {
      method: "POST",
      body: JSON.stringify(update),
    }).then(res => res.json())
      .then(res => {
        getUpdates();
      });
  };

  const handleCreateLatestVersion = (latestVersion: Partial<LastestVersion>) => {
    return fetch(`/api/latest-version/${latestVersion.platform}`, {
      method: "PUT",
      body: JSON.stringify(omit(latestVersion, ["platform"])),
    }).then(res => res.json())
      .then(() => {
        getLatestVersion();
      });
  };

  const getLatestVersion = () => {
    return fetch("/api/latest-version")
      .then(res => res.json())
      .then(res => {
        setLatestVersion(res);
      });
  };

  const handleGetUpdate = (update: Pick<HotUpdate, "platform" | "hostingVersion">) => {
    return fetch(`/api/hot-update/${update.platform}/${update.hostingVersion}`, {
      method: "GET",
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(res.statusText);
      });
  };

  const handleDelete = (update: Partial<HotUpdate>) => {
    return fetch(`/api/hot-update/${update.id}`, {
      method: "DELETE",
    }).then(res => {
      getUpdates();
    });
  };

  return (
    <div>
      <Flex px={4} py={4}>
        <Box flex="6">
          <Heading lineHeight="tall">
            <Highlight
              query={['最新版本', '热更新']}
              styles={{ px: '2', py: '1', rounded: 'full', bg: 'red.100' }}
            >
              更新最新版本和热更新 然后调试他们
            </Highlight>
          </Heading>
        </Box>
        <Flex alignItems={"center"} display={"flex"} justifyContent={"right"} flex="4">
          <LatestVersionCreate latestVersion={latestVersion} handleCreateLatestVersion={handleCreateLatestVersion}/>
          <Box ml={4}/>
          <HotUpdateCreate latestVersion={latestVersion} handleCreateUpdate={handleCreateUpdate}/>
          <Box ml={4}/>
          <UpdateTest latestVersion={latestVersion} handleGetUpdate={handleGetUpdate}/>
        </Flex>
      </Flex>
      <HotUpdateRecord handleDelete={handleDelete} updates={updates}/>
    </div>
  );
};

export default Home;

