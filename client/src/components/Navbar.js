import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';

import { HamburgerIcon, CloseIcon, TimeIcon } from '@chakra-ui/icons';


export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('#4fa296', 'gray.900')} px={4}>
      <Flex
        w="100%"
        px="6"
        py="5"
        align="center"
        justify="space-between"
      >
        <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <TimeIcon w={6} h={6} /> Focus: ON!
              </MenuButton >
              <MenuList bg={useColorModeValue('#4fa296', '#835dc7')} px={4}>
                <MenuItem as="a" href="/" > Home </MenuItem>
              </MenuList>
            </Menu>
        
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://cdn3.iconfinder.com/data/icons/yumminky-pc/100/yumminky-pc-43-512.png'
                  }
                />
              </MenuButton >
              <MenuList bg={useColorModeValue('#4fa296', '#835dc7')} px={4}>
                <MenuItem as="a" href="/login" > Login </MenuItem>
                <MenuItem as="a" href="/focus" > Overview </MenuItem>
                {/* <MenuItem as="a" href="/focus/:id" > Current Day </MenuItem> //don't want this because won't show today task*/}
                <MenuItem to="/" > Profile </MenuItem>
                <MenuItem>Logout</MenuItem>
                <MenuDivider />
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

      </Box>

    </>
  );
}
  

{/* <nav className="Navbar">
<ul>

    <li><MyNavLink to="/login">Login</MyNavLink></li>
</ul>
</nav> */}