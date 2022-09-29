import type { NextPage } from 'next';
import { UpdateRecord } from "../components/update-record";
import { Update } from '@prisma/client';
import { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { UpdateCreate } from "../components/update-create";
import { UpdateGet } from "../components/update-get";

const Home: NextPage = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  useEffect(() => {
    getUpdates();
  }, []);

  const getUpdates = () => {
    fetch("/api/updates")
      .then(res => res.json())
      .then(res => {
        setUpdates(res);
      });
  };

  const handleCreateUpdate = (update: Partial<Update>) => {
    return fetch("/api/updates", {
      method: "POST",
      body: JSON.stringify(update),
    }).then(res => res.json())
      .then(res => {
        getUpdates();
      });
  };

  const handleGet = (update: Pick<Update, "platform" | "hostingVersion">) => {
    return fetch(`/api/updates/${update.platform}/${update.hostingVersion}`, {
      method: "GET",
    })
      .then(res => res.json());
  };

  const handleDelete = (update: Partial<Update>) => {
    return fetch(`/api/updates/${update.id}`, {
      method: "DELETE",
    }).then(res => {
      getUpdates();
    });
  };

  return (
    <div>
      <Flex px={4} py={4}>
        <Box flex="1">
          <Text></Text>
        </Box>
        <Box flex="1">
          <Text></Text>
        </Box>
        <Flex justifyContent={"right"} flex="1">
          <UpdateCreate handleCreateUpdate={handleCreateUpdate}/>
          <Box ml={4}/>
          <UpdateGet handleGet={handleGet}/>
        </Flex>
      </Flex>
      <UpdateRecord handleDelete={handleDelete} updates={updates}/>
    </div>
  );
};

export default Home;

